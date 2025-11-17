// frontend/src/app/doctor/pending/page.jsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function DoctorPending() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const doctorId = searchParams.get('id');

  useEffect(() => {
    if (!doctorId) {
      setLoading(false);
      return;
    }

    const fetchDoctor = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/doctor/${doctorId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.doctor);
        }
      } catch (err) {
        console.error('Failed to fetch doctor:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center">Doctor not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Verification in Progress</h1>
          <p className="text-sm text-gray-600">Your profile is being reviewed by our admin team</p>
        </div>

        {/* Info Box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-green-800">
              We're verifying your medical credentials and license. This typically takes 24–48 hours.
            </span>
          </div>
        </div>

        {/* Status Steps */}
        <div className="space-y-4 mt-6">
          {/* Step 1: Account Created */}
          <div className="flex items-center">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs mr-3">
              ✓
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Account Created</h3>
              <p className="text-sm text-gray-600">Your profile has been set up successfully</p>
            </div>
          </div>

          {/* Step 2: Under Review */}
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs mr-3">
              ⏳
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Under Review</h3>
              <p className="text-sm text-gray-600">Admin team is verifying your credentials</p>
            </div>
          </div>

          {/* Step 3: Profile Activation */}
          <div className="flex items-center">
            <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 text-xs mr-3">
              ○
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Profile Activation</h3>
              <p className="text-sm text-gray-600">Start accepting consultations</p>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• We’ll verify your medical license and credentials</li>
            <li>• Check your professional background and experience</li>
            <li>• Review your submitted documents</li>
            <li>• Send you an email when your profile is approved</li>
          </ul>
        </div>

        {/* Contact Support */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Have questions? Contact our support team</p>
          <Link href="mailto:support@healthmate.com" className="text-blue-600 font-medium hover:underline">
            support@healthmate.com
          </Link>
        </div>

        {/* Submitted Information */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mt-6">
          <h3 className="font-semibold text-gray-900 mb-2">Submitted Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="text-black">Name:</span>
            <span className='text-gray-300'>{user.full_name}</span>
            <span className="text-black">Specialization:</span>
            <span className='text-gray-300'>{user.specialization}</span>
           
          </div>
        </div>
      </div>
    </div>
  );
}