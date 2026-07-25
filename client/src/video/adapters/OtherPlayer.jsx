export default function OtherPlayer({ url, onReady }) {
  const target = { playVideo() {}, pauseVideo() {}, seekTo() {}, getCurrentTime: () => 0 };

  if (!url) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-gray-100 rounded-xl">
        No Video URL
      </div>
    );
  }

  return (
    <iframe
      src={url}
      width="100%"
      height="500"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      className="rounded-xl"
      title="Embedded Video"
      onLoad={() => onReady?.({ target })}
    />
  );
}