'use client'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type Step = 'email' | 'otp' | 'password' | 'done';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

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

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const primaryButtonClass =
    "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-neutral-950 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/40 dark:focus-visible:ring-white/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-linear-to-b from-[#4a4a4a] via-[#2a2a2a] to-[#121212] text-white hover:brightness-110 active:scale-95 dark:ring-1 dark:ring-white/15 h-10 px-4 py-2 w-full";

const otpBoxClass =
    "h-11 w-full rounded-md border border-neutral-200 bg-white text-center text-lg font-medium text-neutral-900 dark:border-white/15 dark:bg-white/5 dark:text-white ring-offset-white dark:ring-offset-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 dark:focus-visible:ring-white/40 focus-visible:ring-offset-2 transition-all duration-200";

const linkButtonClass =
    "text-neutral-900 dark:text-white underline underline-offset-4 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors disabled:cursor-not-allowed disabled:no-underline disabled:text-neutral-500 dark:disabled:text-neutral-400";

const STEP_CONTENT: Record<Step, { title: string; description: string }> = {
    email: {
        title: 'Forgot password?',
        description: "Enter your email and we'll send you a verification code",
    },
    otp: {
        title: 'Check your email',
        description: 'Enter the 6-digit code we sent to',
    },
    password: {
        title: 'Set new password',
        description: 'Your new password must be at least 8 characters',
    },
    done: {
        title: 'Password updated',
        description: 'You can now sign in with your new password',
    },
};

const stepVariants = {
    enter: (direction: number) => ({ opacity: 0, x: direction * 24 }),
    center: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction * -24 }),
};

