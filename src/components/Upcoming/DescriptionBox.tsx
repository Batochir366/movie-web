import React, { useEffect, useState } from "react";
import { VoteAverage } from "../ALL_List/VoteAverage";
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
    <div className="flex w-full pt-[178px] pl-[140px]">
      <div className="flex items-start gap-4 flex-col">
        <header className="flex flex-col">
          <h3 className="text-[16px] text-white">Now Playing:</h3>
          <h1 className="text-[36px] text-white font-[700]">
            {original_title}
          </h1>
          <VoteAverage className="text-[#FAFAFA]" voteAverage={vote_average} />
        </header>
        <p className="w-[500px] text-[14px] border-black text-[#FAFAFA] h-fit">
          {overview}
        </p>
      </div>
    </div>
  );
};
