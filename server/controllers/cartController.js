import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// @desc    Get logged-in user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
    "name images price stock slug"
  );
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }
  res.json(cart);
};

// @desc    Add item to cart (or update quantity if it already exists)
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, items: [] });
  }

  const existingItem = cart.items.find((item) => item.product.toString() === productId);
  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    cart.items.push({ product: productId, quantity, price: product.discountPrice || product.price });
  }

  await cart.save();
  const populatedCart = await cart.populate("items.product", "name images price stock slug");
  res.status(201).json(populatedCart);
};

// @desc    Update quantity of a cart item
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const item = cart.items.find((item) => item.product.toString() === req.params.productId);
  if (!item) {
    return res.status(404).json({ message: "Item not in cart" });
  }

  item.quantity = quantity;
  await cart.save();
  const populatedCart = await cart.populate("items.product", "name images price stock slug");
  res.json(populatedCart);
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
  await cart.save();
  const populatedCart = await cart.populate("items.product", "name images price stock slug");
  res.json(populatedCart);
};
