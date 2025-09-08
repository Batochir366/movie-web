"use client";

import MovieDetails from "@/components/MovieDetails";
import Trailer from "@/components/Trailer";
import { axiosInstance } from "@/lib/utils";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ParamValue } from "next/dist/server/request/params";

type datatype = {
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  adult: boolean;
  vote_average: number;
  vote_count: number;
  genres: { id: string; name: string }[];
  runtime: number;
  results: [];
};

const Page = () => {
  const [data, setData] = useState<datatype>();
  const [similarMovieData, setSimilarMovieData] = useState<datatype>();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { id } = useParams();

  const router = useRouter();

  useEffect(() => {
    axiosInstance
      .get(`movie/${id}?language=en-US`)
      .then((res) => setData(res.data));
    axiosInstance
      .get(`movie/${id}/similar?language=en-US&page=1`)
      .then((res) => setSimilarMovieData(res.data));
  }, [id]);

  const handleMovieClick = (id: string | ParamValue) =>
    router.push(`/details/${id}`);
  const handleSeeMore = (id: string | ParamValue) =>
    router.push(`/MoreLikeThis/${id}`);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "bg-green-500 text-white";
    if (rating >= 6) return "bg-yellow-400 text-black";
    return "bg-red-500 text-white";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full">
        <div className="aspect-[16/9] relative">
          <Image
            src={`https://image.tmdb.org/t/p/original${
              data?.backdrop_path || data?.poster_path
            }`}
            alt="Backdrop"
            fill
            className="object-cover brightness-90"
          />
          {/* Softer gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => setTrailerOpen(true)}
              className="flex items-center gap-3 px-7 py-4 bg-white/90 hover:bg-white rounded-full text-black font-semibold text-lg shadow-xl transition-all duration-300 hover:scale-110"
            >
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-white ml-0.5" />
              </div>
              <span>Watch Trailer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Poster + Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row gap-6 lg:gap-10 mt-8">
        {/* Poster */}
        <div className="flex-shrink-0 w-full lg:w-[280px]">
          <Image
            src={`https://image.tmdb.org/t/p/original${
              data?.poster_path || data?.backdrop_path
            }`}
            alt="Poster"
            width={280}
            height={420}
            className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 w-full"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Title + Rating */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {data?.original_title}
            </h1>
            <div
              className={`px-4 py-2 rounded-full font-bold text-sm w-fit text-nowrap ${getRatingColor(
                data?.vote_average || 0
              )}`}
            >
              ⭐ {data?.vote_average?.toFixed(1)} / 10
            </div>
          </div>

          {/* Meta */}
          <p className="text-gray-600 text-sm sm:text-base">
            {data?.release_date?.split("-")[0]} · {data?.adult ? "NC-17" : "PG"}{" "}
            · {data?.runtime && formatRuntime(data.runtime)}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {data?.genres.map((g, i) => (
              <span
                key={g.id}
                className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all border border-solid`}
              >
                {g.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            {data?.overview}
          </p>

          {/* Extra details */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner border">
            <MovieDetails />
          </div>
        </div>
      </div>

      {/* Similar Movies */}
      <div className="mt-14 max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-2xl font-bold text-gray-900">More Like This</h2>
          <Button
            onClick={() => handleSeeMore(id)}
            className="flex gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 font-medium text-gray-900 text-sm rounded-full shadow-sm"
          >
            See more
          </Button>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-6 snap-x scrollbar-hide">
          {similarMovieData?.results.map((movie: any) => (
            <div
              key={movie.id}
              className="min-w-[160px] sm:min-w-[180px] md:min-w-[200px] cursor-pointer rounded-xl bg-white shadow hover:shadow-lg transition-transform duration-300 hover:scale-105 snap-start relative"
              onClick={() => handleMovieClick(movie.id)}
            >
              <div className="aspect-[2/3] relative rounded-xl overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/original${
                    movie.poster_path || movie.backdrop_path
                  }`}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
                {/* Vote badge */}
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-900 font-semibold line-clamp-2">
                  {movie.title}
                </p>
                <p className="text-xs text-gray-500">
                  {movie.release_date?.split("-")[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Trailer */}
      {trailerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 sm:p-6"
          onClick={() => setTrailerOpen(false)}
        >
          <button
            onClick={() => setTrailerOpen(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-black/60 rounded-full text-white flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="w-full max-w-5xl aspect-video bg-black rounded-lg sm:rounded-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Trailer onClose={() => setTrailerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
