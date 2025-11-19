import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useForgotPasswordMutation } from '../features/api';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading, isSuccess, error }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await forgotPassword({ email }).unwrap();
    } catch (err) {
      // Error is automatically handled by RTK Query
      console.error('Failed to send reset email:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />

      <div
        className="flex-1 flex items-center justify-center p-4 md:p-8 bg-cover bg-center relative"
        style={{
          backgroundImage: 'url(https://ueab.ac.ke/wp-content/uploads/2018/08/academic.jpg)'
        }}
      >
        <div className="absolute inset-0 bg-white/60"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Left Side - Branding */}
            <div className="w-full md:w-1/2 bg-[#1e3a8a] p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden min-h-[200px] md:min-h-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

              <div className="relative z-10 text-center">
                <img
                  src="/bitsa-logo.png"
                  alt="UEAB Logo"
                  className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-3 md:mb-4 object-contain brightness-0 invert"
                />
                <h1 className="text-white text-lg md:text-2xl font-bold mb-1 md:mb-2 px-4">
                  University of Eastern Africa, Baraton
                </h1>
                <p className="text-white/80 text-xs md:text-sm px-4">
                  A Chartered Seventh-day Adventist Institution of Higher Learning
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 p-6 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-3 md:mb-4">
                FORGOT PASSWORD
              </h2>
              <p className="text-gray-600 mb-6 md:mb-8 text-sm">
                Enter your email address and we'll send you instructions to reset your password
              </p>

              {isSuccess ? (
                <div className="text-center">
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    <p className="font-medium mb-2">Email sent successfully!</p>
                    <p className="text-sm">Check your inbox for password reset instructions.</p>
                  </div>
                  <Link
                    to="/signin"
                    className="inline-flex items-center text-[#1e3a8a] hover:text-[#1e40af] text-sm font-medium transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Link>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data
                        ? String(error.data.message)
                        : 'Failed to send reset email. Please try again.'}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-[#1e3a8a] transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#4c1d95] hover:bg-[#5b21b6] text-white font-semibold py-3.5 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </div>
                      ) : (
                        'SEND RESET LINK'
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <Link
                      to="/signin"
                      className="text-[#1e3a8a] hover:text-[#1e40af] text-sm font-medium transition-colors inline-flex items-center"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Back to Sign In
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
