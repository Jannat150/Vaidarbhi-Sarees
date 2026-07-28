import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },

    // Saree-specific attributes
    fabric: { type: String, required: true }, // Silk, Cotton, Georgette, etc.
    occasion: { type: String }, // Wedding, Festive, Casual, Party
    workType: { type: String }, // Zari, Embroidery, Printed, Handloom
    color: { type: String, required: true },
    region: { type: String }, // Banarasi, Kanjeevaram, Bandhani

    blouseIncluded: { type: Boolean, default: false },
    blouseType: {
      type: String,
      enum: ["stitched", "unstitched", "none"],
      default: "none",
    },

    images: [{ type: String, required: true }], // Cloudinary URLs
    video: { type: String },

    stock: { type: Number, required: true, default: 0 },
    sku: { type: String, unique: true },
    category: { type: String, default: "saree" },
    tags: [{ type: String }],

    ratings: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Text index for search across name, description, tags
productSchema.index({ name: "text", description: "text", tags: "text" });

// Auto-generate a URL-friendly slug and a SKU if they weren't provided,
// so the admin only has to type the product name.
productSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug =
      this.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Math.random().toString(36).substring(2, 7);
  }
  if (!this.sku) {
    this.sku = "SKU-" + Date.now().toString(36).toUpperCase();
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
