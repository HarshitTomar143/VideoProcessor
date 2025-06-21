import { dbConnect } from "../../../../lib/db";
import Video, { IVideo } from "../../../../models/Video";
import { NextResponse, NextRequest } from "next/server";
import {getServerSession} from "next-auth"
import { authOptions } from "../../../../lib/auth";

export async function GET(){
    try {
        await dbConnect()
        const videos = await Video.find({}).sort({createAt: -1}).lean()

        if(!videos || videos.length === 0){
            return NextResponse.json([],{status:200})
        }

        return new NextResponse(
            JSON.stringify({videos}),{status: 200}
        )
    } catch (error:any) {
        return new NextResponse(
            JSON.stringify({message: "Error while fetching Videos!"}),{status: 500}
        )
    }
}

export async function POST(request:NextRequest){
    try {
        const session= await getServerSession(authOptions)
        if(!session){
            return NextResponse.json(
                {error: "Unauthorized"},
                {status: 401}
            )
        }

        await dbConnect()

        const body: IVideo= await request.json()

        if(
            !body.title ||
            !body.description ||
            !body.videoUrl || 
            !body.thumbnailUrl
        ){
            return NextResponse.json(
                {error: "Missing required fields"},
                {status: 401}
            )
        }

        const videoData = {
            ...body,
            controls: body?.controls??true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality?? 100
            }
        }

        const newVideo= await Video.create(videoData)

        return  NextResponse.json(newVideo)
    } catch (error:any) {
        return new NextResponse(
            JSON.stringify({message:"Error while uploading video "+error.message}),{status: 500}
        )
    }
}