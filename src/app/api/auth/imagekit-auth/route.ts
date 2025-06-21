import { NextResponse } from "next/server"
import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    

    try {
        const authenticationParameters = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, 
            publicKey: process.env.IMAGEKIT_PUBLIC_PUBLIC_KEY as string,
           
        })
    
        return Response.json({
            authenticationParameters,
            publicKey: process.env.IMAGEKIT_PUBLIC_PUBLIC_KEY 
        })
    } catch (error:any) {
        return new NextResponse(
            JSON.stringify({message: "Error"+error.message}),{status: 500}
        )
    }
}