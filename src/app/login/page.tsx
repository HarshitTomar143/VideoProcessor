"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {

    const[email,setEmail]= useState("");
    const[password, setPassword]= useState("");
    const router= useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()

        const response:any = await signIn("credentials",{
          email,
          password,
          redirect: false  
        })

        if(response?.error){
            console.log(response.error)
        }

        else{
            router.push("/")
        }
    }

  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>{e.target.value}} />
            <input type="password" value={password} placeholder='Password' onChange={(e)=>{e.target.value}} />
            <button type='submit'>Login</button>
            
        </form>

        <p>New User? <a href="/register">Sign UP</a></p>

        <button onClick = {()=> signIn("google")}>Signin using Google</button>
        <button onClick = {()=> signIn("github")}>Signin using GitHub</button>
    </div>
  )
}
