import React from "react";
import { VoteAverage } from "../ALL_List/VoteAverage";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export const MovieDescription = () => {
  return (
    <div className="w-[454px] h-[51px] bg-white flex gap-3 items-start flex-col">
      <div className="flex flex-col">
        <h1 className="text-[20px] font-[600] text-black">{"whicked"}</h1>
        <VoteAverage voteAverage={""} />
      </div>
      <div className="w-[454px] h-[51px] bg-white flex justify-between">
        <p className="text-black font-[500] text-[14px]">{"3232"}</p>
        <Button className="flex gap-2 px-4 py-2 bg-white hover:bg-[#F4F4F5] shadow-none border-none font-[500] text-[#18181B] text-[14px]">
          See more <ArrowRight className="text-black hover:bg-none" />
        </Button>
      </div>
    </div>
  );
};
