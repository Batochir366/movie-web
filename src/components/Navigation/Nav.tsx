"use client";
import React, { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
import { InputSearch } from "./InputSearch";
import { Film, Moon } from "lucide-react";
import axios from "axios";
import { MovieSearchResult } from "../MovieSearch/MovieSearchResult";
import { useRouter } from "next/navigation";
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
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${inputValue}&language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((response) => setData(response.data));
  }, [inputValue]);
  console.log(inputValue);

  console.log(data, `dataaa`);
  const router = useRouter();
  const HandleDetails = (id: string) => {
    router.push(`/details/${id}`);
  };
  return (
    <nav className="w-full h-full px-[80px] py-[11.5px]">
      <div className="bg-white w-full justify-around flex">
        <div className="flex gap-2 items-center justify-center">
          <Film className="text-indigo-700 size-[20px]" />
          <h1 className="text-[16px] italic text-indigo-700 font-[700]">
            Movie Z
          </h1>
        </div>
        <div className="w-fit flex gap-3">
          <Dropdown />
          <div className="flex gap-[4.5px] flex-col">
            <InputSearch HandleOnChange={HandleInputValue} />
            <div>
              {data?.results.map((value: any, i: any) => (
                <div
                  onClick={() => HandleDetails(value.id)}
                  key={i}
                  className="bg-white w-fit h-fit absolute z-20 border-[#E4E4E7] rounded-lg border border-solid p-3"
                >
                  {data?.results.slice(0, 5).map((value: any, i: any) => (
                    <MovieSearchResult
                      key={i}
                      src={`https://image.tmdb.org/t/p/original${
                        value.poster_path || value.backdrop_path
                      }`}
                      voteAverage={value.vote_average}
                      release_date={
                        value.release_date.slice(0, 4) ||
                        "release date not found😿"
                      }
                      original_title={value.original_title}
                    />
                  ))}
                  <div className="flex px-4 py-2">
                    <p className="text-[14px] font-[500]">{`See all results for "${inputValue}"`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          onClick={() => HandleOnClick()}
          className="size-[36px] shadow-sm flex justify-center items-center border border-[#E4E4E7] border-solid rounded-[10px] "
        >
          <Moon className="size-4 " />
        </div>
      </div>
    </nav>
  );
};
