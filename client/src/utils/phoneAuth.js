import { RecaptchaVerifier } from "../config/firebase";
import { auth } from "../config/firebase";

let recaptchaVerifier = null;

export const toE164 = (phone) => {
  const digits = phone.replace(/\D/g, "").slice(-10);
  return `+91${digits}`;
};

export const formatPhoneDisplay = (phone) => {
  const digits = phone.replace(/\D/g, "").slice(-10);
  if (digits.length !== 10) return digits;
  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
};

export const setupRecaptcha = (containerId = "recaptcha-container") => {
  clearRecaptcha();

  recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: () => {},
    "expired-callback": () => {},
  });

  return recaptchaVerifier;
};

export const getRecaptchaVerifier = () => recaptchaVerifier;

export const clearRecaptcha = () => {
  if (recaptchaVerifier) {
    try {
      recaptchaVerifier.clear();
    } catch {
      // ignore cleanup errors
    }
    recaptchaVerifier = null;
  }
};
