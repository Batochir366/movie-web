"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { DescriptionBox } from "./DescriptionBox";
import axios from "axios";
export const Upcoming = () => {
  const [upcomingData, setUpcomingData] = useState([{}]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setUpcomingData(res.data.results));
  }, []);
  return (
    <Carousel className="w-full h-[600px]">
      <CarouselContent className="w-full h-[600px]">
        {upcomingData.slice(0, 3).map((value: any, index: number) => (
          <CarouselItem key={index} className="w-full relative h-[600px]">
            <DescriptionBox
              overview={value.overview}
              vote_average={value.vote_average}
              original_title={value.original_title}
            />
            <Image
              className="w-screen absolute h-[600px]"
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
