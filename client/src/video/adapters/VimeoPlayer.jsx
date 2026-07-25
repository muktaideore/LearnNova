import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

function getVimeoId(url) {
  try {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : "";
  } catch {
    return "";
  }
}

export default function VimeoPlayer({ url, onReady, onPlay, onPause, onStateChange }) {
  const containerRef = useRef(null);
  const playerInstanceRef = useRef(null);
  const videoId = getVimeoId(url);

  useEffect(() => {
    if (!videoId || !containerRef.current) return;

    // Clear any leftover embed before creating a new one
    containerRef.current.innerHTML = "";

    const player = new Player(containerRef.current, { id: videoId, width: "100%" });
    playerInstanceRef.current = player;

    const target = {
      playVideo: () => player.play(),
      pauseVideo: () => player.pause(),
      seekTo: (seconds) => player.setCurrentTime(seconds),
      getCurrentTime: () => player.getCurrentTime(),
    };

    player.ready().then(() => onReady?.({ target }));
    player.on("play", () => onPlay?.({ target }));
    player.on("pause", () => onPause?.({ target, data: 2 }));
    player.on("seeked", () => onStateChange?.({ target, data: 1 }));

    return () => {
      player.destroy().catch(() => {});
      playerInstanceRef.current = null;
    };
  }, [videoId]);

  if (!videoId) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-gray-100 rounded-xl">
        Invalid Vimeo URL
      </div>
    );
  }

  return <div ref={containerRef} className="rounded-xl overflow-hidden" style={{ minHeight: "500px" }} />;
}