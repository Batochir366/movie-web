import React from "react";
import { VoteAverage } from "../VoteAverage";

export const DescriptionBox = ({
  original_title,
  vote_average,
  overview,
}: {
  original_title: string;
  vote_average: string;
  overview: string;
}) => {
  return (
    <div className="flex w-full pt-20 sm:pt-24 md:pt-32 pl-4 sm:pl-6 md:pl-20">
      <div className="flex flex-col items-start gap-2 sm:gap-3 md:gap-4">
        <header className="flex flex-col">
          <h3 className="text-sm sm:text-base md:text-lg text-white">
            Now Playing:
          </h3>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white">
            {original_title}
          </h1>
          <VoteAverage className="text-white mt-1" voteAverage={vote_average} />
        </header>
        <p className="text-xs sm:text-sm md:text-base text-white max-w-full sm:max-w-md md:max-w-lg line-clamp-4">
          {overview}
        </p>
      </div>
    </div>
  );
};
