import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(){
        return NextResponse.next()
    }, 
    {
        callbacks: {
            authorized({req,token}){
                const {pathname}=  req.nextUrl
                if(pathname.startsWith("/api/auth")||
                    pathname=== "/login" ||
                    pathname=== "/register" ||
                    
                    pathname.startsWith("/api/videos")
                ){
                return true
            }

            return !!token // this !! converts token to boolean value if there is token it's true either false
            }
        }
    }
)

export const config= {
    matcher : [
        "/((?!_next/static|_next/image| favicon.ico| public/).*)",
    ],
};