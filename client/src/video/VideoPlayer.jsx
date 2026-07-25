// import { detectProvider } from "./utils/detectProvider";

// import {
//   YoutubePlayer,
//   VimeoPlayer,
//   Mp4Player,
//   DrivePlayer,
// } from "./adapters";

// export default function VideoPlayer({
//   url,
//   onReady,
//   onPlay,
//   onPause,
//   onStateChange,
// }) {
//   const provider = detectProvider(url);

//   switch (provider) {
//     case "youtube":
//       return (
//         <YoutubePlayer
//           url={url}
//           onReady={onReady}
//           onPlay={onPlay}
//           onPause={onPause}
//           onStateChange={onStateChange}
//         />
//       );

//     case "vimeo":
//       return <VimeoPlayer url={url} />;

//     case "mp4":
//       return <Mp4Player url={url} />;

//     case "drive":
//       return <DrivePlayer url={url} />;

//     default:
//       return (
//         <div className="h-[500px] flex items-center justify-center rounded-xl bg-gray-100">
//           <p className="text-gray-500 text-lg">
//             Unsupported Video Provider
//           </p>
//         </div>
//       );
//   }
// }


import { forwardRef } from "react";
import { detectProvider } from "./utils/detectProvider";

import {
  YoutubePlayer,
  VimeoPlayer,
  Mp4Player,
  DrivePlayer,
  OtherPlayer,
} from "./adapters";

const VideoPlayer = forwardRef(function VideoPlayer(
  { url, onReady, onPlay, onPause, onStateChange },
  ref
) {
  const provider = detectProvider(url);

  switch (provider) {
    case "youtube":
      return (
        <YoutubePlayer
          ref={ref}
          url={url}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
          onStateChange={onStateChange}
        />
      );

    case "vimeo":
      return (
        <VimeoPlayer
          ref={ref}
          url={url}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
          onStateChange={onStateChange}
        />
      );

    case "mp4":
      return (
        <Mp4Player
          ref={ref}
          url={url}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onPause}
          onStateChange={onStateChange}
        />
      );

    case "drive":
      return <DrivePlayer ref={ref} url={url} onReady={onReady} />;

    case "other":
      return <OtherPlayer url={url} />;

    default:
      return (
        <div className="h-[500px] flex items-center justify-center rounded-xl bg-gray-100">
          <p className="text-gray-500 text-lg">
            Unsupported Video Provider
          </p>
        </div>
      );
  }
});

export default VideoPlayer;