"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { VoteAverage } from "@/components/VoteAverage";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { axiosInstance } from "@/lib/utils";
type datatype = {
  total_pages: number | undefined;
  results: results[];
};
type results = {
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
};
const Movies = () => {
  const [Data, setData] = useState<datatype>();
  const params = useSearchParams();
  const page = params.get("page");
  const [currentPage, setCurrentPage] = useState(parseInt(page || "1"));
  const { datatype } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`movie/${datatype}?language=en-US&page=${currentPage}`)
      .then((response) => setData(response.data));
  }, [currentPage]);
  console.log(Data, "data");
  const router = useRouter();
  const HandleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };
  return (
    <div className="flex gap-[32px] flex-col">
      <div className="flex">
        <h1 className="font-[600] flex px-[80px] text-[24px]">
          {datatype === "upcoming" && "Upcoming"}
          {datatype === "top_rated" && "Top Rated"}
          {datatype === "popular" && "Popular"}
        </h1>
      </div>
      <div className="flex flex-col w-full gap-[52px]">
        <div className="gap-[32px] w-full overflow-scroll flex px-[80px] flex-wrap">
          {Data?.results?.slice(0, 10).map((value: any, i: any) => (
            <div key={i}>
              <div
                onClick={() => HandleOnClick(value.id)}
                className="h-[440px] w-[230px] rounded-[8px] bg-[#F4F4F5]"
              >
                <Image
                  className="w-[230px] hover:brightness-75 h-[340px] rounded-t-[8px] "
                  height={340}
                  width={230}
                  src={`https://image.tmdb.org/t/p/original${
                    value.poster_path || value.backdrop_path
                  }`}
                  alt="poster"
                />
                <div className="flex flex-col p-2 gap-[3px]">
                  <VoteAverage
                    voteAverage={
                      value.vote_average &&
                      (Math.round(value.vote_average * 10) / 10).toFixed(1)
                    }
                  />
                  <p className="text-[12px] text-[#09090b] w-[214px] h-fit">
                    {value.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Pagination className="flex justify-end pr-[80px]">
        <PaginationContent>
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationPrevious href={`?page=${currentPage - 1}`} />
            </PaginationItem>
          )}
          {currentPage > 4 && (
            <PaginationItem>
              <PaginationLink href={`?page=1`}>1</PaginationLink>
            </PaginationItem>
          )}
          {currentPage > 4 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationLink href={`?page=${currentPage - 1}`}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              href={`?page=${currentPage}`}
              isActive={currentPage == currentPage}
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {currentPage < 499 && (
            <PaginationItem>
              <PaginationLink href={`?page=${currentPage + 1}`}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {currentPage <= 495 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage < 496 && (
            <PaginationItem>
              <PaginationLink href={`?page=500`}>{500}</PaginationLink>
            </PaginationItem>
          )}
          {currentPage !== 500 && (
            <PaginationItem>
              <PaginationNext href={`?page=${currentPage + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default Movies;
