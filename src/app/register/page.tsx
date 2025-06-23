"use client";

import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
export default function RegisterPage() {
 
    const[email, setEmail] = useState("");
    const[password, setPassword]= useState("");
    const[confirmPassword, setConfirmPassword]= useState("");
    const[error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router= useRouter()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        setError("");
        if(password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }
        try {
            const response= await fetch("/api/auth/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            const data= await response.json()
            if(!response.ok){
                throw new Error(data.error || "Registration Failed")
            }
            router.push("/login");
        } catch (error:any) {
            setError("Error: " + error.message);
        }
    }

    return (
        <div className="min-h-screen flex font-sans">
            {/* Left: Register */}
            <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-white">
                <h1 className="text-5xl font-bold mb-2 text-black">Create Your Account</h1>
                <p className="text-gray-600 mb-6">Sign up to get started</p>
                {error && (
                    <div className="mb-4 w-full max-w-md bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-100 max-w-md ">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=> {setEmail(e.target.value)}}
                        className="px-4 py-3 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-700 placeholder-gray-400"
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e)=> {setPassword(e.target.value)}}
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
                            {showPassword ? (
                                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                            ) : (
                                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06M1 1l22 22"/></svg>
                            )}
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e)=> {setConfirmPassword(e.target.value)}}
                            className="px-4 py-3 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-700 placeholder-gray-400 w-full pr-12"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowConfirmPassword((v) => !v)}
                            tabIndex={-1}
                            aria-label="Toggle confirm password visibility"
                        >
                            {showConfirmPassword ? (
                                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                            ) : (
                                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.77 21.77 0 0 1 5.06-6.06M1 1l22 22"/></svg>
                            )}
                        </button>
                    </div>
                    <button
                        type='submit'
                        className="bg-gradient-to-r cursor-pointer from-green-400 to-teal-400 text-white py-3 rounded-full font-semibold text-lg shadow hover:from-green-500 hover:to-teal-500 transition-colors"
                    >
                        Register
                    </button>
                </form>
            </div>
            {/* Right: Login CTA */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-green-400 to-teal-400 relative">
                <div className="text-white text-center px-8">
                    <h2 className="text-3xl font-bold mb-4 mt-8">Already have an account?</h2>
                    <p className="mb-8 text-lg">Login and continue your journey!</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="bg-white cursor-pointer text-teal-500 font-semibold px-10 py-3 rounded-full shadow hover:bg-gray-100 transition-colors text-lg"
                    >
                        Login
                    </button>
                </div>
                {/* Decorative shapes */}
                <svg className="absolute top-10 left-10 opacity-20" width="100" height="100" viewBox="0 0 100 100"><polygon points="50,15 90,85 10,85" fill="white" /></svg>
                <svg className="absolute bottom-10 right-10 opacity-20" width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="50" fill="white" /></svg>
            </div>
        </div>
    )
}
