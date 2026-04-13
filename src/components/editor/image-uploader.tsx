"use client";

import { useCallback, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/r2";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setUploading(true);
      try {
        const url = await uploadImage(file);
        onUpload(url);
      } finally {
        setUploading(false);
      }
    },
    [onUpload]
  );

  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-zinc-700 px-4 py-2 text-sm text-zinc-400 hover:border-zinc-500 hover:text-zinc-300">
      {uploading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <ImagePlus size={16} />
      )}
      <span>{uploading ? "アップロード中..." : "画像を追加"}</span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        disabled={uploading}
      />
    </label>
  );
}
