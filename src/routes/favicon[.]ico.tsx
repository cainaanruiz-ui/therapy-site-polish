import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png.asset.json";

export const Route = createFileRoute("/favicon.ico")({
  server: {
    handlers: {
      GET: () => Response.redirect(`https://happy2helpcounseling.org${logoAsset.url}`, 301),
    },
  },
});