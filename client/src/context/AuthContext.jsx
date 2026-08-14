import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import API from "../services/axios";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }

    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      if (!fbUser) {
        const hasLocalAuth = !!(localStorage.getItem("token") && localStorage.getItem("user"));
        if (!hasLocalAuth) {
          localStorage.clear();
          setUser(null);
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = useCallback((data) => {
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const syncWithBackend = useCallback(
    async (fbUser, name) => {
      const idToken = await fbUser.getIdToken();
      const { data } = await API.post(
        "/users/firebase-auth",
        name ? { name } : {},
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      login(data);
      return data;
    },
    [login]
  );

  const loginWithEmail = useCallback(
    async (email, password) => {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );
      return syncWithBackend(userCredential.user);
    },
    [syncWithBackend]
  );

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Firebase signout error:", e);
    }
    localStorage.clear();
    setUser(null);
    setFirebaseUser(null);
    window.location.href = "/login";
  };

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase());
      return { success: true, message: "Password reset email sent. Check your inbox." };
    } catch (error) {
      return {
        success: false,
        message: getFirebaseErrorMessage(error, "Failed to send reset email."),
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        login,
        syncWithBackend,
        loginWithEmail,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
