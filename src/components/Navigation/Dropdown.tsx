import React, { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../MovieSearch/Separator";
import axios from "axios";
type datatype = {
  genres: genres[];
};
type genres = {
  name: string;
};
export const Dropdown = () => {
  const [data, setData] = useState<datatype>();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((response) => setData(response.data));
  }, []);
  return (
    <Popover>  
      <PopoverTrigger className="border-[#E4E4E7] cursor-pointer w-fit h-[36px] shadow-sm px-4 py-2 justify-center items-center font-[500] text-[14px]  gap-2  flex  border-solid border rounded-md">
        <ChevronDown className="size-4" />
        Genre
      </PopoverTrigger>
      <PopoverContent className="flex p-5 border-[#E4E4E7] border border-solid rounded-lg bg-white w-fit h-fit">
        <div className="w-[577px]">
          <div className="flex flex-col gap-1">
            <p className="text-[24px] font-[600] text-black">Genres</p>
            <p className="text-[16px] text-black">
              See lists of movies by genre
            </p>
          </div>
          <div className="flex py-4">
            <Separator />
          </div>
          <div className="flex flex-wrap gap-4">
            {data?.genres.map((value: any, index: any) => (
              <button
                key={index}
                className="bg-white border cursor-pointer border-[#E4E4E7] text-[12px] font-[600] flex border-solid px-[10px] py-1 h-fit rounded-full w-fit"
              >
                {value.name}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
