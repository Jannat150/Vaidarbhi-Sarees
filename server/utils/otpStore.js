const otpStore = new Map();

export const setOtp = (phone, otp) => {
  otpStore.set(phone, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });
};

export const getOtp = (phone) => {
  const record = otpStore.get(phone);
  if (!record) return null;
  if (Date.now() > record.expiresAt) {
    otpStore.delete(phone);
    return null;
  }
  return record.otp;
};

export const verifyOtp = (phone, otp) => {
  const record = otpStore.get(phone);
  if (!record) return false;
  if (Date.now() > record.expiresAt) {
    otpStore.delete(phone);
    return false;
  }
  if (record.otp !== otp) return false;
  otpStore.delete(phone);
  return true;
};

export const deleteOtp = (phone) => {
  otpStore.delete(phone);
};
