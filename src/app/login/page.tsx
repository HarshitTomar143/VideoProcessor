"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const response: any = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        if (response?.error) {
            setError(response.error);
        } else {
            router.push("/home");
        }
    };

    return (
        <div className="min-h-screen flex font-sans">
            {/* Left: Login */}
            <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-white">
                {/* Heading */}
                <h1 className="text-5xl font-bold mb-2 text-black ">Login to Your Account</h1>
                <p className="text-gray-600 mb-6">Login using social networks</p>
                {/* Social login buttons */}
                <div className="flex gap-4 mb-6 justify-start">
                    <button
                        type="button"
                        onClick={() => signIn('google')}
                        className="w-12 h-12 cursor-pointer rounded-full flex items-center justify-center bg-white border border-gray-200 text-xl shadow hover:scale-105 transition"
                        aria-label="Sign in with Google"
                    >
                        {/* Official Google SVG */}
                        <svg width="24" height="24" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.1.9 7.1 2.4l6.4-6.4C33.5 6.1 28.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.2 19.2 13 24 13c2.7 0 5.1.9 7.1 2.4l6.4-6.4C33.5 6.1 28.1 4 24 4c-7.2 0-13.4 3.1-17.7 8.1z"/><path fill="#FBBC05" d="M24 44c5.8 0 10.7-1.9 14.6-5.1l-6.7-5.5C29.8 36 24 36 24 36c-5.8 0-10.7-1.9-14.6-5.1l6.7-5.5C18.2 33.8 21 36 24 36z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-3 0-5.8-1.2-7.9-3.1l-6.7 5.5C13.3 42.1 18.1 44 24 44c8.1 0 15-5.2 18.2-12.5z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => signIn('github')}
                        className="w-12 h-12 cursor-pointer  rounded-full flex items-center justify-center bg-[#24292f] text-white text-xl shadow hover:scale-105 transition"
                        aria-label="Sign in with GitHub"
                    >
                        {/* GitHub SVG */}
                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.003-.404 1.019.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/></svg>
                    </button>
                </div>
                {/* Divider */}
                <div className="flex items-center mb-6">
                    <div className="flex-grow h-px bg-gray-200" />
                    <span className="mx-4 text-gray-400 font-medium">OR</span>
                    <div className="flex-grow h-px bg-gray-200" />
                </div>
                {/* Login form */}
                {error && (
                    <div className="mb-4 w-full max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-100">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-3 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-700 placeholder-gray-400"
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="px-4 py-3 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-700 placeholder-gray-400 w-full pr-12"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowPassword((v) => !v)}
                            tabIndex={-1}
                            aria-label="Toggle password visibility"
                        >
                            {/* Eye icon */}
                            {showPassword ? (
                                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                            ) : (
                                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06M1 1l22 22"/></svg>
                            )}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r cursor-pointer from-green-400 to-teal-400 text-white py-3 rounded-full font-semibold text-lg shadow hover:from-green-500 hover:to-teal-500 transition-colors"
                    >
                        Sign In
                    </button>
                </form>
            </div>
            {/* Right: Sign Up CTA */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-green-400 to-teal-400 relative">
                <div className="text-white text-center px-8">
                    <h2 className="text-3xl font-bold mb-4 mt-8">New Here?</h2>
                    <p className="mb-8 text-lg">Sign up and discover a great amount of new opportunities!</p>
                    <button
                        onClick={() => router.push('/register')}
                        className="bg-white cursor-pointer text-teal-500 font-semibold px-10 py-3 rounded-full shadow hover:bg-gray-100 transition-colors text-lg"
                    >
                        Sign Up
                    </button>
                </div>
                {/* Decorative shapes */}
                <svg className="absolute top-10 left-10 opacity-20" width="100" height="100" viewBox="0 0 100 100"><polygon points="50,15 90,85 10,85" fill="white" /></svg>
                <svg className="absolute bottom-10 right-10 opacity-20" width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="white" /></svg>
            </div>
        </div>
    )
}
