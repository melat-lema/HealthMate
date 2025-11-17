// frontend/src/app/signup/doctor/page.jsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaUpload } from "react-icons/fa";
function ToastProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      // Cleanup if needed
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
export default function DoctorSignup() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    hospitalClinic: '',
    experienceYears: '',
    specialization: 'Cardiology',
    licenseFile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, licenseFile: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (!formData.licenseFile) {
      toast.error('Please upload your medical license');
      return;
    }

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'licenseFile') {
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append('licenseFile', formData.licenseFile);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup/doctor`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Account created! Awaiting admin verification.');
        // Redirect to pending page
        setTimeout(() => {
           window.location.href = `/doctor/pending?id=${data.user.id}`
        }, 1500);
      } else {
        toast.error(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ToastProvider>
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg flex flex-col">
      {/* Back Link & Header (Fixed Top) */}
      <div className="p-6 border-b border-gray-200">
        <div className="text-sm text-blue-800 mb-4">
          <Link href="/signup" className="flex items-center gap-1 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Role Selection
          </Link>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Doctor Registration</h1>
          <p className="text-sm text-gray-600">Join our network of verified cardiologists</p>
        </div>
      </div>

      {/* Scrollable Form Area */}
      <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(100vh - 220px)' }}>
        <form id="doctor-form" onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Dr. Ahmed Hassan"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-800 focus:border-blue-800 text-gray-800"
                disabled={isSubmitting}
              />
              <IoPersonOutline className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="doctor@example.com"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-800 focus:border-blue-800 text-gray-800"
                disabled={isSubmitting}
              />
              <MdOutlineEmail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Medical License / Certificate */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medical License / Certificate</label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={handleFileChange}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-800 focus:border-blue-800 text-gray-800"
                disabled={isSubmitting}
              />
              <FaUpload className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500 mt-1">PDF, JPG, or PNG (max 10MB)</p>
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-800 focus:border-blue-800 text-gray-800"
              disabled={isSubmitting}
            >
              <option value="Cardiology">Cardiology</option>
              <option value="InterventionalCardiology">Interventional Cardiology</option>
              <option value="CardiacSurgery">Cardiac Surgery</option>
              <option value="HeartFailureSpecialist">Heart Failure Specialist</option>
            </select>
          </div>
{/* License Number */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
  <input
    type="text"
    name="licenseNumber"
    value={formData.licenseNumber}
    onChange={handleChange}
    placeholder="e.g., MD-12345"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-800 focus:border-blue-800 text-gray-800"
    disabled={isSubmitting}
  />
</div>
          {/* Hospital / Clinic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hospital / Clinic (Optional)</label>
            <input
              type="text"
              name="hospitalClinic"
              value={formData.hospitalClinic}
              onChange={handleChange}
              placeholder="Your hospital name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-800 focus:border-blue-800 text-gray-800"
              disabled={isSubmitting}
            />
          </div>

          {/* Years of Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
            <input
              type="number"
              name="experienceYears"
              value={formData.experienceYears}
              onChange={handleChange}
              placeholder="e.g., 10"
              min="0"
              max="80"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-800 focus:border-blue-800 text-gray-800"
              disabled={isSubmitting}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-800 text-gray-800"
                disabled={isSubmitting}
              />
              <IoLockClosedOutline className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-blue-800 text-gray-800"
                disabled={isSubmitting}
              />
              <IoLockClosedOutline className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </form>
      </div>

      {/* Fixed Bottom: Divider, Google Button, Login Link */}
      <div className="p-6 border-t border-gray-200 space-y-4">
        {/* Submit Button */}
        <button
          type="submit"
          form="doctor-form" // ← we'll add id to form
          disabled={isSubmitting}
          className="w-full bg-blue-800 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-70"
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>

        {/* Divider */}
        <div className="flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-2 text-xs text-gray-500">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleSubmit} // ← explicit call
  disabled={isSubmitting}
          className="w-full border border-gray-300 text-gray-700 font-medium py-2 rounded-lg hover:bg-green-700 hover:text-white hover:border-green-600 transition"
        >
          Continue with Google
        </button>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link href="/login" className="text-blue-800 font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
 </div>

    </ToastProvider>
  );
};