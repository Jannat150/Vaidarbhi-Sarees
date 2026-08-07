import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ==========================================
// @desc    Create Order
// @route   POST /api/orders
// @access  Private
// ==========================================
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No order items",
      });
    }

    // Check stock
    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} is out of stock`,
        });
      }
    }

    // Reduce stock
    for (const item of items) {
      const product = await Product.findById(item.product);

      product.stock -= item.quantity;

      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      paymentStatus: "pending",
      orderStatus: "placed",
      totalAmount,
    });

    // Clear Cart
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      {
        items: [],
      }
    );

    res.status(201).json(order);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// ==========================================
// @desc    Get Logged-in User Orders
// @route   GET /api/orders/myorders
// @access  Private
// ==========================================
export const getMyOrders = async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ==========================================
// @desc    Get Single Order
// @route   GET /api/orders/:id
// @access  Private
// ==========================================
export const getOrderById = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id)
      .populate("user", "name email phone");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ==========================================
// @desc    Get All Orders
// @route   GET /api/orders
// @access  Private/Admin
// ==========================================
export const getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find({})
      .populate("user", "name email phone")
      .sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// ==========================================
// @desc    Update Order Status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
// ==========================================
export const updateOrderStatus = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus =
      req.body.orderStatus || order.orderStatus;

    // Update payment status automatically
    if (order.orderStatus === "delivered") {
      order.paymentStatus = "paid";
    }

    if (order.orderStatus === "cancelled") {
      order.paymentStatus = "cancelled";
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// ==========================================
// @desc    Cancel Order
// @route   PUT /api/orders/:id/cancel
// @access  Private
// ==========================================
export const cancelOrder = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Only owner can cancel
    if (
      order.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    if (order.orderStatus === "delivered") {
      return res.status(400).json({
        message: "Delivered orders cannot be cancelled",
      });
    }

    if (order.orderStatus === "cancelled") {
      return res.status(400).json({
        message: "Order already cancelled",
      });
    }

    // Restore stock
    for (const item of order.items) {

      const product = await Product.findById(item.product);

      if (product) {

        product.stock += item.quantity;

        await product.save();

      }

    }

    order.orderStatus = "cancelled";
    order.paymentStatus = "cancelled";

    await order.save();

    res.json({
      message: "Order cancelled successfully",
      order,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// ==========================================
// @desc    Get Order Statistics
// @route   GET /api/orders/stats
// @access  Private/Admin
// ==========================================
// ==========================================
// @desc    Get Order Statistics
// @route   GET /api/orders/stats
// @access  Private/Admin
// ==========================================
export const getOrderStats = async (req, res) => {
    console.log("===== GET ORDER STATS API CALLED =====");
  try {
    const totalOrders = await Order.countDocuments();

    const placedOrders = await Order.countDocuments({
      orderStatus: "placed",
    });

    const confirmedOrders = await Order.countDocuments({
      orderStatus: "confirmed",
    });

    const shippedOrders = await Order.countDocuments({
      orderStatus: "shipped",
    });

    const deliveredOrders = await Order.countDocuments({
      orderStatus: "delivered",
    });

    const cancelledOrders = await Order.countDocuments({
      orderStatus: "cancelled",
    });

    // Revenue (Ignore Cancelled Orders)
    const revenue = await Order.aggregate([
      {
        $match: {
          orderStatus: {
            $ne: "cancelled",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenue.length > 0 ? revenue[0].totalRevenue : 0;

    // Debug Logs
    console.log("========= ORDER STATS =========");
    console.log("Total Orders:", totalOrders);
    console.log("Placed:", placedOrders);
    console.log("Confirmed:", confirmedOrders);
    console.log("Shipped:", shippedOrders);
    console.log("Delivered:", deliveredOrders);
    console.log("Cancelled:", cancelledOrders);
    console.log("Revenue:", totalRevenue);

    res.status(200).json({
      totalOrders,
      newOrders: placedOrders,
      placedOrders,
      confirmedOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue,
    });
  } catch (error) {
  console.error("===== STATS ERROR =====");
  console.error(error);

  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}
};

// ==========================================
// @desc    Get Orders By User (Admin)
// @route   GET /api/users/:id/orders
// @access  Private/Admin
// ==========================================
export const getOrdersByUser = async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.params.id,
    })
      .populate("user", "name email phone")
      .sort({
        createdAt: -1,
      });

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};