import { dbConnect } from "../../../../../lib/db";
import User from "../../../../../models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request){
    try {
        const {email, password}= await request.json()

        if(!email || !password){
            return new NextResponse(
                JSON.stringify({message: "Email or password is required"}),{status: 400}
            )
        }

        await dbConnect()

        const existingUser= await User.findOne({email})

        if(existingUser){
            return new NextResponse(
                JSON.stringify({message: "user already in database!"}),{status: 400}
            )
        }

        await User.create({
            email, password
        })

        return new NextResponse(
                JSON.stringify({message: "User registered Successfully!"}),{status: 200}
            )


    } catch (error:any) {
        return new NextResponse(
            
                JSON.stringify({message: "Error while registering user"+error.message}),{status: 500}
            
        )
    }
}