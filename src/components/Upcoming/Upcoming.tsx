"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { DescriptionBox } from "./DescriptionBox";
import axios from "axios";
import { PlayIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { log } from "console";
type datatype = {
  results: results[];
  id: Number;
};
type results = {
  key: string;
  id: Number;
};
export const Upcoming = () => {
  const [upcomingData, setUpcomingData] = useState<datatype>();
  const [data, setData] = useState<datatype>();
  const [id, setId] = useState<string>();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setUpcomingData(res.data));
  }, []);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((response) => setData(response.data));
  }, [id]);
  return (
    <Carousel className="w-full h-[600px]">
      <CarouselContent className="w-full h-[600px]">
        {upcomingData?.results.slice(0, 4).map((value: any, index: number) => (
          <CarouselItem key={index} className="w-full relative h-[600px]">
            <div className="flex flex-col gap-4 absolute z-20">
              <DescriptionBox
                overview={value.overview}
                vote_average={value.vote_average}
                original_title={value.original_title}
              />
              <div className="flex pl-[140px]">
                <Dialog>
                  <DialogTrigger
                    onClick={() => setId(value?.id)}
                    className="flex justify-center gap-[4px] w-[150px] items-center cursor-pointer size-fit bg-white hover:bg-gray-200 active:bg-black rounded-md border px-4 py-2"
                  >
                    <PlayIcon className="size-4" />
                    <p>Watch Trailer</p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription className="w-[760px] h-[428px]">
                        <iframe
                          key={index}
                          className="flex relative w-[760px] h-[450px] bg-no-repeat rounded-sm"
                          width={997}
                          height={561}
                          src={`https://www.youtube.com/embed/${data?.results[2].key}?si=bB_vz5nDlE-bwi2u`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Image
              className="w-screen brightness-80 absolute h-[600px]"
              height={600}
              width={1440}
              src={`https://image.tmdb.org/t/p/original${value.backdrop_path}`}
              alt="poster"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="flex left-[44px]" />
      <CarouselNext className="flex right-[44px]" />
    </Carousel>
  );
};
