import { verifyFirebaseToken as verifyToken } from "../utils/firebaseAdmin.js";

export const verifyFirebaseToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = await verifyToken(token);
      req.firebaseUser = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, Firebase token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no Firebase token" });
  }
};
