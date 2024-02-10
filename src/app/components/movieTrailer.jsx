"use client";

import ReactPlayer from "react-player/lazy";

const MovieTrailer = ({ videos }) => {
  return (
    <>
      {videos.map((video) => {
        if (video.type === "Trailer") {
          return (
            <ReactPlayer
              key={video.key}
              url={`https://www.youtube.com/watch?v=${video.key}`}
              width="640"
              height="360"
              controls
            />
          );
        }
      })}
    </>
  );
};

export default MovieTrailer;
