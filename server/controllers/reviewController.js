import Review from "../models/Review.js";
import Product from "../models/Product.js";

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate("user", "name")
    .sort({ createdAt: -1 });
  res.json(reviews);
};

// @desc    Add a review
// @route   POST /api/reviews/:productId
// @access  Private
export const addReview = async (req, res) => {
  const { rating, comment, images } = req.body;
  const productId = req.params.productId;

  const alreadyReviewed = await Review.findOne({ product: productId, user: req.user._id });
  if (alreadyReviewed) {
    return res.status(400).json({ message: "You already reviewed this product" });
  }

  const review = await Review.create({
    product: productId,
    user: req.user._id,
    rating,
    comment,
    images,
  });

  // Recalculate product's average rating
  const reviews = await Review.find({ product: productId });
  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  await Product.findByIdAndUpdate(productId, {
    ratings: avgRating,
    numReviews: reviews.length,
  });

  res.status(201).json(review);
};
