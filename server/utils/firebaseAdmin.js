import admin from "firebase-admin";

let adminInitialized = false;

const initAdmin = () => {
  if (adminInitialized) return;

  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
    console.warn("Firebase Admin credentials not configured. /api/users/firebase-auth will not work until FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set in .env");
    return;
  }

  try {
    admin.initializeApp({
      credential: admin.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
    adminInitialized = true;
  } catch (error) {
    console.error("Firebase Admin initialization error:", error.message);
  }
};

export const verifyFirebaseToken = async (idToken) => {
  initAdmin();

  if (!adminInitialized) {
    throw new Error("Firebase Admin is not configured");
  }

  const decoded = await admin.auth().verifyIdToken(idToken);
  return decoded;
};

export default admin;
