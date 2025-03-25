"use client";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { strict } from "assert";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
type datatype = {
  overview: string;
  job: string;
  cast: cast[];
  crew: crew[];
};
type cast = {
  name: string;
};
type crew = {
  known_for_department: string;
  name: string;
  job: string;
  department: string;
};
const MovieDetails = () => {
  const [data, setData] = useState<datatype>();
  const id = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id.id}/credits?language=en-US&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((response) => setData(response.data));
  }, []);
  return (
    <Suspense>
      <div className="flex flex-col gap-5">
        <div className="flex gap-[53px] ">
          <h1 className="text-[17px] w-[67px] font-[700]">Director</h1>
          {data?.crew.map((value, index) => {
            return (
              value.known_for_department &&
              value.department === "Writing" && (
                <h1 className="text-[16px]" key={index}>
                  {value.name}
                </h1>
              )
            );
          })}
        </div>
        <Separator />
        <div className="flex gap-[53px]">
          <h1 className="text-[17px]  w-[67px] font-[700]">Writers</h1>
          {data?.crew.map((value, index) => {
            return (
              value.job === "Director" && (
                <h1 className="text-[16px]" key={index}>
                  {value.name}
                </h1>
              )
            );
          })}
        </div>
        <Separator />
        <div className="flex gap-[53px]">
          <h1 className="text-[17px]  w-[67px] font-[700]">Stars</h1>
          {data?.cast.slice(0, 3).map((value, index) => (
            <h1 key={index} className="text-[16px]">
              {value.name}
            </h1>
          ))}
        </div>
        <Separator />
      </div>
    </Suspense>
  );
};
export default MovieDetails;
