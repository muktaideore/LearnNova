import { useRef } from "react";

export default function Mp4Player({ url, onReady, onPlay, onPause, onStateChange }) {
  const videoRef = useRef(null);

  const makeTarget = () => ({
    playVideo: () => videoRef.current?.play(),
    pauseVideo: () => videoRef.current?.pause(),
    seekTo: (seconds) => { if (videoRef.current) videoRef.current.currentTime = seconds; },
    getCurrentTime: () => videoRef.current?.currentTime || 0,
  });

  return (
    <video
      ref={videoRef}
      width="100%"
      height="500"
      controls
      controlsList="nodownload"
      className="rounded-xl bg-black"
      onLoadedMetadata={() => onReady?.({ target: makeTarget() })}
      onPlay={() => onPlay?.({ target: makeTarget() })}
      onPause={() => onPause?.({ target: makeTarget(), data: 2 })}
      onSeeked={() => onStateChange?.({ target: makeTarget(), data: 1 })}
    >
      <source src={url} type="video/mp4" />
      Your browser does not support HTML5 video.
    </video>
  );
}