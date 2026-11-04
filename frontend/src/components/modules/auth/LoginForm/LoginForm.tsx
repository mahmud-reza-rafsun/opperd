'use client'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { LoginAction } from '../actions/LoginAction';
import { googleLoginAction } from '../actions/GoogleLoginAction';
import { Button } from '@/components/ui/button';
import { GoogleIcon } from '../JoinForm/JoinForm';
import BackToHome from '../BackToHome/BackToHome';

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

const LoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const cardRef = useRef<HTMLDivElement>(null);
    const googleBtnWrapRef = useRef<HTMLDivElement>(null);
    const [googleWidth, setGoogleWidth] = useState<number>(0);
    const [googleError, setGoogleError] = useState<string>('');

    useEffect(() => {
        const el = googleBtnWrapRef.current;
        if (!el) return;

        const updateWidth = () =>
            setGoogleWidth(Math.min(Math.floor(el.offsetWidth), 400));

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await LoginAction({ email, password });

            if (result?.success) {
                toast.success("Logged in successfully!");
                router.push("/");
                router.refresh();
            } else {
                toast.error(result?.error || "Login failed. Please try again.");
            }
        } catch (error: any) {
            toast.error(error?.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (googleBtnWrapRef.current) {
            setGoogleWidth(googleBtnWrapRef.current.clientWidth);
        }
    }, []);

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        setGoogleError('');
        const idToken = credentialResponse.credential;

        if (!idToken) {
            setGoogleError('Google idToken not found');
            return;
        }

        try {
            const result = await googleLoginAction(idToken);

            if (!result.success) {
                throw new Error(result.message);
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            setGoogleError(
                error instanceof Error ? error.message : "Google login failed"
            );
        }
    };

    return (
        <>
            <div className="fixed inset-0 z-40 flex overflow-y-auto p-6 pt-24 bg-white dark:bg-neutral-950 scrollbar-none [&::-webkit-scrollbar]:hidden">
                <BackToHome />
                <div className="w-full max-w-sm relative m-auto">
                    <div
                        ref={cardRef}
                        className="relative bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-white/10 rounded-lg p-6 transition-all duration-200"
                    >
                        <div className="flex flex-col space-y-2 text-center mb-6">
                            <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white">
                                Welcome back
                            </h1>
                            <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                Enter your credentials to Login
                            </p>
                        </div>

                        <div className="w-full flex flex-col items-center">
                            <div
                                ref={googleBtnWrapRef}
                                className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white dark:ring-offset-neutral-950 transition-colors border border-neutral-200 bg-white text-neutral-900 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 h-10 px-4 w-full overflow-hidden"
                            >
                                {/* কাস্টম UI: লোগো একদম বামে এবং টেক্সট মাঝখানে */}
                                <div className="w-full grid grid-cols-[auto_1fr_auto] items-center pointer-events-none px-14">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                    </svg>
                                    <span className="text-center">Continue with Google</span>
                                    <span></span> {/* ব্যালেন্স ঠিক রাখার জন্য খালি স্প্যান */}
                                </div>

                                {/* ওপরে গুগলের অদৃশ্য আসল আইফ্রেমটি থাকবে, যা দিয়ে ক্লিক হ্যান্ডেল হবে */}
                                {googleWidth > 0 && (
                                    <div className="absolute inset-0 opacity-0 cursor-pointer flex justify-center">
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={() => setGoogleError("Google login failed")}
                                            theme="outline"
                                            size="large"
                                            width={googleWidth}
                                            text="continue_with"
                                            shape="rectangular"
                                        />
                                    </div>
                                )}
                            </div>
                            {googleError && (
                                <p className="mt-2 text-center text-xs text-red-500">{googleError}</p>
                            )}
                        </div>

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
                                    id="email"
                                    type="email"
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    icon={<LockIcon />}
                                    rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    onRightIconClick={togglePasswordVisibility}
                                />
                            </div>

                            <div className='flex justify-end text-xs'>
                                <Link
                                    href="/forgot-password"
                                    className="block text-neutral-900 dark:text-white underline underline-offset-4 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                                >
                                    Forgot your password?
                                </Link>
                            </div>

                            <Button
                                variant={"default"}
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex h-10 w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-500/90 font-semibold"
                            >
                                {isLoading ? "Signing In..." : "Sign In"}
                            </Button>
                        </form>

                        <div className="mt-6 space-y-2 text-center text-sm">
                            <p className="text-neutral-600 dark:text-neutral-300">
                                Don&apos;t have an account?{' '}
                                <Link
                                    href="/join"
                                    className="text-neutral-900 dark:text-white underline underline-offset-4 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                                >
                                    Join
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default LoginForm;
