import React from 'react';
import PhoneAuth from '@/components/phoneAuth/phoneAuth';

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-black">
            Verify Your Phone
          </h1>
          <p className="text-sm text-black mt-2">
            We’ll send you a one-time code to confirm your number
          </p>
        </div>

        {/* Phone Auth Component */}
        <PhoneAuth />

        {/* Footer */}
        <p className="text-xs text-center text-gray-400">
          SMS verification is free during early access
        </p>
      </div>
    </div>
  );
}
