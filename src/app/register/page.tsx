"use client";

import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
export default function RegisterPage() {
 
    const[email, setEmail] = useState("");
    const[password, setPassword]= useState("");
    const[confirmPassword, setConfirmPassword]= useState("");
    const router= useRouter()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault();

        if(password !== confirmPassword){
            alert("Password do not match");
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

            console.log(data)
            router.push("/login");
        } catch (error:any) {
            return "Error! : Something went Wrong "+error.message
        }
    }

    return (
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Email' value={email} onChange={(e)=> {setEmail(e.target.value)}}  />
        <input type="password" placeholder='Password' value={password} onChange={(e)=> {setPassword(e.target.value)}}  />
        <input type="password" placeholder='Password' value={password} onChange={(e)=> {setConfirmPassword(e.target.value)}}  />
      </form>

      <div>
        <p>Already have an account <a href="/login">Login</a></p>
      </div>
    </div>
  )
}
