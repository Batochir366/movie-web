"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { axiosInstance } from "@/lib/utils";

const Movies = ({
  datatype,
  ListName,
}: {
  datatype: string;
  ListName: string;
}) => {
  const [Data, setData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get(`movie/${datatype}?language=en-US&page=1`)
      .then((response) => setData(response.data.results))
      .catch((err) => console.error(err));
  }, [datatype]);

  const HandleOnClick = (id: string) => {
    router.push(`details/${id}`);
  };

  const HandleSeeMore = () => {
    router.push(`/SeeMore/${datatype}`);
  };

  return (
    <div className="flex flex-col w-full pt-12 gap-10">
      {/* Header */}
      <div className="flex justify-between items-center md:items-center px-4 sm:px-8 md:px-16 gap-4 md:gap-0">
        <h1 className="font-bold text-2xl sm:text-3xl text-gray-900">
          {ListName}
        </h1>
        <Button
          onClick={HandleSeeMore}
          className="flex gap-2 px-4 py-2 bg-white hover:bg-gray-100 shadow-lg border-none font-medium text-gray-900 text-sm"
        >
          See more <ArrowRight className="text-black" />
        </Button>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-8 md:px-16">
        {Data?.slice(0, 12).map((movie: any) => (
          <div
            key={movie.id}
            onClick={() => HandleOnClick(movie.id)}
            className="relative cursor-pointer flex flex-col bg-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            {/* Poster Image */}
            <div className="relative w-full h-[230px] sm:h-[280px] md:h-[320px]">
              <Image
                src={`https://image.tmdb.org/t/p/original${
                  movie.poster_path || movie.backdrop_path
                }`}
                alt={movie.title || "poster"}
                fill
                className="object-cover hover:brightness-75 transition-all duration-300"
                sizes="(max-width: 640px) 150px, (max-width: 768px) 180px, 230px"
              />
              {/* Vote Badge */}
              {movie.vote_average && (
                <div className="absolute top-2 left-2 bg-yellow-400 text-black font-semibold px-2 py-1 rounded-md text-xs sm:text-sm">
                  {Math.round(movie.vote_average * 10) / 10}
                </div>
              )}
            </div>

            {/* Movie Title */}
            <div className="flex flex-col p-2 gap-1 bg-white">
              <p className="text-sm sm:text-[14px] font-medium text-gray-900 truncate">
                {movie.title}
              </p>
              {movie.release_date && (
                <span className="text-xs text-gray-500">
                  {movie.release_date}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
