import { createServerFn } from "@tanstack/react-start";

export type TikTokVideo = {
  id: string;
  title: string;
  coverImageUrl: string;
  shareUrl: string;
  createTime: number;
  viewCount: number;
  likeCount: number;
};

export const getTikTokVideos = createServerFn({ method: "GET" }).handler(
  async (): Promise<TikTokVideo[]> => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const tiktokKey = process.env["TIKTOK_API_KEY"];
    if (!lovableKey || !tiktokKey) return [];

    const fields = "id,title,cover_image_url,share_url,create_time,view_count,like_count";
    const res = await fetch(
      `https://connector-gateway.lovable.dev/tiktok/video/list/?fields=${fields}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": tiktokKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ max_count: 6 }),
      },
    );

    if (!res.ok) {
      console.error(`TikTok feed failed [${res.status}]: ${await res.text()}`);
      return [];
    }

    const json = (await res.json()) as {
      data?: { videos?: Array<Record<string, unknown>> };
      error?: { code?: string; message?: string };
    };

    if (json.error && json.error.code && json.error.code !== "ok") {
      console.error(`TikTok feed error: ${json.error.code} ${json.error.message}`);
      return [];
    }

    return (json.data?.videos ?? []).map((v) => ({
      id: String(v["id"] ?? ""),
      title: String(v["title"] ?? ""),
      coverImageUrl: String(v["cover_image_url"] ?? ""),
      shareUrl: String(v["share_url"] ?? ""),
      createTime: Number(v["create_time"] ?? 0),
      viewCount: Number(v["view_count"] ?? 0),
      likeCount: Number(v["like_count"] ?? 0),
    }));
  },
);
