export function detectProvider(url) {
  if (!url) return "unknown";
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname === "youtu.be") return "youtube";
    if (u.hostname.includes("vimeo.com")) return "vimeo";
    if (u.hostname.includes("drive.google.com")) return "drive";
    if (url.endsWith(".mp4")) return "mp4";
    return "other";
  } catch {
    return "unknown";
  }
}