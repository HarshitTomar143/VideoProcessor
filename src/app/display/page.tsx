"use client";

import { useEffect, useState } from "react";
import VideoFeed from "../components/VideoFeed";
import { IVideo } from "../../../models/Video";
import { signOut } from "next-auth/react";

export default function DisplayVideosPage() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/video");
        const data = await res.json();
        if (res.ok && data.videos) {
          setVideos(data.videos);
        } else if (Array.isArray(data)) {
          setVideos(data);
        } else {
          throw new Error(data.message || "Failed to fetch videos");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  const handleDelete = (id: string) => {
    setVideos((prev) => prev.filter((v:any) => v._id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-8">
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors font-semibold"
        >
          Logout
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-8">All Videos</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500 mb-4">{error}</div>}
      {!loading && !error && <VideoFeed videos={videos} onDelete={handleDelete} />}
    </div>
  );
} 