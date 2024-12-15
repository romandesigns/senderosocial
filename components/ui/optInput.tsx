"use client";
import React, { useRef, useState } from "react";
import { Input } from "./input";
import { Group } from "../Group";
import { InputOTPSeparator } from "./input-otp";

export function InputOpt() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update the OTP state and move focus to the next field
  const handleInputChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, ""); // Allow only digits

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;
    setOtp(updatedOtp);

    // Move focus to the next field if digit is entered
    if (digit && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace to move to the previous field
  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      const updatedOtp = [...otp];
      updatedOtp[index - 1] = ""; // Clear the previous field
      setOtp(updatedOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Consolidate the OTP into a single string
  const consolidatedOtp = otp.join("");

  return (
    <div>
      {/* Hidden Input Field for Consolidated OTP */}
      <input type="hidden" name="otp" value={consolidatedOtp} />

      {/* OTP Input Fields */}
      <Group direction="row" classNames="gap-2">
        {otp.map((digit, index) => (
          <React.Fragment key={index}>
            <Input
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center"
            />
            {index === 2 && <InputOTPSeparator />}
          </React.Fragment>
        ))}
      </Group>
    </div>
  );
}
