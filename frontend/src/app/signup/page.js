// frontend/src/app/signup/page.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Join HealthMate</h1>
          <p className="text-sm text-gray-600">Select your account type to get started</p>
        </div>

        {/* Role Selection Cards */}
        <div className="space-y-4">
          {/* Patient Card */}
          <Link
            href="/signup/patient"
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-1">I'm a Patient</h2>
            <p className="text-sm text-gray-600">Book consultations with cardiologists</p>
          </Link>

          {/* Doctor Card */}
          <Link
            href="/signup/doctor"
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-1">I'm a Doctor</h2>
            <p className="text-sm text-gray-600">Join our network of cardiologists</p>
          </Link>
        </div>

        {/* Login Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}