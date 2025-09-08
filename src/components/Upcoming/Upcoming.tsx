"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { DescriptionBox } from "./DescriptionBox";
import { PlayIcon } from "lucide-react";
import { axiosInstance } from "@/lib/utils";
import { UpcomingTrailer } from "./UpcomingTrailer";

type datatype = {
  results: results[];
  id: number;
};
type results = {
  key: string;
  id: number;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  original_title: string;
};

export const Upcoming = () => {
  const [upcomingData, setUpcomingData] = useState<datatype>();
  const [id, setId] = useState<string>("278");
  const [data, setData] = useState<datatype>();
  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`movie/now_playing?language=en-US&page=1`)
      .then((res) => setUpcomingData(res.data));

    if (id) {
      axiosInstance
        .get(`movie/${id}/videos?language=en-US`)
        .then((response) => setData(response.data));
    }
  }, [id]);

  return (
    <div className="relative w-full">
      {/* Carousel */}
      <Carousel
        plugins={[Autoplay({ delay: 3000 })]}
        className="w-full h-[300px] xs:h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[650px] relative overflow-hidden"
      >
        <CarouselContent className="w-full h-full">
          {upcomingData?.results
            .slice(0, 3)
            .map((value: any, index: number) => (
              <CarouselItem
                key={index}
                className="w-full relative h-[300px] xs:h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[600px] 2xl:h-[650px]"
              >
                {/* Overlay Content */}
                <div className="flex items-start flex-col gap-2 xs:gap-3 sm:gap-4 absolute z-20 bottom-4 xs:bottom-6 sm:bottom-12 md:bottom-16 lg:bottom-20 left-2 xs:left-4 sm:left-8 md:left-12 lg:left-16 xl:left-20 max-w-[95%] xs:max-w-[90%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[65%]">
                  <DescriptionBox
                    overview={value.overview}
                    vote_average={
                      value.vote_average &&
                      (Math.round(value.vote_average * 10) / 10).toFixed(1)
                    }
                    original_title={value.original_title}
                  />

                  {/* Trailer Button */}
                  <div className="flex w-full pl-4 sm:pl-6 md:pl-20">
                    <button
                      onClick={() => {
                        setId(value.id);
                        setTrailerOpen(true);
                      }}
                      className="flex justify-center gap-1.5 xs:gap-2 w-[100px] xs:w-[110px] sm:w-[130px] md:w-[140px] lg:w-[150px] items-center cursor-pointer bg-white/90 hover:bg-white active:bg-black active:text-white transition-all duration-200 rounded-md border border-white/20 px-2 xs:px-3 py-1.5 xs:py-2 text-[10px] xs:text-xs sm:text-sm font-medium shadow-lg backdrop-blur-sm"
                    >
                      <PlayIcon className="size-3 xs:size-3.5 sm:size-4" />
                      <p>Trailer</p>
                    </button>
                  </div>
                </div>

                {/* Background Image */}
                <div className="absolute w-full h-full">
                  <Image
                    className="w-full h-full object-cover brightness-75 sm:brightness-80"
                    height={650}
                    width={1920}
                    src={`https://image.tmdb.org/t/p/original${
                      value.backdrop_path || value.poster_path
                    }`}
                    alt={`${value.original_title} backdrop`}
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>

      {/* Mobile touch indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 xs:hidden z-30">
        {upcomingData?.results.slice(0, 3).map((_, index) => (
          <div key={index} className="w-2 h-2 rounded-full bg-white/50" />
        ))}
      </div>

      {/* Fullscreen Trailer */}
      {trailerOpen && data?.results?.[0] && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
          onClick={() => setTrailerOpen(false)}
        >
          <div
            className="w-full h-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <UpcomingTrailer
              videoKey={data.results[0].key}
              onClose={() => setTrailerOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
