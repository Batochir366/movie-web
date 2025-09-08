"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type VideoData = {
  results: { key: string }[];
};

type TrailerProps = {
  onClose: () => void;
};

const Trailer = ({ onClose }: TrailerProps) => {
  const [videoData, setVideoData] = useState<VideoData>();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setVideoData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!videoData?.results?.length) return null;

  const videoKey = videoData.results[0].key;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-black/70 text-white text-xl sm:text-2xl px-4 py-2 rounded-full hover:bg-black/90 transition-all duration-200 border border-white/20"
        aria-label="Close trailer"
      >
        ✕
      </button>

      {/* Video Container */}
      <div className="flex justify-center items-center w-full h-full">
        <iframe
          className="w-full h-full  rounded-md shadow-lg mx-auto"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
          title="YouTube Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Trailer;
