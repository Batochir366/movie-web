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
import { Calendar, Star, Sparkles, TrendingUp, Clock } from "lucide-react";

type datatype = {
  total_pages: number | undefined;
  results: results[];
};
type results = {
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  title: string;
  id: string;
  release_date?: string;
};

const Movies = () => {
  const [Data, setData] = useState<datatype>();
  const [loading, setLoading] = useState(true);
  const [imageLoadStates, setImageLoadStates] = useState<{
    [key: string]: boolean;
  }>({});
  const params = useSearchParams();
  const page = params.get("page");
  const [currentPage, setCurrentPage] = useState(parseInt(page || "1"));
  const { datatype } = useParams();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`movie/${datatype}?language=en-US&page=${currentPage}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentPage, datatype]);

  const HandleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  const handleImageLoad = (id: string) => {
    setImageLoadStates((prev) => ({ ...prev, [id]: true }));
  };

  const getCategoryTitle = () => {
    switch (datatype) {
      case "upcoming":
        return "Upcoming Movies";
      case "top_rated":
        return "Top Rated Movies";
      case "popular":
        return "Popular Movies";
      default:
        return "Movies";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading Header */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
          </div>

          {/* Loading Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-[2/3] bg-gray-200"></div>
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex gap-2 items-center">
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl text-gray-900">
              {getCategoryTitle()}
            </h1>
          </div>
        </div>

        {/* Enhanced Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 mb-12">
          {Data?.results?.map((movie: any, i: number) => (
            <div
              key={movie.id}
              onClick={() => HandleOnClick(movie.id)}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-gray-200 overflow-hidden"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Movie Poster */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-t-2xl bg-gray-100">
                <Image
                  className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
                    imageLoadStates[movie.id] ? "opacity-100" : "opacity-0"
                  }`}
                  height={400}
                  width={300}
                  src={`https://image.tmdb.org/t/p/w500${
                    movie.poster_path || movie.backdrop_path
                  }`}
                  alt={movie.title}
                  onLoadingComplete={() => handleImageLoad(movie.id)}
                />

                {/* Loading placeholder */}
                {!imageLoadStates[movie.id] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Rating Badge */}
                <div className="absolute top-2 left-2 bg-yellow-400 text-black font-semibold px-2 py-1 rounded-md text-xs sm:text-sm">
                  {Math.round(movie.vote_average * 10) / 10}
                </div>

                {/* Release Year */}
                {movie.release_date && (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800">
                      {movie.release_date.split("-")[0]}
                    </div>
                  </div>
                )}
              </div>

              {/* Movie Info */}
              <div className="p-4 space-y-2">
                {/* Rating - Always Visible on Mobile */}
                <div className="sm:hidden">
                  <VoteAverage voteAverage={movie.vote_average} />
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-gray-700 transition-colors">
                  {movie.title}
                </h3>

                {/* Release Year - Mobile */}
                {movie.release_date && (
                  <p className="text-xs text-gray-500 sm:hidden">
                    {movie.release_date.split("-")[0]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Pagination */}
        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
            <div className="text-sm text-gray-600">
              Showing page{" "}
              <span className="font-semibold text-gray-900">{currentPage}</span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {Data?.total_pages || 500}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Jump to specific page or use navigation below
            </div>
          </div>

          <Pagination className="flex justify-center">
            <PaginationContent className="flex-wrap">
              {currentPage !== 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={`?page=${currentPage - 1}`}
                    className="hover:bg-white hover:border-gray-300 transition-colors"
                  />
                </PaginationItem>
              )}

              {currentPage > 4 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      href={`?page=1`}
                      className="hover:bg-white hover:border-gray-300 transition-colors"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </>
              )}

              {currentPage !== 1 && (
                <PaginationItem>
                  <PaginationLink
                    href={`?page=${currentPage - 1}`}
                    className="hover:bg-white hover:border-gray-300 transition-colors"
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationLink
                  href={`?page=${currentPage}`}
                  isActive
                  className="bg-gray-900 text-white border-gray-900"
                >
                  {currentPage}
                </PaginationLink>
              </PaginationItem>

              {currentPage < 499 && (
                <PaginationItem>
                  <PaginationLink
                    href={`?page=${currentPage + 1}`}
                    className="hover:bg-white hover:border-gray-300 transition-colors"
                  >
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
                  <PaginationLink
                    href={`?page=500`}
                    className="hover:bg-white hover:border-gray-300 transition-colors"
                  >
                    500
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage !== 500 && (
                <PaginationItem>
                  <PaginationNext
                    href={`?page=${currentPage + 1}`}
                    className="hover:bg-white hover:border-gray-300 transition-colors"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Movies;
