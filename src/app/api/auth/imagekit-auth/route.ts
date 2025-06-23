import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const auth = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      publicKey: process.env.IMAGEKIT_PUBLIC_PUBLIC_KEY!,
    });

    return NextResponse.json({
      token: auth.token,
      signature: auth.signature,
      expire: auth.expire,
      publicKey: process.env.IMAGEKIT_PUBLIC_PUBLIC_KEY!,
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ message: "ImageKit Auth Error: " + error.message }),
      { status: 500 }
    );
  }
}