// Floating Label Input Component
const FloatingLabelInput: React.FC<{
    id: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    icon: React.ReactNode;
    rightIcon?: React.ReactNode;
    onRightIconClick?: () => void;
}> = ({ id, type, value, onChange, placeholder, icon, rightIcon, onRightIconClick }) => {
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

// Main Component with shadcn/ui styling
const ForgotPasswordForm: React.FC = () => {
    const [step, setStep] = useState<Step>('email');
    const [direction, setDirection] = useState<number>(1);
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
    const [resendIn, setResendIn] = useState<number>(0);
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [height, setHeight] = useState<number | null>(null);

    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const reduceMotion = useReducedMotion();

    // Keep the card height in sync with the current step so it resizes smoothly
    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;
        const observer = new ResizeObserver(() => setHeight(el.offsetHeight + 16));
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Resend countdown
    useEffect(() => {
        if (step !== 'otp' || resendIn <= 0) return;
        const timer = setTimeout(() => setResendIn((s) => s - 1), 1000);
        return () => clearTimeout(timer);
    }, [step, resendIn]);

    // Focus the first OTP box when the OTP step opens
    useEffect(() => {
        if (step !== 'otp') return;
        const timer = setTimeout(() => otpRefs.current[0]?.focus(), 300);
        return () => clearTimeout(timer);
    }, [step]);

    const goTo = (next: Step, dir: number = 1) => {
        setDirection(dir);
        setStep(next);
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: call your API to send the OTP to `email`
        setOtp(Array(OTP_LENGTH).fill(''));
        setResendIn(RESEND_SECONDS);
        goTo('otp');
    };

    const handleOtpChange = (index: number, value: string) => {
        const digit = value.replace(/\D/g, '').slice(-1);
        setOtp((prev) => prev.map((d, i) => (i === index ? digit : d)));
        if (digit && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus();
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH).split('');
        if (!digits.length) return;
        setOtp(Array.from({ length: OTP_LENGTH }, (_, i) => digits[i] ?? ''));
        otpRefs.current[Math.min(digits.length, OTP_LENGTH - 1)]?.focus();
    };

    const handleResend = () => {
        // TODO: call your API to resend the OTP
        setOtp(Array(OTP_LENGTH).fill(''));
        setResendIn(RESEND_SECONDS);
        otpRefs.current[0]?.focus();
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: call your API to verify `otp.join('')`
        goTo('password');
    };

    const passwordError =
        newPassword && newPassword.length < 8
            ? 'Password must be at least 8 characters'
            : confirmPassword && newPassword !== confirmPassword
                ? 'Passwords do not match'
                : '';

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: call your API to set the new password
        goTo('done');
    };

    const content = STEP_CONTENT[step];

    return (
        <>
            <div className="fixed inset-0 z-40 flex overflow-y-auto p-6 bg-white dark:bg-neutral-950 scrollbar-none [&::-webkit-scrollbar]:hidden">
                <div className="w-full max-w-sm relative m-auto">
                    {/* Main Card with shadcn/ui styling */}
                    <div
                        ref={cardRef}
                        className="relative bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-white/10 rounded-lg p-6 transition-all duration-200"
                    >
                        {/* Animated height wrapper (padding keeps focus rings from being clipped) */}
                        <motion.div
                            initial={false}
                            animate={height === null ? undefined : { height }}
                            transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="-m-2 overflow-hidden p-2"
                        >
                            <div ref={contentRef}>
                                <AnimatePresence mode="wait" initial={false} custom={direction}>
                                    <motion.div
                                        key={step}
                                        custom={direction}
                                        variants={stepVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeInOut' }}
                                    >
                                        {/* Header */}
                                        <div className="flex flex-col space-y-2 text-center mb-6">
                                            {step === 'done' && (
                                                <div className="mx-auto inline-flex p-2 bg-neutral-100 dark:bg-white/5 rounded-md border border-neutral-200 dark:border-white/10 text-neutral-900 dark:text-white">
                                                    <CheckIcon />
                                                </div>
                                            )}
                                            <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                                                {content.title}
                                            </h1>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-300 break-words">
                                                {content.description}
                                                {step === 'otp' && (
                                                    <>
                                                        {' '}
                                                        <span className="font-medium text-neutral-900 dark:text-white">{email}</span>
                                                    </>
                                                )}
                                            </p>
                                        </div>

                                        {/* Step 1: Email */}
                                        {step === 'email' && (
                                            <form className="space-y-4" onSubmit={handleEmailSubmit}>
                                                <div className="space-y-2">
                                                    <FloatingLabelInput
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Email"
                                                        icon={<MailIcon />}
                                                    />
                                                </div>

                                                <button type="submit" disabled={!email} className={primaryButtonClass}>
                                                    Reset Password
                                                </button>
                                            </form>
                                        )}

                                        {/* Step 2: OTP */}
                                        {step === 'otp' && (
                                            <form className="space-y-4" onSubmit={handleOtpSubmit}>
                                                <div className="grid grid-cols-6 gap-2">
                                                    {otp.map((digit, index) => (
                                                        <input
                                                            key={index}
                                                            ref={(el) => {
                                                                otpRefs.current[index] = el;
                                                            }}
                                                            type="text"
                                                            inputMode="numeric"
                                                            autoComplete={index === 0 ? 'one-time-code' : 'off'}
                                                            maxLength={1}
                                                            value={digit}
                                                            aria-label={`Digit ${index + 1}`}
                                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                                            onPaste={handleOtpPaste}
                                                            className={otpBoxClass}
                                                        />
                                                    ))}
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={otp.some((d) => !d)}
                                                    className={primaryButtonClass}
                                                >
                                                    Verify Code
                                                </button>

                                                <div className="flex items-center justify-between text-sm">
                                                    <button
                                                        type="button"
                                                        onClick={handleResend}
                                                        disabled={resendIn > 0}
                                                        className={linkButtonClass}
                                                    >
                                                        {resendIn > 0 ? `Resend code in ${resendIn}s` : 'Resend code'}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => goTo('email', -1)}
                                                        className={linkButtonClass}
                                                    >
                                                        Change email
                                                    </button>
                                                </div>
                                            </form>
                                        )}

                                        {/* Step 3: New password */}
                                        {step === 'password' && (
                                            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                                                <div className="space-y-2">
                                                    <FloatingLabelInput
                                                        id="newPassword"
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        placeholder="New Password"
                                                        icon={<LockIcon />}
                                                        rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                                        onRightIconClick={() => setShowPassword(!showPassword)}
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <FloatingLabelInput
                                                        id="confirmPassword"
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        placeholder="Confirm Password"
                                                        icon={<LockIcon />}
                                                    />
                                                </div>

                                                {passwordError && (
                                                    <p className="text-xs text-red-600 dark:text-red-400">{passwordError}</p>
                                                )}

                                                <button
                                                    type="submit"
                                                    disabled={newPassword.length < 8 || newPassword !== confirmPassword}
                                                    className={primaryButtonClass}
                                                >
                                                    Update Password
                                                </button>
                                            </form>
                                        )}

                                        {/* Step 4: Done */}
                                        {step === 'done' && (
                                            <Link href="/login" className={primaryButtonClass}>
                                                Back to Login
                                            </Link>
                                        )}

                                        {/* Footer */}
                                        {step !== 'done' && (
                                            <div className="mt-6 space-y-2 text-center text-sm">
                                                <p className="text-neutral-600 dark:text-neutral-300">
                                                    Remember your password?{' '}
                                                    <Link
                                                        href="/login"
                                                        className="text-neutral-900 dark:text-white underline underline-offset-4 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                                                    >
                                                        Back to Login
                                                    </Link>
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPasswordForm;
