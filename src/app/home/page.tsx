"use client";

import VideoUploadForm from "../components/VideoUploadForm";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function VideoUploadPage() {
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end gap-4 mb-8">
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors font-semibold"
        >
          Logout
        </button>
        <button
          onClick={() => router.push('/display')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors font-semibold"
        >
          View All Videos
        </button>
      </div>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>
        <VideoUploadForm />
      </div>
    </div>
  );
}
