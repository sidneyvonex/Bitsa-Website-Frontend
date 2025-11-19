import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';
import { useLoginMutation, useResendVerificationMutation } from '../features/api';
import { useAppDispatch } from '../app/hooks';
import { setCredentials } from '../features/auth/authSlice';

export const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState('');
    const [showEmailVerification, setShowEmailVerification] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);

    const [login, { isLoading, error }] = useLoginMutation();
    const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');
        setShowEmailVerification(false);
        setResendSuccess(false);

        try {
            const result = await login(formData).unwrap();

            if (!result.token || !result.userId) {
                console.error('Missing token or userId in response:', result);
                setLocalError('Invalid response from server. Please try again.');
                return;
            }

            const user = {
                id: result.userId,
                email: result.email,
                firstName: result.fullName?.split(' ')[0] || '',
                lastName: result.fullName?.split(' ').slice(1).join(' ') || '',
                role: (result.userRole?.charAt(0).toUpperCase() + result.userRole?.slice(1)) as 'Student' | 'Admin' | 'SuperAdmin',
                schoolId: result.userId,
                major: '',
                isEmailVerified: true, // Will be updated based on backend response
                hasSelectedInterests: false, // Will be checked after login
                profilePicture: result.profileUrl || undefined,
            };

            dispatch(setCredentials({
                user,
                token: result.token,
                refreshToken: result.token,
            }));

            const roleLower = result.userRole?.toLowerCase();
            if (roleLower === 'admin') {
                navigate('/admin');
            } else if (roleLower === 'superadmin') {
                navigate('/superadmin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            const error = err as {
                data?: {
                    message?: string;
                    error?: string;
                };
                status?: number;
            };
            console.error('Login failed:', err);

            // Check if error is due to unverified email
            const errorMessage = error?.data?.message?.toLowerCase() || error?.data?.error?.toLowerCase() || '';
            const isVerificationError =
                errorMessage.includes('verify') ||
                errorMessage.includes('verification') ||
                errorMessage.includes('not verified') ||
                errorMessage.includes('email verification');

            if (isVerificationError) {
                setShowEmailVerification(true);
                setLocalError('Your email is not verified. Please check your email for the verification link or resend it below.');
            } else {
                setLocalError(error?.data?.message || error?.data?.error || 'Login failed. Please check your credentials and try again.');
            }
        }
    };

    const handleResendVerification = async () => {
        setResendSuccess(false);
        try {
            await resendVerification({ email: formData.email }).unwrap();
            setResendSuccess(true);
            setLocalError('');
        } catch (err) {
            const error = err as { data?: { message?: string } };
            setLocalError(error?.data?.message || 'Failed to resend verification email. Please try again.');
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
                            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-6 md:mb-8">
                                SIGN IN
                            </h2>

                            {(localError || error) && (
                                <div className={`mb-4 p-3 border rounded-lg text-sm ${showEmailVerification
                                        ? 'bg-yellow-50 border-yellow-200 text-yellow-800'
                                        : 'bg-red-50 border-red-200 text-red-600'
                                    }`}>
                                    <div className="flex items-start gap-2">
                                        {showEmailVerification && <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                                        <div className="flex-1">
                                            <p>
                                                {localError ||
                                                    (error && 'data' in error && error.data && typeof error.data === 'object' && 'message' in error.data
                                                        ? String(error.data.message)
                                                        : 'Login failed. Please check your credentials.')}
                                            </p>
                                            {showEmailVerification && (
                                                <button
                                                    type="button"
                                                    onClick={handleResendVerification}
                                                    disabled={isResending || resendSuccess}
                                                    className="mt-2 text-[#1e3a8a] hover:text-[#1e40af] font-semibold underline disabled:opacity-50"
                                                >
                                                    {isResending ? 'Sending...' : resendSuccess ? '✓ Email sent!' : 'Resend Verification Email'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
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
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                                            placeholder="Username"
                                        />
                                    </div>
                                </div>

                                <div>
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
                                            required
                                            className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition-all"
                                            placeholder="Password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <Link
                                        to="/forgot-password"
                                        className="text-[#1e3a8a] hover:text-[#1e40af] text-sm font-medium transition-colors"
                                    >
                                        Forgot Username / Password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#4c1d95] hover:bg-[#5b21b6] text-white font-semibold py-3.5 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Signing In...
                                        </div>
                                    ) : (
                                        'LOGIN'
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <span className="text-gray-600 text-sm">Don't have an account? </span>
                                <Link
                                    to="/signup"
                                    className="text-[#1e3a8a] hover:text-[#1e40af] font-semibold text-sm transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignInPage;
