function getDriveFileId(url) {
  try {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match) return match[1];
    const u = new URL(url);
    return u.searchParams.get("id") || "";
  } catch {
    return "";
  }
}

export default function DrivePlayer({ url, onReady }) {
  const fileId = getDriveFileId(url);
  const target = { playVideo() {}, pauseVideo() {}, seekTo() {}, getCurrentTime: () => 0 };

  if (!fileId) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-gray-100 rounded-xl">
        Invalid Google Drive Link
      </div>
    );
  }

  return (
    <iframe
      src={`https://drive.google.com/file/d/${fileId}/preview`}
      width="100%"
      height="500"
      allow="autoplay"
      allowFullScreen
      className="rounded-xl"
      title="Google Drive Player"
      onLoad={() => onReady?.({ target })}
    />
  );
}