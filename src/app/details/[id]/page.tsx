"use client";

import { ListHeader } from "@/components/ALL_List/ListHeader";
import MovieDetails from "@/components/ALL_List/MovieDetails";
import { Separator } from "@/components/MovieSearch/Separator";
import axios from "axios";
import { Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { log } from "node:console";
import React, { useEffect, useState } from "react";

type datatype = {
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  adult: boolean;
};
const page = ({
  voteAverage,
  className,
}: {
  voteAverage: string;
  className: string;
}) => {
  const [data, setData] = useState<datatype>();
  const id = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id.id}?language=en-US&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((response) => setData(response.data));
  }, []);
  return (
    <div className="w-fit h-fit bg-white">
      <div className="flex flex-col px-[178px] bg-white">
        <div className="flex flex-col pt-6 gap-6">
          <div className="flex w-full justify-between gap-1">
            <div className="flex flex-col gap-1 ">
              <h1 className="text-black font-[700] text-[36px]">
                {data?.original_title}
              </h1>
              <div className="flex">
                <p className="text-black text-[18px]">{`${
                  data?.release_date
                } · ${data?.adult === false ? "PG" : "R+18"} · ${"2h 40m"}`}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <p className="text-[12px] text-black font-[500]">Rating</p>
              <div>
                <div className="flex gap-2 items-center">
                  <Star className="text-[#FDE047] fill-[#FDE047] size-[28px]" />
                  <div className="flex flex-col justify-center items-start">
                    <div className="flex items-center justify-center">
                      <h3
                        className={
                          `text-[#09090B] text-[18px] font-[600] ` + className
                        }
                      >
                        {"6.9"}
                      </h3>
                      <h3 className="text-[#71717A] text-[16px] font-[400] ">
                        /10
                      </h3>
                    </div>
                    <p className="text-[#71717A] text-[12px]">{"31k"}</p>
                  </div>
                </div>
                <p>{}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <Image
              className="rounded-sm"
              src={`https://image.tmdb.org/t/p/original${
                data?.poster_path || data?.backdrop_path
              }`}
              alt={"poster"}
              width={290}
              height={428}
            />
            <iframe className="w-[760px] rounded-sm border-black border border-solid h-[428px]" />
          </div>
        </div>
        <div className="flex gap-5 pt-[32px] flex-col">
          <div className="flex h-[20px] flex-wrap gap-3 bg-amber-200">
            <div className="bg-red-700 h-[20px] rounded-full w-fit">35</div>
            <div className="bg-red-700 h-[20px] rounded-full w-fit">2</div>
            <div className="bg-red-700 h-[20px] rounded-full w-fit">3</div>
          </div>
          <p className="text-[16px] text-black">{data?.overview}</p>
          <MovieDetails />
        </div>
        <div className="flex pb-[113px] pt-[32px]">
          <div className="flex flex-col gap-8">
            <ListHeader ListName="More Like this" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
