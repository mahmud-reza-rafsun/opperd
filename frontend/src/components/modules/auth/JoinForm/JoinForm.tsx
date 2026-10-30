'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { RegisterAction } from '../actions/RegisterAction';
import { ResendOtpAction, VerifyOtpAction } from '../actions/OtpActions';
import { Button } from '@/components/ui/button';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const MailIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

const LockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <circle cx="12" cy="16" r="1"></circle>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const EyeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeOffIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
);

export const GoogleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);

const FloatingLabelInput: React.FC<{
    id: string;
    type: string;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon: React.ReactNode;
    rightIcon?: React.ReactNode;
    onRightIconClick?: () => void;
}> = ({ id, type, value, name, onChange, placeholder, icon, rightIcon, onRightIconClick }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500 dark:text-neutral-400 transition-colors group-focus-within:text-neutral-900 dark:group-focus-within:text-white">
                {icon}
            </div>
            <input
                id={id}
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="flex h-10 w-full rounded-md border border-neutral-200 bg-white text-neutral-900 dark:border-white/15 dark:bg-white/5 dark:text-white pl-10 pr-10 py-2 text-sm ring-offset-white dark:ring-offset-neutral-950 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 dark:focus-visible:ring-white/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 peer placeholder-transparent"
                placeholder={placeholder}
            />
            <label
                htmlFor={id}
                className={`absolute left-10 transition-all duration-200 pointer-events-none text-sm font-medium ${isFocused || value
                    ? '-top-2 text-xs bg-white dark:bg-neutral-950 px-2 text-neutral-900 dark:text-white rounded-sm'
                    : 'top-2.5 text-neutral-500 dark:text-neutral-400'
                    }`}
            >
                {placeholder}
            </label>
            {rightIcon && (
                <button
                    type="button"
                    onClick={onRightIconClick}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors focus:outline-none focus:text-neutral-900 dark:focus:text-white"
                >
                    {rightIcon}
                </button>
            )}
        </div>
    );
};

const primaryButtonClass =
    "inline-flex h-10 w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-white transition hover:brightness-110 active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 focus-visible:ring-offset-2 ring-offset-white dark:ring-offset-neutral-950 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-900 dark:ring-1 dark:ring-white/15 shadow-sm dark:shadow-none";

