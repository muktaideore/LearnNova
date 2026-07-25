import YouTube from "react-youtube";

function getYoutubeId(url) {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("m.youtube.com")) {
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/shorts/")[1];
      return u.searchParams.get("v");
    }
    return "";
  } catch {
    return "";
  }
}

export default function YoutubePlayer({ url, onReady, onPlay, onPause, onStateChange }) {
  const videoId = getYoutubeId(url);

  return (
    <YouTube
      videoId={videoId}
      opts={{
        width: "100%",
        height: "500",
        playerVars: { autoplay: 0, rel: 0, modestbranding: 1 },
      }}
      onReady={onReady}
      onPlay={onPlay}
      onPause={onPause}
      onStateChange={onStateChange}
    />
  );
}