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
  total_results: number;
};
type results = {
  id: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  title: string;
};

const Movies = () => {
  const { id } = useParams();
  const [Data, setData] = useState<datatype>();
  const params = useSearchParams();
  const page = params.get("page");
  const [currentPage, setCurrentPage] = useState(parseInt(page || "1"));
  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get(`movie/${id}/similar?language=en-US&page=${currentPage}`)
      .then((response) => setData(response.data));
  }, [currentPage, id]);

  const HandleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  return (
    <div className="flex flex-col w-full py-6 px-4 pb-4 sm:px-8 md:px-16 gap-8">
      <h1 className="font-semibold text-2xl pb-4">More Like This</h1>

      {Data?.total_results === 0 ? (
        <div className="flex justify-center px-4 sm:px-8 md:px-16">
          <div className="w-full border border-gray-300 rounded-lg py-20 text-center font-semibold text-gray-700">
            No results found.
          </div>
        </div>
      ) : (
        <div className="max-w-7xl">
          {/* Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
            {Data?.results.slice(0, 12).map((movie, i) => (
              <div
                key={i}
                onClick={() => HandleOnClick(movie.id)}
                className="cursor-pointer flex flex-col bg-gray-100 rounded-lg shadow hover:shadow-lg transition-transform duration-200 hover:scale-105"
              >
                <div className="relative aspect-[2/3] rounded-t-lg overflow-hidden">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${
                      movie.poster_path || movie.backdrop_path
                    }`}
                    alt={movie.title}
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-2 flex flex-col gap-1">
                  <VoteAverage voteAverage={movie.vote_average.toString()} />
                  <p className="text-xs sm:text-sm text-gray-900 font-medium line-clamp-2">
                    {movie.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`?page=${currentPage - 1}`} />
            </PaginationItem>
          )}

          {currentPage > 3 && (
            <>
              <PaginationItem>
                <PaginationLink href="?page=1">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink href={`?page=${currentPage - 1}`}>
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink href={`?page=${currentPage}`} isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          {currentPage < 500 && (
            <PaginationItem>
              <PaginationLink href={`?page=${currentPage + 1}`}>
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          {currentPage < 500 - 2 && (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`?page=${500}`}>{500}</PaginationLink>
              </PaginationItem>
            </>
          )}

          {currentPage < 500 && (
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
