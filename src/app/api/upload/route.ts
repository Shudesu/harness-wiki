import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "png";
  const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  try {
    const { env } = getRequestContext();
    if (env.WIKI_IMAGES) {
      await env.WIKI_IMAGES.put(key, file.stream(), {
        httpMetadata: { contentType: file.type },
      });
      return NextResponse.json({
        url: `https://pub-f29d8bc96bf4452c97054316ddf25567.r2.dev/${key}`,
      });
    }
  } catch {
    // Fallback for local dev
  }

  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return NextResponse.json({
    url: `data:${file.type};base64,${base64}`,
  });
}
