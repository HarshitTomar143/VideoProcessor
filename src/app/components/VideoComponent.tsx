import { IKVideo } from "imagekitio-next";
import Link from "next/link";
import { IVideo } from "../../../models/Video";

export default function VideoComponent({ video, onDelete }: { video: IVideo, onDelete?: (id: string) => void }) {
  const handleDelete = async () => {
    if (!onDelete) return;
    if (!confirm("Are you sure you want to delete this video?")) return;
    const res = await fetch("/api/video", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: video._id }),
    });
    if (res.ok) {
      onDelete(video._id as unknown as string);
    } else {
      alert("Failed to delete video");
    }
  };

  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div
            className="rounded-xl overflow-hidden relative w-full"
            style={{ aspectRatio: "9/16" }}
          >
            <IKVideo
              urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT!}
              src={video.videoUrl}
              transformation={[
                {
                  height: "1920",
                  width: "1080",
                },
              ]}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg">{video.title}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
        {onDelete && (
          <button
            onClick={handleDelete}
            className="mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
