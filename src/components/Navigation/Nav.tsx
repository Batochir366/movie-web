"use client";
import React, { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
import { InputSearch } from "./InputSearch";
import { Film, Moon, Search, X } from "lucide-react";
import { MovieSearchResult } from "./MovieSearchResult";
import { useParams, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/utils";
type results = {
  results: [];
};
export const Nav = ({ HandleOnClick }: { HandleOnClick: () => void }) => {
  const [inputValue, setInputValue] = useState("");
  const HandleInputValue = (event: any) => {
    setInputValue(event.target.value);
  };
  const [data, setData] = useState<results>();
  useEffect(() => {
    axiosInstance
      .get(`search/movie?query=${inputValue}&language=en-US&page=1`)
      .then((response) => setData(response.data));
  }, [inputValue]);

  const router = useRouter();
  const HandleDetails = (id: string) => {
    router.push(`/details/${id}`);
    setInputValue("");
  };
  const HandleHome = () => {
    router.push("/");
    console.log("working");
  };
  const HandleResults = (inputValue: string) => {
    router.push(`/SeeAllResults?search=${inputValue}&page=1`);
    setInputValue("");
  };
  const [isActive, setIsActive] = useState(true);
  const HanleIsActive = () => {
    setIsActive(!isActive);
  };
  return (
    <nav className="w-full h-full flex md:px-[80px] justify-between px-5 py-[11.5px]">
      <div
        onClick={HandleHome}
        className={`cursor-pointer gap-2 items-center justify-center ${
          isActive ? "flex" : "hidden"
        }`}
      >
        <Film className="text-indigo-700 size-[20px]" />
        <h1 className="text-[16px] w-[80px] italic text-indigo-700 font-[700]">
          Movie Z
        </h1>
      </div>
      <Dropdown
        isActive={isActive}
        className={`${isActive ? "hidden" : null}`}
      />
      <div className="flex gap-3 md:justify-center md:w-full">
        <div
          className={`flex justify-center items-center bg-white border ${
            isActive ? "hidden" : null
          } border-solid rounded-md border-[#E4E4E7] w-fit h-[36px] px-3 gap-[10px] `}
        >
          <Search className="size-4 opacity-[0.5]" />
          <input
            placeholder="Search.."
            onChange={HandleInputValue}
            className={
              "file:text-foreground border-none h-[20px] flex shadow-none w-[227px] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-w-0 rounded-md border bg-transparent px-3 py-1 text-base  transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-smaria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            }
          />
        </div>
        <div className="flex md:justify-center gap-3 md:w-full">
          <div className="flex gap-1 flex-col">
            <InputSearch
              className="hidden md:flex"
              HandleOnChange={HandleInputValue}
            />
            <div
              onClick={() => HanleIsActive()}
              className="size-[36px] flex md:hidden shadow-sm justify-center items-center bg-white border border-[#E4E4E7] border-solid rounded-[10px] "
            >
              {isActive ? (
                <Search className="size-4" />
              ) : (
                <X className="size-4" />
              )}
            </div>
            <div>
              {data && inputValue !== "" && (
                <div className="bg-white w-fit h-fit absolute z-20 border-[#E4E4E7] rounded-lg border border-solid p-3">
                  {data?.results.slice(0, 5).map((value: any, i: any) => (
                    <MovieSearchResult
                      HandleonClick={() => HandleDetails(value.id)}
                      key={i}
                      src={`https://image.tmdb.org/t/p/original${
                        value.poster_path || value.backdrop_path
                      }`}
                      voteAverage={value.vote_average}
                      release_date={
                        value.release_date.slice(0, 4) ||
                        "release date not found"
                      }
                      original_title={value.original_title}
                    />
                  ))}
                  <button
                    onClick={() => HandleResults(inputValue)}
                    className="flex cursor-pointer px-4 py-2"
                  >
                    <p className="text-[14px] font-[500]">{`See all results for "${inputValue}"`}</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          onClick={() => HandleOnClick()}
          className="size-[36px] shadow-sm flex justify-center items-center bg-white border border-[#E4E4E7] border-solid rounded-[10px] "
        >
          <Moon className="size-4" />
        </div>
      </div>
    </nav>
  );
};
