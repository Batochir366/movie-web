"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { VoteAverage } from "./VoteAverage";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const Movies = ({
  datatype,
  ListName,
}: {
  datatype: string;
  ListName: string;
}) => {
  const [Data, setData] = useState([{}]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${datatype}?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((response) => setData(response.data.results));
  }, []);
  const router = useRouter();
  const HandleOnClick = (id: string) => {
    router.push(`details/${id}`);
  };
  const HandleSeeMore = (datatype: string) => {
    router.push(`/SeeMore/${datatype}`);
  };
  return (
    <div className="flex flex-col w-full pt-[52px] gap-[52px]">
      <div className="gap-[32px] w-full justify-between flex px-[80px] flex-wrap">
        <div className={`flex w-full justify-between `}>
          <h1 className="font-[600] text-[24px]">{ListName}</h1>
          <Button
            onClick={() => HandleSeeMore(datatype)}
            className="flex gap-2 px-4 py-2 bg-white hover:bg-[#F4F4F5] border-none font-[500] text-[#18181B] text-[14px]"
          >
            See more <ArrowRight className="text-black hover:bg-none" />
          </Button>
        </div>
        {Data?.slice(0, 10).map((value: any, i: any) => (
          <div key={i}>
            <div
              onClick={() => HandleOnClick(value.id)}
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
          </div>
        ))}
      </div>
    </div>
  );
};
export default Movies;
