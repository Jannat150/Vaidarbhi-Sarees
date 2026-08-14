const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY;
const MSG91_SENDER = process.env.MSG91_SENDER || "";
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID || "";
const OTP_LENGTH = process.env.OTP_LENGTH || 4;

export const sendMsg91Otp = async (phone) => {
  if (!MSG91_AUTH_KEY) {
    console.log(`[MSG91] Auth key not configured. Dev mode for ${phone}`);
    return { success: false, dev: true };
  }

  try {
    const mobile = `91${phone}`;
    const payload = {
      mobile,
      otp_length: parseInt(OTP_LENGTH, 10),
    };

    if (MSG91_SENDER) {
      payload.sender = MSG91_SENDER;
    }

    if (MSG91_TEMPLATE_ID) {
      payload.template_id = MSG91_TEMPLATE_ID;
    }

    console.log(`[MSG91] Sending OTP payload for ${phone}:`, payload);

    const response = await fetch("https://control.msg91.com/api/v5/otp/", {
      method: "POST",
      headers: {
        authkey: MSG91_AUTH_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    console.log(`[MSG91] Send OTP response for ${phone}:`, {
      status: response.status,
      statusText: response.statusText,
      data,
    });

    return { success: response.ok, data, status: response.status };
  } catch (error) {
    console.error("[MSG91] Failed to send OTP:", error);
    return { success: false, error: error.message };
  }
};

export const verifyMsg91Otp = async (phone, otp, requestId) => {
  if (!MSG91_AUTH_KEY) {
    console.log(`[MSG91] Auth key not configured. Dev mode verify for ${phone}`);
    return { success: true, dev: true };
  }

  try {
    const mobile = `91${phone}`;
    const body = {
      mobile,
      otp,
    };

    if (requestId) {
      body.request_id = requestId;
    }

    const response = await fetch("https://control.msg91.com/api/v5/otp/verify", {
      method: "POST",
      headers: {
        authkey: MSG91_AUTH_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    console.log(`[MSG91] Verify OTP response for ${phone}:`, {
      status: response.status,
      statusText: response.statusText,
      data,
    });

    return { success: response.ok, data, status: response.status };
  } catch (error) {
    console.error("[MSG91] Failed to verify OTP:", error);
    return { success: false, error: error.message };
  }
};
