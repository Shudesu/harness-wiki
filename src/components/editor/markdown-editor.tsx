"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ImageUploader } from "./image-uploader";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  const [tab, setTab] = useState<"write" | "preview">("write");

  const insertImage = (url: string) => {
    onChange(value + `\n![image](${url})\n`);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTab("write")}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
            tab === "write" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400"
          }`}
        >
          書く
        </button>
        <button
          onClick={() => setTab("preview")}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
            tab === "preview" ? "bg-zinc-800 text-zinc-100" : "text-zinc-400"
          }`}
        >
          プレビュー
        </button>
        <div className="ml-auto">
          <ImageUploader onUpload={insertImage} />
        </div>
      </div>

      {tab === "write" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Markdownで記事を書く..."
          className="min-h-[400px] w-full resize-y rounded-xl border border-zinc-800 bg-zinc-900 p-4 font-mono text-sm text-zinc-100 placeholder-zinc-600 focus:border-zinc-600 focus:outline-none"
        />
      ) : (
        <div className="prose prose-invert min-h-[400px] max-w-none rounded-xl border border-zinc-800 bg-zinc-900 p-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
