import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, IdCard, GraduationCap, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useRegisterMutation } from '../features/api';

type UserMajor = string;

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    major: '' as UserMajor,
    customMajor: '',
    university: '',
    customUniversity: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [showCustomMajor, setShowCustomMajor] = useState(false);
  const [showCustomUniversity, setShowCustomUniversity] = useState(false);

  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();

  const universities = [
    'University of Eastern Africa, Baraton (UEAB)',
    'University of Nairobi',
    'Kenyatta University',
    'Jomo Kenyatta University of Agriculture and Technology (JKUAT)',
    'Moi University',
    'Strathmore University',
    'United States International University (USIU)',
    'Technical University of Kenya',
    'Multimedia University of Kenya',
    'Dedan Kimathi University of Technology',
    'Other'
  ];

  const majors: UserMajor[] = [
    'Computer Science',
    'Information Technology',
    'Software Engineering',
    'Cybersecurity',
    'Data Science',
    'Web Development',
    'Mobile Development',
    'Data Analytics',
    'Network Administration',
    'Other'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    // Show/hide custom major field
    if (name === 'major') {
      setShowCustomMajor(value === 'Other');
    }

    // Show/hide custom university field
    if (name === 'university') {
      setShowCustomUniversity(value === 'Other');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setLocalError('Password must be at least 8 characters long');
      return;
    }

    // Validate custom fields
    if (formData.major === 'Other' && !formData.customMajor.trim()) {
      setLocalError('Please specify your major');
      return;
    }

    if (formData.university === 'Other' && !formData.customUniversity.trim()) {
      setLocalError('Please specify your university');
      return;
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, customMajor, customUniversity, ...registerData } = formData;

      // Use custom values if "Other" was selected
      const finalData = {
        ...registerData,
        major: formData.major === 'Other' ? formData.customMajor : formData.major,
        university: formData.university === 'Other' ? formData.customUniversity : formData.university,
      };

      await register(finalData).unwrap();

      // Redirect to sign in after 5 seconds
      setTimeout(() => {
        navigate('/signin');
      }, 5000);
    } catch (err) {
      // Error is automatically handled by RTK Query
      console.error('Registration failed:', err);
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

        <div className="relative z-10 w-full max-w-6xl my-4 md:my-8 mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
            {/* Left Side - Branding */}
            <div className="w-full md:w-2/5 bg-[#1e3a8a] p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden min-h-[180px] md:min-h-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

              <div className="relative z-10 text-center">
                <img
                  src="/bitsa-logo.png"
                  alt="UEAB Logo"
                  className="w-20 h-20 md:w-32 md:h-32 mx-auto mb-3 md:mb-6 object-contain brightness-0 invert"
                />
                <h1 className="text-white text-base md:text-2xl font-bold mb-1 md:mb-2 px-4">
                  University of Eastern Africa, Baraton
                </h1>
                <p className="text-white/80 text-xs md:text-sm px-4">
                  A Chartered Seventh-day Adventist Institution of Higher Learning
                </p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-3/5 p-6 md:p-12 overflow-y-auto max-h-[70vh] md:max-h-[90vh]">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-6 md:mb-8">
                SIGN UP
              </h2>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Account Created Successfully!</h3>
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#1e3a8a] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900 mb-1">Verify Your Email</p>
                        <p className="text-sm text-gray-600 mb-2">
                          We've sent a verification email to <span className="font-semibold">{formData.email}</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Please check your inbox and click the verification link to activate your account.
                          You won't be able to sign in until you verify your email.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/signin"
                    className="inline-block bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Go to Sign In
                  </Link>
                  <p className="text-sm text-gray-500 mt-3">Redirecting in 5 seconds...</p>
                </div>
              ) : (
                <>
                  {(localError || error) && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                      {localError ||
                        (error && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data
                          ? String(error.data.message)
                          : 'Registration failed. Please try again.')}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    {/* School ID and First Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <IdCard className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="schoolId"
                          name="schoolId"
                          type="text"
                          value={formData.schoolId}
                          onChange={handleChange}
                          placeholder="School ID"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="First Name"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Last Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Last Name"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                        />
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                          required
                          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* University */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <GraduationCap className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="university"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all appearance-none"
                      >
                        <option value="">Select University</option>
                        {universities.map((university) => (
                          <option key={university} value={university}>
                            {university}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Custom University Input */}
                    {showCustomUniversity && (
                      <div className="relative animate-fadeIn">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <GraduationCap className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="customUniversity"
                          name="customUniversity"
                          type="text"
                          value={formData.customUniversity}
                          onChange={handleChange}
                          placeholder="Enter your university name"
                          required={showCustomUniversity}
                          className="w-full pl-12 pr-4 py-3 bg-blue-50 border-2 border-blue-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                        />
                      </div>
                    )}

                    {/* Major */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <GraduationCap className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="major"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all appearance-none"
                      >
                        <option value="">Select Major</option>
                        {majors.map((major) => (
                          <option key={major} value={major}>
                            {major}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Custom Major Input */}
                    {showCustomMajor && (
                      <div className="relative animate-fadeIn">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <GraduationCap className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="customMajor"
                          name="customMajor"
                          type="text"
                          value={formData.customMajor}
                          onChange={handleChange}
                          placeholder="Enter your major"
                          required={showCustomMajor}
                          className="w-full pl-12 pr-4 py-3 bg-blue-50 border-2 border-blue-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                        />
                      </div>
                    )}

                    {/* Password and Confirm Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Password"
                          required
                          className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm Password"
                          required
                          className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
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
                          Creating Account...
                        </div>
                      ) : (
                        'SIGN UP'
                      )}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <span className="text-gray-600 text-sm">Already have an account? </span>
                    <Link
                      to="/signin"
                      className="text-[#1e3a8a] hover:text-[#1e40af] font-semibold text-sm transition-colors"
                    >
                      Sign In
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

export default SignUpPage;
