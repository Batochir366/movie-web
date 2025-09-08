import React from "react";

type TrailerProps = {
  onClose: () => void;
  videoKey: string;
};

export const UpcomingTrailer = ({ videoKey, onClose }: TrailerProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-black/70 text-white text-xl sm:text-2xl px-4 py-2 rounded-full hover:bg-black/90 transition-all duration-200 border border-white/20"
        aria-label="Close trailer"
      >
        ✕
      </button>

      {/* Video Container - Full Screen */}
      <div className="w-full h-full">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1&fs=1`}
          title="YouTube Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
};
