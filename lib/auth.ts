import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import   CredentialsProvider  from "next-auth/providers/credentials";
import { dbConnect } from "./db";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
  GitHubProvider({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!
  }),

  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!}),

    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {label: "Email", type: "text"},
            password: {label: "Password", type: "Password"}
        },

        async authorize(credentials:any){
            if(!credentials?.email || !credentials?.password){
                throw new Error("Either email or password is missing")
            }

            try {
                await dbConnect()
                const newUser= await User.findOne({email: credentials.email})

                if(!newUser){
                    throw new Error("No user found")
                }

                const isValid= await bcrypt.compare(credentials.password, newUser.password);

                if(!isValid){
                    throw new Error("Password does not match")
                }

                return {
                    id: newUser._id.toString(),
                    email: newUser.email
                }
            } catch (error:any) {
                throw new Error("Error while login: "+error.message)
            }
        }
    })      
],
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.id= user.id
            }

            return token
        },

        async session({token, session}){
            if(session.user){
                session.user.id= token.id as string 
            }

            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },

    session:{
        maxAge: 30*24*60*60,
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET!
};