"use client";
import Image from "next/image";
import React, { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { VoteAverage } from "@/components/VoteAverage";
import { axiosInstance } from "@/lib/utils";
import GenresButton from "@/components/GenresButton";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";

// Types
type Datatype = {
  total_pages: number;
  total_results: number;
  results: Result[];
};

type Result = {
  id: number;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  genre_ids: number[];
  title: string;
};

type Genre = {
  id: number;
  name: string;
};

// ----------------- MoviesInner -----------------
const MoviesInner = () => {
  const params = useSearchParams(); // ✅ Now safe (inside Suspense)
  const search = params.get("search");
  const page = Math.max(1, parseInt(params.get("page") || "1"));
  const [data, setData] = useState<Datatype>();
  const [genreList, setGenreList] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch genres
  useEffect(() => {
    axiosInstance
      .get(`genre/movie/list?language=en`)
      .then((res) => setGenreList(res.data.genres || []))
      .catch(() => setGenreList([]));
  }, []);

  // Fetch movies
  useEffect(() => {
    if (!search) return;

    setLoading(true);
    setError(null);

    const url = `search/movie?query=${encodeURIComponent(
      search
    )}&language=en-US&page=${page}`;

    axiosInstance
      .get(url)
      .then((res) => {
        setData(res.data);

        // If page is too high, redirect
        if (
          res.data.total_pages &&
          page > res.data.total_pages &&
          res.data.total_pages > 0
        ) {
          router.push(
            `?search=${encodeURIComponent(search)}&page=${res.data.total_pages}`
          );
        }
      })
      .catch(() => {
        setError("Failed to fetch movies. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [page, search, router]);

  const handleMovieClick = (id: number) => {
    router.push(`/details/${id}`);
  };

  // Toggle genres
  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const clearFilters = () => setSelectedGenres([]);

  const selectedGenreNames = useMemo(
    () =>
      selectedGenres
        .map((id) => genreList.find((g) => g.id === id)?.name)
        .filter(Boolean),
    [selectedGenres, genreList]
  );

  const filteredResults = useMemo(() => {
    if (!data?.results) return [];
    if (selectedGenres.length === 0) return data.results;
    return data.results.filter((movie) =>
      selectedGenres.some((g) => movie.genre_ids.includes(g))
    );
  }, [data?.results, selectedGenres]);

  return (
    <div className="flex flex-col lg:flex-row pt-16 px-4 sm:px-6 md:px-10 lg:px-16 gap-8 pb-6">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-[280px] flex-shrink-0">
        {/* ... your filter UI remains the same ... */}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filteredResults.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No movies found
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedGenres.length > 0
                ? "Try adjusting your filters."
                : "Try a different search."}
            </p>
            {selectedGenres.length > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {!loading && !error && filteredResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredResults.slice(0, 20).map((movie) => (
              <div
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
                className="group rounded-xl bg-white shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] overflow-hidden border border-gray-100"
              >
                {/* Poster */}
                <div className="aspect-[2/3] relative overflow-hidden bg-gray-100">
                  {movie.poster_path || movie.backdrop_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${
                        movie.poster_path || movie.backdrop_path
                      }`}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 space-y-3">
                  <VoteAverage
                    voteAverage={
                      movie.vote_average
                        ? (Math.round(movie.vote_average * 10) / 10).toFixed(1)
                        : undefined
                    }
                  />
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {movie.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

// ----------------- Movies Wrapper -----------------
const Movies = () => {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <MoviesInner />
    </Suspense>
  );
};

export default Movies;
