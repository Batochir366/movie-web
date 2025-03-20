import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
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
    <div className="flex absolute pt-[178px] pl-[140px]">
      <div className="flex absolute items-start z-10 gap-4 flex-col">
        <header className="flex flex-col">
          <h3 className="text-[16px] text-white">Now Playing:</h3>
          <h1 className="text-[36px] text-white font-[700]">
            {original_title}
          </h1>
          <VoteAverage className="text-[#FAFAFA]" voteAverage={vote_average}/>
        </header>
        <p className="w-[1000px] text-[14px] text-[#FAFAFA] h-fit">
          {overview}
        </p>
        <Button className="flex gap-2 px-4 py-2 bg-white hover:bg-[#F4F4F5] font-[500] text-[#18181B] text-[14px]">
          <Play className="text-black hover:bg-none" /> Watch Trailer
        </Button>
      </div>
    </div>
  );
};
