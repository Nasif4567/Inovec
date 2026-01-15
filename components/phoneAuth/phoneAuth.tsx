'use client';

import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    confirmationResult?: ConfirmationResult;
  }
}

export default function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [error, setError] = useState("");

  // 🔑 SINGLE INSTANCE
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null);

  const sendOtp = async () => {
    setError("");

    if (!phone) {
      setError("Please enter your phone number");
      return;
    }

    try {
      setLoading(true);

      // 🔒 Create ONCE
      if (!recaptchaRef.current) {
        recaptchaRef.current = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaRef.current
      );

      window.confirmationResult = confirmation;
      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);

      if (!window.confirmationResult) {
        throw new Error("OTP not requested yet");
      }

      const result = await window.confirmationResult.confirm(otp);
      console.log("Verified phone:", result.user.phoneNumber);

      // ✅ Cleanup after success
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
    } catch (err: any) {
      setError("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🧹 Cleanup on unmount
  useEffect(() => {
    return () => {
      recaptchaRef.current?.clear();
      recaptchaRef.current = null;
    };
  }, []);

  return (
    <div className="space-y-5">
      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      {step === "phone" && (
        <>
          <input
            type="tel"
            placeholder="+97455551234"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-900"
          />

          <button
            onClick={sendOtp}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-yellow-400 text-white font-medium disabled:opacity-50"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      )}

      {step === "otp" && (
        <>
          <input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border text-center tracking-widest"
          />

          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-green-500 text-white font-medium disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {/* ⚠️ MUST ALWAYS EXIST */}
      <div id="recaptcha-container" />
    </div>
  );
}
