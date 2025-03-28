"use client";

import { ListHeader } from "@/components/ALL_List/ListHeader";
import MovieDetails from "@/components/ALL_List/MovieDetails";
import Trailer from "@/components/ALL_List/Trailer";
import { VoteAverage } from "@/components/ALL_List/VoteAverage";
import axios from "axios";
import { Star } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Router from "next/navigation";
import React, { useEffect, useState } from "react";

type datatype = {
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  adult: boolean;
  vote_average: number;
  vote_count: number;
  genres: genres[];
  runtime: number;
  results: [];
};
type genres = {
  id: string;
  name: string;
};
const page = ({
  voteAverage,
  className,
}: {
  voteAverage: string;
  className: string;
}) => {
  const [data, setData] = useState<datatype>();
  const [similarMovieData, setSimilarMovieData] = useState<datatype>();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((response) => setData(response.data));
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((response) => setSimilarMovieData(response.data));
  }, [id]);

  const router = useRouter();
  const HandleOnClick = (id: string) => {
    router.push(`/${id}`);
  };
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
                } · ${data?.adult === true ? "NC-17" : "G"} · ${Math.floor(
                  (data?.runtime as number) / 60
                )}h · ${(data?.runtime as number) % 60}m`}</p>
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
                        {data?.vote_average &&
                          (Math.round(data?.vote_average * 10) / 10).toFixed(1)}
                      </h3>
                      <h3 className="text-[#71717A] text-[16px] font-[400] ">
                        /10
                      </h3>
                    </div>
                    <p className="text-[#71717A] text-[12px]">
                      {data?.vote_count &&
                        (data?.vote_count - (data?.vote_count % 1000)) / 1000}
                      k
                    </p>
                  </div>
                </div>
                <p>{}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-8">
            <Image
              className="rounded-sm"
              src={`https://image.tmdb.org/t/p/original${
                data?.poster_path || data?.backdrop_path
              }`}
              alt={"poster"}
              width={290}
              height={428}
            />
            <Trailer />
          </div>
        </div>
        <div className="flex gap-5 pt-[32px] flex-col">
          <div className="flex h-[20px] flex-wrap gap-3">
            {data?.genres.map((value: any, index: any) => (
              <button
                key={index}
                className="bg-white cursor-pointer border border-[#E4E4E7] text-[12px] font-[600] flex border-solid px-[10px] py-1 h-fit rounded-full w-fit"
              >
                {value.name}
              </button>
            ))}
          </div>
          <p className="text-[16px] w-full text-black">{data?.overview}</p>
          <MovieDetails />
        </div>
        <div className="gap-[32px] w-full flex flex-wrap">
          <ListHeader ListName="More like this" />
          {similarMovieData?.results.slice(0, 5).map((value: any, i: any) => (
            <div
              onClick={() => HandleOnClick(value.id)}
              key={i}
              className="h-[440px] w-[230px] rounded-[8px] bg-[#F4F4F5]"
            >
              <Image
                className="w-[230px] h-[340px] rounded-t-[8px] "
                height={340}
                width={230}
                src={`https://image.tmdb.org/t/p/original${
                  value.poster_path || value.backdrop_path
                }`}
                alt="poster"
              />
              <div className="flex flex-col p-2 gap-[3px]">
                <VoteAverage voteAverage={value.vote_average} />
                <p className="text-[12px] text-[#09090b] w-[214px] h-fit">
                  {value.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default page;
