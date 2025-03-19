import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
export const DescriptionBox = () => {
  return (
    <div className="flex absolute pt-[178px] pl-[140px]">
      <div className="flex absolute items-start z-10 gap-4 flex-col">
        <header className="flex flex-col">
          <h3 className="text-[16px] text-white">Now Playing:</h3>
          <h1 className="text-[36px] text-white font-[700]">Wicked</h1>
          <div className="flex gap-2 items-center">
            <Star className="text-[#FDE047] fill-[#FDE047] size-[28px]" />
            <div className="flex justify-center items-center">
              <h3 className="text-[#FAFAFA] text-[18px] font-[600] ">6.9</h3>
              <h3 className="text-[#71717A] text-[16px] font-[400] ">/10</h3>
            </div>
          </div>
        </header>
        <p className="w-[302px] text-[14px] text-[#FAFAFA] h-fit">
          Elphaba, a misunderstood young woman because of her green skin, and
          Glinda, a popular girl, become friends at Shiz University in the Land
          of Oz. After an encounter with the Wonderful Wizard of Oz, their
          friendship reaches a crossroads.
        </p>
        <Button className="flex gap-2 px-4 py-2 bg-white hover:bg-[#F4F4F5] font-[500] text-[#18181B] text-[14px]">
          <Play className="text-black hover:bg-none" /> Watch Trailer
        </Button>
      </div>
    </div>
  );
};
