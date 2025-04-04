"use client";
import React, { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
import { InputSearch } from "./InputSearch";
import { Film, Moon } from "lucide-react";
import axios from "axios";
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
  return (
    <nav className="w-full h-full px-[80px] py-[11.5px]">
      <div className="w-full justify-around flex">
        <div
          onClick={HandleHome}
          className="flex cursor-pointer gap-2 items-center justify-center"
        >
          <Film className="text-indigo-700 size-[20px]" />
          <h1 className="text-[16px] italic text-indigo-700 font-[700]">
            Movie Z
          </h1>
        </div>
        <div className="w-fit flex gap-3">
          <Dropdown />
          <div className="flex gap-1 flex-col">
            <InputSearch HandleOnChange={HandleInputValue} />
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
