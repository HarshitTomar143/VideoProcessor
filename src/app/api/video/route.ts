import { dbConnect } from "../../../../lib/db";
import Video, { IVideo } from "../../../../models/Video";
import { NextResponse, NextRequest } from "next/server";
import {getServerSession} from "next-auth"
import { authOptions } from "../../../../lib/auth";
import mongoose from "mongoose";

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
            !body.videoUrl  
            
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

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid video ID" }, { status: 400 });
    }

    await dbConnect();
    const deleted = await Video.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Optionally: Also delete from ImageKit here

    return NextResponse.json({ message: "Video deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error deleting video: " + error.message },
      { status: 500 }
    );
  }
}