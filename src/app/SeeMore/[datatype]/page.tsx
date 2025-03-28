"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { VoteAverage } from "@/components/ALL_List/VoteAverage";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
const Movies = () => {
  const [Data, setData] = useState([{}]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${datatype}?language=en-US&page=2&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((response) => setData(response.data.results));
  }, []);
  const { datatype } = useParams();
  const router = useRouter();
  const HandleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full pt-[52px] gap-[52px]">
        <div className="gap-[32px] w-full justify-between overflow-scroll flex px-[80px] flex-wrap">
          {Data?.map((value: any, i: any) => (
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default Movies;
