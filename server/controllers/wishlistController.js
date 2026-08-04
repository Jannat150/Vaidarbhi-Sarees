import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      "items.product",
      "name images price discountPrice stock slug"
    );

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, items: [] });
    }

    res.json(wishlist);
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    res.status(500).json({ message: "Failed to fetch wishlist", error: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, items: [] });
    }

    const exists = wishlist.items.some((item) => item.product.toString() === productId);
    if (exists) {
      return res.status(200).json(wishlist);
    }

    wishlist.items.push({ product: productId });
    await wishlist.save();

    const populatedWishlist = await wishlist.populate(
      "items.product",
      "name images price discountPrice stock slug"
    );

    res.status(201).json(populatedWishlist);
  } catch (error) {
    console.error("Add to Wishlist Error:", error);
    res.status(500).json({ message: "Failed to add to wishlist", error: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter((item) => item.product.toString() !== req.params.productId);
    await wishlist.save();

    const populatedWishlist = await wishlist.populate(
      "items.product",
      "name images price discountPrice stock slug"
    );

    res.json(populatedWishlist);
  } catch (error) {
    console.error("Remove from Wishlist Error:", error);
    res.status(500).json({ message: "Failed to remove from wishlist", error: error.message });
  }
};
