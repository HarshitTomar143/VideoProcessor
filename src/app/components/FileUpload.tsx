"use client";

import {
    upload,
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
} from "@imagekit/next";

import { useRef, useState } from "react";

interface FileUploadProps {
    onSuccess: (res: any) => void;
    onProgress?: (progress: number) => void;
    filetype?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, filetype }: FileUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File) => {
        if (filetype === "video" && !file.type.startsWith("video/")) {
            setError("Please upload a valid video file");
            return false;
        }

        if (file.size > 100 * 1024 * 1024) {
            setError("File size should not exceed 100 MB");
            return false;
        }

        return true;
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !validateFile(file)) return;

        setUploading(true);
        setError(null);

        try {
            const authRes = await fetch("/api/auth/imagekit-auth");
            const auth = await authRes.json();

            const res = await upload({
                file,
                fileName: file.name,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                signature: auth.signature,
                token: auth.token,
                expire: auth.expire,
                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percent = (event.loaded / event.total) * 100;
                        onProgress(Math.round(percent));
                    }
                },
            });

            onSuccess(res);
        } catch (error: any) {
            console.error("Upload error:", error.message);
            setError("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <input
                type="file"
                accept={filetype === "video" ? "video/*" : "image/*"}
                onChange={handleFileChange}
                disabled={uploading}
            />
            {uploading && <span>Uploading...</span>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </>
    );
};

export default FileUpload;
