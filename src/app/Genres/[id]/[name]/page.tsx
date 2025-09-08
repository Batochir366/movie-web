"use client";
import Image from "next/image";
import React, { useEffect, useState, useMemo } from "react";
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
import GenresButton from "@/components/GenresButton";
import { Filter, X } from "lucide-react";

type DataType = {
  total_pages: number;
  total_results: number;
  results: Result[];
};

type Result = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
};

type Genre = {
  id: number;
  name: string;
};

const Movies = () => {
  const { name, id } = useParams();
  const params = useSearchParams();
  const page = parseInt(params.get("page") || "1", 10);
  const selectedGenres = params.getAll("genres");

  const [data, setData] = useState<DataType>();
  const [genreList, setGenreList] = useState<{ genres: Genre[] }>();
  const router = useRouter();

  // Get selected genre names for display
  const handleSelect = (id: number) => {
    const newParams = new URLSearchParams(params.toString());
    let currentGenres = newParams.getAll("genres");

    if (currentGenres.includes(id.toString())) {
      currentGenres = currentGenres.filter((g) => g !== id.toString());
    } else {
      currentGenres.push(id.toString());
    }

    newParams.delete("genres");
    currentGenres.forEach((g) => newParams.append("genres", g));

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("genres");
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const removeGenre = (genreId: string) => {
    const newParams = new URLSearchParams(params.toString());
    const currentGenres = newParams
      .getAll("genres")
      .filter((g) => g !== genreId);

    newParams.delete("genres");
    currentGenres.forEach((g) => newParams.append("genres", g));

    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const genreString = selectedGenres.join(",");
    axiosInstance
      .get(
        `discover/movie?language=en&with_genres=${id},${genreString}&page=${page}`
      )
      .then((res) => setData(res.data));
  }, [params]);

  useEffect(() => {
    axiosInstance
      .get(`genre/movie/list?language=en`)
      .then((res) => setGenreList(res.data));
  }, []);

  const handleMovieClick = (id: number) => {
    router.push(`/details/${id}`);
  };

  return (
    <div className="flex flex-col lg:flex-row pt-16 px-4 sm:px-6 md:px-10 lg:px-16 gap-8 pb-6">
      {/* Enhanced Sidebar */}
      <aside className="w-full lg:w-[280px] flex-shrink-0">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sticky top-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Filter className="size-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Genres</h2>
              <p className="text-sm text-gray-500">Filter by movie genres</p>
            </div>
          </div>

          {/* Selected Genres Summary */}
          {selectedGenres.length > 0 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-indigo-700">
                  {selectedGenres.length} Selected
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium underline transition-colors"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedGenres.map((genreId, idx) => {
                  const genreName = genreList?.genres.find(
                    (g) => g.id.toString() === genreId
                  )?.name;
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-white text-indigo-700 text-xs font-medium rounded-full border border-indigo-200 shadow-sm"
                    >
                      {genreName}
                      <button
                        onClick={() => removeGenre(genreId)}
                        className="ml-1 hover:text-indigo-900 transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <div className="space-y-2 max-h-80 overflow-y-auto flex-wrap flex gap-1">
            {genreList?.genres.map((genre) => (
              <GenresButton
                key={genre.id}
                onClick={() => handleSelect(genre.id)}
                active={selectedGenres.includes(genre.id.toString())}
              >
                {genre.name}
              </GenresButton>
            ))}
          </div>
        </div>
      </aside>

      {/* Enhanced Main Content */}
      <main className="flex-1 flex flex-col gap-8">
        {/* Header Section */}

        <h1 className="text-3xl font-bold mb-2">
          {name ? `${name} Movies` : "Discover Movies"}
        </h1>
        <p className="text-gray-500 text-lg">
          {data?.total_results?.toLocaleString() || 0}
          movies found
        </p>
        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {data?.results?.slice(0, 20).map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieClick(movie.id)}
              className="group rounded-xl bg-white shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] overflow-hidden border border-gray-100"
            >
              <div className="aspect-[2/3] relative overflow-hidden bg-gray-100">
                {movie.poster_path || movie.backdrop_path ? (
                  <>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${
                        movie.poster_path || movie.backdrop_path
                      }`}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <svg
                          className="w-4 h-4 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                    <svg
                      className="w-16 h-16 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-4 space-y-3">
                <VoteAverage
                  voteAverage={
                    movie.vote_average
                      ? (Math.round(movie.vote_average * 10) / 10).toFixed(1)
                      : undefined
                  }
                />
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
                  {movie.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Pagination */}

        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`?page=${page - 1}`} />
              </PaginationItem>
            )}

            {page > 3 && (
              <>
                <PaginationItem>
                  <PaginationLink href="?page=1">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {page > 1 && (
              <PaginationItem>
                <PaginationLink href={`?page=${page - 1}`}>
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href={`?page=${page}`} isActive>
                {page}
              </PaginationLink>
            </PaginationItem>

            {page < 500 && (
              <PaginationItem>
                <PaginationLink href={`?page=${page + 1}`}>
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {page < 500 - 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href={`?page=${500}`}>{500}</PaginationLink>
                </PaginationItem>
              </>
            )}

            {page < 500 && (
              <PaginationItem>
                <PaginationNext href={`?page=${page + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  );
};

export default Movies;
