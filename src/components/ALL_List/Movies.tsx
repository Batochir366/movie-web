"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { VoteAverage } from "./VoteAverage";
import axios from "axios";
import { useRouter } from "next/navigation";

const Movies = ({ datatype }: { datatype: string }) => {
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
  return (
    <>
      {Data?.slice(0, 10).map((value: any, i: any) => (
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
    </>
  );
};
export default Movies;
