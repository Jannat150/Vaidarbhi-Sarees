import { useRef, useEffect } from "react";

const OtpInput = ({ value, onChange, disabled = false }) => {
  const inputsRef = useRef([]);

  const digits = value.padEnd(6, " ").split("").slice(0, 6);

  useEffect(() => {
    if (value.length === 0) {
      inputsRef.current[0]?.focus();
    }
  }, [value]);

  const updateDigit = (index, digit) => {
    const chars = value.split("");
    while (chars.length < 6) chars.push("");
    chars[index] = digit;
    onChange(chars.join("").replace(/\s/g, "").slice(0, 6));
  };

  const handleChange = (index, e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      updateDigit(index, "");
      return;
    }
    updateDigit(index, val.slice(-1));
    if (index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index]?.trim() && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted) onChange(pasted);
  };

  return (
    <div className="flex justify-center gap-2" onPaste={handlePaste}>
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit.trim()}
          disabled={disabled}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-11 h-12 text-center text-xl font-semibold border border-gray-300 rounded-xl focus:outline-none focus:border-[#8B1E3F] disabled:opacity-50"
        />
      ))}
    </div>
  );
};

export default OtpInput;
