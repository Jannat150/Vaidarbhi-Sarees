const errorMessages = {
  "auth/invalid-email": "Enter a valid email address.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/operation-not-allowed": "This sign-in method is not enabled.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
  "auth/invalid-phone-number": "Enter a valid 10-digit Indian phone number.",
  "auth/invalid-verification-code": "Invalid OTP. Please check and try again.",
  "auth/code-expired": "OTP has expired. Please request a new one.",
  "auth/missing-verification-code": "Please enter the 6-digit OTP.",
  "auth/credential-already-in-use": "This phone number is already linked to another account.",
  "auth/provider-already-linked": "This sign-in method is already linked to your account.",
  "auth/account-exists-with-different-credential":
    "An account already exists with this email using a different sign-in method.",
  "auth/invalid-api-key": "Invalid Firebase configuration. Please contact support.",
  "auth/captcha-check-failed": "reCAPTCHA verification failed. Please try again.",
  "auth/quota-exceeded": "SMS quota exceeded. Please try again later.",
};

export const getFirebaseErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  if (!error) return fallback;

  if (error.code && errorMessages[error.code]) {
    return errorMessages[error.code];
  }

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  return fallback;
};
