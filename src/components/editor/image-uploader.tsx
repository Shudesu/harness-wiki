"use client";

import { useCallback, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/r2";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
}

async function compressImage(file: File, maxWidth = 800): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ratio = Math.min(maxWidth / img.width, 1);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          resolve(
            new File([blob!], file.name.replace(/\.\w+$/, ".webp"), {
              type: "image/webp",
            })
          );
        },
        "image/webp",
        0.7
      );
    };
    img.src = URL.createObjectURL(file);
  });
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) return;
      setUploading(true);
      try {
        const compressed = await compressImage(file);
        const url = await uploadImage(compressed);
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
