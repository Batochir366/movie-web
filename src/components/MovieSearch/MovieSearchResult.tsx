import React, { useEffect, useState } from "react";
import { VoteAverage } from "../ALL_List/VoteAverage";
import Image from "next/image";
import { Separator } from "./Separator";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const MovieSearchResult = ({
  src,
  voteAverage,
  release_date,
  original_title,
}: {
  src?: any;
  voteAverage?: string;
  release_date?: string;
  original_title?: any;
}) => {
  const router = useRouter();
  const HandleOnClick = (id: string) => {
    router.push(`details/${id}`);
  };
  return (
    <div className="">
      <div className="bg-white flex rounded-md z-20 flex-col h-fit w-fit p-2">
        <div className="flex gap-4">
          <Image
            className="rounded-md border-black border"
            src={src}
            alt="poster"
            width={64}
            height={100}
          />
          <div className="w-[454px] h-[51px] bg-white flex gap-3 items-start flex-col">
            <div className="flex flex-col">
              <h1 className="text-[20px] font-[600] text-black">
                {original_title}
              </h1>
              <VoteAverage voteAverage={voteAverage} />
            </div>
            <div className="w-[454px] h-[51px] bg-white flex justify-between">
              <p className="text-black font-[500] text-[14px]">
                {release_date}
              </p>
              <Button className="flex gap-2 px-4 py-2 bg-white hover:bg-[#F4F4F5] shadow-none border-none font-[500] text-[#18181B] text-[14px]">
                See more <ArrowRight className="text-black hover:bg-none" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};
