import "./config/env.js";

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://magenta-cucurucho-a36c54.netlify.app",
  "https://vaidarbhi-sarees-xm7d.vercel.app",
  "https://whimsical-conkies-b12491.netlify.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials : true
}));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/upload", uploadRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});