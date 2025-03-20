"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";
export const Movies = ({
  imgSrc,
  name,
  voteAverage,
}: {
  imgSrc: string;
  name: string;
  voteAverage: string;
}) => {
  return (
    <div className="h-[440px] w-[230px] rounded-[8px] bg-[#F4F4F5]">
      <Image
        className="w-[230px] h-[340px] rounded-t-[8px] "
        height={340}
        width={230}
        src={imgSrc}
        alt="poster"
      />
      <div className="flex flex-col p-2 gap-[3px]">
        <div className="flex gap-2 items-center">
          <Star className="text-[#FDE047] fill-[#FDE047] size-[16px]" />
          <div className="flex justify-center items-center">
            <h3 className="text-[#09090B] text-[14px] font-[600] ">
              {voteAverage}
            </h3>
            <h3 className="text-[#71717A] text-[12px] font-[400] ">/10</h3>
          </div>
        </div>
        <p className="text-[12px] text-[#09090b] w-[214px] h-fit">{name}</p>
      </div>
    </div>
  );
};
