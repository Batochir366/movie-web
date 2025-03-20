"use client";
import React, { useEffect, useState } from "react";
import { ListHeader } from "./ListHeader";
import { Movies } from "./Movies";
import axios from "axios";

export const ListUpcoming = () => {
  const [data, setData] = useState([{}]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((res) => setData(res.data.results));
  }, []);
  return (
    <div className="flex flex-col gap-[32px]">
      <ListHeader ListName="Popular" />
      <div className="grid gap-[32px] grid-cols-5 grid-rows-2">
        {data?.slice(0, 10).map((value: any, i: any) => (
          <Movies
            name={value.original_title}
            key={i}
            voteAverage={value.vote_average}
            imgSrc={`https://image.tmdb.org/t/p/original${value.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};
