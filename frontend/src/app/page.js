// frontend/src/app/page.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

// Images
import img from '../../public/img.png';
import img1 from '../../public/img1.png';
import img2 from '../../public/img2.png';
import img3 from '../../public/img3.png';
import img4 from '../../public/img4.png';
import image from '../../public/image.png';
import img5 from '../../public/img5.png';

// Icons
import { GoVerified } from 'react-icons/go';
import { SlCalender } from 'react-icons/sl';
import { AiOutlineMessage } from 'react-icons/ai';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Our Doctors', href: '#our-doctors' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-200 py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
              H
            </div>
            <h1 className="text-xl font-bold text-blue-800">HealthMate</h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-800 font-light"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Sign Up
            </Link>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-2 border-t border-gray-100">
                <Link
                  href="/login"
                  className="px-4 py-2 border border-gray-300 rounded-lg text-center text-gray-700 hover:bg-gray-50 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="md:py-20 px-4 sm:px-6 lg:px-60"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:w-1/2 w-full space-y-6"
            >
              <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                Trusted by 50,000+ Patients
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
                Connect with a <span className="text-blue-800">Cardiologist</span> Online —
                <br />
                <span className="text-green-600">Anytime, Anywhere.</span>
              </h1>
              <p className="text-gray-600 mt-4">
                Get expert cardiac care from verified cardiologists without leaving your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link
                  href="/book"
                  className="bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  Book a Consultation →
                </Link>
                <Link
                  href="/learn-more"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition"
                >
                  Learn More
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row justify-between mt-10 gap-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-800">500+</div>
                  <div className="text-sm text-gray-600">Verified Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-800">24/7</div>
                  <div className="text-sm text-gray-600">Available Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-800">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:w-1/2 w-full flex justify-center"
            >
              <img
                src={img.src}
                alt="Smiling cardiologist in white coat"
                className="rounded-2xl shadow-lg w-full max-w-md md:max-w-none h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-28 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-4xl font-extrabold text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg text-gray-600 mb-12"
          >
            Getting expert cardiac care is just three simple steps away
          </motion.p>

          <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 relative">
            {[
              { icon: <GoVerified className="h-8 w-8 text-blue-600" />, title: 'Sign Up', desc: 'Create your account in minutes with your basic information' },
              { icon: <SlCalender className="h-8 w-8 text-blue-600" />, title: 'Book Appointment', desc: 'Choose from available cardiologists and select your preferred time' },
              { icon: <AiOutlineMessage className="h-8 w-8 text-blue-600" />, title: 'Chat or Call', desc: 'Connect with your doctor via video call or messaging' }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.7 }}
                className="relative flex-1 p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_0_25px_#3b82f680] hover:border-blue-300"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {i + 1}
                </div>
                <div className="mt-6 flex flex-col items-center space-y-3">
                  {step.icon}
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 text-center px-2">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Meet Our Cardiologists Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
          >
            Meet Our Cardiologists
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg text-gray-600 mb-12"
          >
            Our platform features verified and experienced cardiologists dedicated to your heart health
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[img1, img2, img3].map((imgSrc, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <img src={imgSrc.src} alt="Doctor" className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {i === 0 ? 'Dr. Sarah Mekonen' : i === 1 ? 'Dr. Sidney Johnson' : 'Dr. Michael Chen'}
                  </h3>
                  <p className="text-blue-800 text-sm mb-3">
                    {i === 0 ? 'Interventional Cardiologist' : i === 1 ? 'Cardiac Surgeon' : 'Heart Failure Specialist'}
                  </p>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.995 1.995 0 01-2.828 0l-4.244-4.244a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {i === 0 ? 'Addis Ababa Medical Center' : i === 1 ? 'Heart Care Institute' : 'National Heart Hospital'}
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1">
                     {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={i < 4 ? '#FACC15' : '#E5E7EB'} // yellow-400 / gray-300
        className="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c.384 0 .74.214.91.553l2.007 4.067 4.493.653a.96.96 0 0 1 .532 1.635l-3.25 3.17.767 4.47a.96.96 0 0 1-1.395 1.012L12 15.982l-4.054 2.136a.96.96 0 0 1-1.395-1.012l.767-4.47-3.25-3.17a.96.96 0 0 1 .532-1.635l4.493-.653 2.007-4.067A.96.96 0 0 1 12 2.25Z"
          clipRule="evenodd"
        />
      </svg>
    ))}
                    </div>
                    <span className="ml-2 text-gray-600 text-sm">4.9 (312)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-800">{i === 0 ? '300 ETB' : i === 1 ? '400 ETB' : '350 ETB'}</span>
                    <button className="bg-blue-800 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section — FULL 5-STAR RATING */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4"
          >
            What Patients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg text-gray-600 mb-12"
          >
            Real stories from patients who improved their heart health with us
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[img5, image, img4].map((imgSrc, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100"
              >
                {/* ✅ FULL 5 YELLOW STARS — NO CONDITION */}
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#FACC15"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c.384 0 .74.214.91.553l2.007 4.067 4.493.653a.96.96 0 0 1 .532 1.635l-3.25 3.17.767 4.47a.96.96 0 0 1-1.395 1.012L12 15.982l-4.054 2.136a.96.96 0 0 1-1.395-1.012l.767-4.47-3.25-3.17a.96.96 0 0 1 .532-1.635l4.493-.653 2.007-4.067A.96.96 0 0 1 12 2.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {i === 0
                    ? 'HealthMate changed my life. I got a consultation with an excellent cardiologist within hours.'
                    : i === 1
                    ? 'Finally, I can access quality cardiac care from home. The doctors are knowledgeable.'
                    : 'Best telemedicine platform I have used. Quick response times and reasonable fees.'}
                </p>
                <div className="flex items-center justify-center">
                  <img src={imgSrc.src} alt="Patient" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {i === 0 ? 'Ahmed K.' : i === 1 ? 'Fatima M.' : 'Abebe T.'}
                    </h4>
                    <p className="text-sm text-gray-500">Patient</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-800 to-green-500 text-center text-white"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Ready to Take Control of Your Heart Health?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-lg md:text-xl text-white/90 mb-10"
          >
            Join thousands of patients who trust <span className="font-semibold">HealthMate</span> for their cardiac care needs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
          >
            <Link
              href="/signup"
              className="bg-white text-blue-800 font-semibold py-3 px-8 rounded-lg hover:bg-blue-50 transition"
            >
              Get Started Now →
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                H
              </div>
              <h1 className="text-xl font-bold text-blue-700">HealthMate</h1>
            </div>
            <p className="text-sm text-gray-600">
              Connecting patients with trusted cardiologists for accessible healthcare
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-sm text-gray-600 hover:text-blue-600">How It Works</a></li>
              <li><a href="#our-doctors" className="text-sm text-gray-600 hover:text-blue-600">Find Doctors</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Cookie Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600">Security</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:support@healthmate.com" className="text-sm text-gray-600 hover:text-blue-600">support@healthmate.com</a></li>
              <li><a href="tel:+251911234567" className="text-sm text-gray-600 hover:text-blue-600">+251 (911) 234-567</a></li>
              <li className="text-sm text-gray-600">Addis Ababa, Ethiopia</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div>© 2025 HealthMate. All rights reserved.</div>
          <div className="mt-4 md:mt-0">
            Made with <span className="text-green-500">❤️</span> for your health
          </div>
        </div>
      </footer>
    </div>
  );
}