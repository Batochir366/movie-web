"use client";
import React, { useEffect, useState } from "react";
import { Film, Menu, X, Search } from "lucide-react";
import { MovieSearchResult } from "./MovieSearchResult";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
import { Dropdown } from "./Dropdown";

type Results = {
  results: any[];
};

export const Nav = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<Results>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const router = useRouter();

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    if (!inputValue.trim()) return;
    axiosInstance
      .get(`search/movie?query=${inputValue}&language=en-US&page=1`)
      .then((response) => setData(response.data));
  }, [inputValue]);

  const handleDetails = (id: string) => {
    router.push(`/details/${id}`);
    setInputValue("");
    setIsMenuOpen(false);
    setIsSearchFocused(false);
  };

  const handleHome = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  const handleResults = (value: string) => {
    router.push(`/SeeAllResults?search=${value}&page=1`);
    setInputValue("");
    setIsMenuOpen(false);
    setIsSearchFocused(false);
  };

  const clearSearch = () => {
    setInputValue("");
    setData(undefined);
    setIsSearchFocused(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-20 py-4">
        {/* Logo */}
        <div
          onClick={handleHome}
          className="cursor-pointer flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Film className="text-indigo-600 size-6" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Movie Z
          </h1>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-col relative flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
            <input
              placeholder="Search for movies..."
              value={inputValue}
              onChange={handleInputValue}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
            />
            {inputValue && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Suggestions */}
          {data && inputValue !== "" && (isSearchFocused || inputValue) && (
            <div className="absolute top-14 left-0 bg-white w-full rounded-xl border shadow-xl z-20 max-h-[400px] overflow-y-auto">
              <div className="space-y-1">
                {data?.results.slice(0, 15).map((value: any, i: number) => (
                  <div
                    key={i}
                    className="hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <MovieSearchResult
                      HandleonClick={() => handleDetails(value.id)}
                      src={`https://image.tmdb.org/t/p/original${
                        value.poster_path || value.backdrop_path
                      }`}
                      voteAverage={value.vote_average}
                      release_date={
                        value.release_date?.slice(0, 4) ||
                        "release date not found"
                      }
                      original_title={value.original_title}
                    />
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={() => handleResults(inputValue)}
                  className="w-full text-left text-sm font-medium text-indigo-600 hover:text-indigo-800 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  {`See all results for "${inputValue}"`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Dropdown only on desktop */}
          <div className="hidden md:block">
            <Dropdown />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-white gap-2 flex justify-between">
          <div className="space-y-4 flex flex-col justify-between">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
              <input
                placeholder="Search for movies..."
                value={inputValue}
                onChange={handleInputValue}
                className="w-full h-[34px] pl-10 pr-4 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
              />
              {inputValue && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {data && inputValue !== "" && (
              <div className="bg-white w-full rounded-xl border border-gray-200 shadow-lg p-2 max-h-[300px] overflow-y-auto">
                <div className="space-y-1">
                  {data?.results.slice(0, 10).map((value: any, i: number) => (
                    <div
                      key={i}
                      className="hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <MovieSearchResult
                        HandleonClick={() => handleDetails(value.id)}
                        src={`https://image.tmdb.org/t/p/original${
                          value.poster_path || value.backdrop_path
                        }`}
                        voteAverage={value.vote_average}
                        release_date={
                          value.release_date?.slice(0, 4) ||
                          "release date not found"
                        }
                        original_title={value.original_title}
                      />
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={() => handleResults(inputValue)}
                    className="w-full text-left text-sm font-medium text-indigo-600 hover:text-indigo-800 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    {`See all results for "${inputValue}"`}
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Mobile Dropdown */}
          <div>
            <Dropdown />
          </div>
        </div>
      )}
    </nav>
  );
};