const RegisterForm: React.FC = () => {
    const router = useRouter();

    const [step, setStep] = useState<'register' | 'otp'>('register');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [resendTimer, setResendTimer] = useState<number>(0);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const cardRef = useRef<HTMLDivElement>(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (step === 'otp') {
            const t = setTimeout(() => otpRefs.current[0]?.focus(), 350);
            return () => clearTimeout(t);
        }
    }, [step]);

    useEffect(() => {
        if (resendTimer <= 0) return;
        const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
        return () => clearTimeout(t);
    }, [resendTimer]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await RegisterAction({
                name: fullName,
                email,
                password,
            });

            if (result?.success) {
                toast.success("OTP sent to your email!");
                setOtp(Array(OTP_LENGTH).fill(''));
                setResendTimer(RESEND_SECONDS);
                setStep('otp');
            } else {
                toast.error(result?.error || "Registration failed. Please try again.");
            }
        } catch (error: any) {
            toast.error(error?.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOtp = async (code: string) => {
        if (code.length !== OTP_LENGTH || isVerifying) return;
        setIsVerifying(true);

        try {
            const result = await VerifyOtpAction({ email, otp: code });

            if (result?.success) {
                toast.success("Email verified! Logging you in...");
                router.push('/');
                router.refresh();
            } else {
                toast.error(result?.error || "Invalid OTP. Please try again.");
                setOtp(Array(OTP_LENGTH).fill(''));
                otpRefs.current[0]?.focus();
            }
        } catch (error: any) {
            toast.error(error?.message || "An unexpected error occurred.");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        const digit = value.replace(/\D/g, '').slice(-1);
        const next = [...otp];
        next[index] = digit;
        setOtp(next);

        if (digit && index < OTP_LENGTH - 1) {
            otpRefs.current[index + 1]?.focus();
        }

        if (next.every((d) => d !== '')) {
            verifyOtp(next.join(''));
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
        if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
        if (!pasted) return;

        const next = Array(OTP_LENGTH).fill('');
        pasted.split('').forEach((d, i) => (next[i] = d));
        setOtp(next);
        otpRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();

        if (pasted.length === OTP_LENGTH) {
            verifyOtp(pasted);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;

        try {
            const result = await ResendOtpAction({ email });
            if (result?.success) {
                toast.success("A new OTP has been sent!");
                setResendTimer(RESEND_SECONDS);
                setOtp(Array(OTP_LENGTH).fill(''));
                otpRefs.current[0]?.focus();
            } else {
                toast.error(result?.error || "Could not resend OTP.");
            }
        } catch (error: any) {
            toast.error(error?.message || "An unexpected error occurred.");
        }
    };

    const handleBack = () => {
        setOtp(Array(OTP_LENGTH).fill(''));
        setStep('register');
    };

    return (
        <div className="fixed inset-0 z-40 flex overflow-y-auto p-6 pt-24 bg-white dark:bg-neutral-950 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <style>{`
                @keyframes stepInRight {
                    from { opacity: 0; transform: translateX(24px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes stepInLeft {
                    from { opacity: 0; transform: translateX(-24px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>

            <div className="w-full max-w-sm relative m-auto">
                <div
                    ref={cardRef}
                    className="relative bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-white/10 rounded-lg p-6 transition-all duration-200 overflow-hidden"
                >
                    {step === 'register' ? (
                        <div
                            key="register"
                            style={{ animation: 'stepInLeft 0.35s ease-out' }}
                        >
                            <div className="flex flex-col space-y-2 text-center mb-6">
                                <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                                    Create an account
                                </h1>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    Enter your details below to create your account
                                </p>
                            </div>

                            <Button
                                variant={"outline"}
                                type="button"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-neutral-950 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 dark:focus-visible:ring-white/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-neutral-200 bg-white text-neutral-900 cursor-pointer hover:bg-neutral-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 h-10 px-4 py-2 w-full"
                            >
                                <GoogleIcon />
                                <span className="ml-2">Continue with Google</span>
                            </Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-neutral-200 dark:border-white/10" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white dark:bg-neutral-950 px-2 text-neutral-500 dark:text-neutral-400">
                                        Or
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <FloatingLabelInput
                                        id="fullName"
                                        type="text"
                                        value={fullName}
                                        name="fullName"
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Full Name"
                                        icon={<UserIcon />}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FloatingLabelInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Email"
                                        icon={<MailIcon />}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FloatingLabelInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        icon={<LockIcon />}
                                        rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        onRightIconClick={togglePasswordVisibility}
                                    />
                                </div>

                                <Button
                                    variant="default"
                                    type="submit"
                                    disabled={isLoading}
                                    className={primaryButtonClass}
                                >
                                    {isLoading ? "Creating Account..." : "Create Account"}
                                </Button>
                            </form>

                            <div className="mt-6 text-center text-sm">
                                <span className="text-neutral-600 dark:text-neutral-300">
                                    Already have an account?{' '}
                                    <Link
                                        href="/login"
                                        className="text-neutral-900 dark:text-white underline underline-offset-4 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                                    >
                                        Login
                                    </Link>
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div
                            key="otp"
                            style={{ animation: 'stepInRight 0.35s ease-out' }}
                        >
                            <div className="flex flex-col space-y-2 text-center mb-6">
                                <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                                    Verify your email
                                </h1>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                    We sent a 6-digit code to
                                </p>
                                <p className="text-sm font-medium text-neutral-900 dark:text-white break-all">
                                    {email}
                                </p>
                            </div>

                            <div className="flex justify-between gap-2 mb-6">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            otpRefs.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete={index === 0 ? "one-time-code" : "off"}
                                        maxLength={1}
                                        value={digit}
                                        disabled={isVerifying}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        onPaste={handleOtpPaste}
                                        onFocus={(e) => e.target.select()}
                                        className="h-12 w-full min-w-0 rounded-md border border-neutral-200 bg-white text-neutral-900 dark:border-white/15 dark:bg-white/5 dark:text-white text-center text-lg font-semibold ring-offset-white dark:ring-offset-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 dark:focus-visible:ring-white/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                disabled={isVerifying || otp.some((d) => d === '')}
                                onClick={() => verifyOtp(otp.join(''))}
                                className={primaryButtonClass}
                            >
                                {isVerifying ? "Verifying..." : "Verify & Continue"}
                            </button>

                            <div className="mt-6 flex flex-col items-center gap-2 text-sm">
                                <span className="text-neutral-600 dark:text-neutral-300">
                                    Didn't receive the code?{' '}
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        disabled={resendTimer > 0}
                                        className="text-neutral-900 dark:text-white underline underline-offset-4 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors disabled:no-underline disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
                                    </button>
                                </span>
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                                >
                                    ← Change email
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
