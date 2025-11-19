import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2, Mail } from 'lucide-react';
import { useVerifyEmailMutation, useResendVerificationMutation } from '../features/api';
import { Topbar } from '../Components/Topbar';
import { Footer } from '../Components/Footer';

export const EmailVerificationPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [verifyEmail] = useVerifyEmailMutation();
    const [resendVerification, { isLoading: isResending }] = useResendVerificationMutation();

    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [showResendForm, setShowResendForm] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);

    useEffect(() => {
        if (token) {
            handleVerification();
        } else {
            setVerificationStatus('error');
            setErrorMessage('Invalid verification link. No token provided.');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleVerification = async () => {
        if (!token) return;

        try {
            const response = await verifyEmail({ token }).unwrap();

            // Check for success response
            if (response.success) {
                setVerificationStatus('success');

                // Redirect to sign in after 3 seconds
                setTimeout(() => {
                    navigate('/signin');
                }, 3000);
            } else {
                setVerificationStatus('error');
                setErrorMessage(response.message || 'Email verification failed.');
            }
        } catch (err) {
            const error = err as {
                data?: {
                    success?: boolean;
                    message?: string;
                    error?: string;
                    statusCode?: number;
                    data?: {
                        canResend?: boolean;
                        email?: string;
                    };
                };
                status?: number;
            };

            setVerificationStatus('error');

            // Extract email for potential resend
            if (error?.data?.data?.email) {
                setEmail(error.data.data.email);
            }

            // Show appropriate error message
            const errorMsg = error?.data?.error || error?.data?.message || 'Email verification failed. The link may be expired or invalid.';
            setErrorMessage(errorMsg);

            // Show resend option if token is expired
            if (error?.data?.statusCode === 400 || error?.status === 400) {
                setShowResendForm(true);
            }
        }
    };

    const handleResendVerification = async (e: React.FormEvent) => {
        e.preventDefault();
        setResendSuccess(false);
        setErrorMessage('');

        if (!email) {
            setErrorMessage('Please enter your email address');
            return;
        }

        try {
            const response = await resendVerification({ email }).unwrap();

            if (response.success) {
                setResendSuccess(true);
                setErrorMessage('');
                // Don't clear email - user might need it again
            } else {
                setErrorMessage(response.message || 'Failed to resend verification email.');
            }
        } catch (err) {
            const error = err as {
                data?: {
                    success?: boolean;
                    message?: string;
                    error?: string;
                    statusCode?: number;
                    data?: {
                        retryAfter?: number;
                    };
                };
                status?: number;
            };

            // Handle rate limiting (429)
            if (error?.data?.statusCode === 429 || error?.status === 429) {
                const retryAfter = error?.data?.data?.retryAfter;
                const waitTime = retryAfter ? Math.ceil(retryAfter / 60) : 5;
                setErrorMessage(`Too many requests. Please wait ${waitTime} minute(s) before trying again.`);
            } else {
                setErrorMessage(error?.data?.error || error?.data?.message || 'Failed to resend verification email. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Topbar />

            <div className="flex-1 flex items-center justify-center p-4 bg-linear-to-br from-blue-50 to-indigo-100">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                    {/* Verification Status */}
                    {verificationStatus === 'pending' && (
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Verifying Your Email
                            </h2>
                            <p className="text-gray-600">
                                Please wait while we verify your email address...
                            </p>
                        </div>
                    )}

                    {verificationStatus === 'success' && (
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Email Verified Successfully!
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Your email has been verified. You can now sign in to your account.
                            </p>
                            <div className="space-y-3">
                                <Link
                                    to="/signin"
                                    className="block w-full bg-[#5773da] hover:bg-[#4861c9] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                                >
                                    Go to Sign In
                                </Link>
                                <p className="text-sm text-gray-500">
                                    Redirecting automatically in 3 seconds...
                                </p>
                            </div>
                        </div>
                    )}

                    {verificationStatus === 'error' && (
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                <XCircle className="w-8 h-8 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Verification Failed
                            </h2>
                            <p className="text-red-600 mb-6">
                                {errorMessage}
                            </p>

                            {!showResendForm ? (
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setShowResendForm(true)}
                                        className="w-full bg-[#5773da] hover:bg-[#4861c9] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                                    >
                                        Resend Verification Email
                                    </button>
                                    <Link
                                        to="/signin"
                                        className="block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
                                    >
                                        Back to Sign In
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <form onSubmit={handleResendVerification} className="space-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Mail className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your email"
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5773da] focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        {resendSuccess && (
                                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-left">
                                                Verification email sent! Please check your inbox.
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isResending}
                                            className="w-full bg-[#5773da] hover:bg-[#4861c9] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            {isResending ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                'Send Verification Email'
                                            )}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setShowResendForm(false)}
                                            className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};
