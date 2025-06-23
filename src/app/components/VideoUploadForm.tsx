import React, { useState } from "react";
import FileUpload from "./FileUpload";
import { useRouter } from "next/navigation";

function VideoUploadForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVideoUpload = (res: any) => {
    setVideoUrl(res.url || res.filePath || "");
    // Optionally, set thumbnail if available from ImageKit response

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!videoUrl) {
      setError("Please upload a video first.");
      return;
    }
    if (!title || !description) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          videoUrl,
        
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload video");
      }
      setSuccess("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setVideoUrl("");

      // Optionally, redirect or refresh
      // router.push("/home");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center">
          {success}
        </div>
      )}
      <div>
        <label className="block font-semibold mb-2">Video File</label>
        <FileUpload onSuccess={handleVideoUpload} fileType="video" />
        {videoUrl && (
          <video src={videoUrl} controls className="mt-4 w-full max-h-64 rounded" />
        )}
      </div>
      <div>
        <label className="block font-semibold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300"
          required
        />
      </div>
      {/* Optionally, allow thumbnail upload or preview if available */}
      <button
        type="submit"
        className="bg-gradient-to-r from-green-400 to-teal-400 text-white py-3 rounded-full font-semibold text-lg shadow hover:from-green-500 hover:to-teal-500 transition-colors w-full"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Reel"}
      </button>
    </form>
  );
}

export default VideoUploadForm;
