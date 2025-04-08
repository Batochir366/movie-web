import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../Separator";
import { axiosInstance } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
type datatype = {
  genres: genres[];
};
type genres = {
  name: string;
};
export const Dropdown = ({className}:{className:string}) => {
  const [data, setData] = useState<datatype>();
  useEffect(() => {
    axiosInstance
      .get(`genre/movie/list?language=en`)
      .then((response) => setData(response.data));
  }, []);
  const router = useRouter();
  const HandleGenre = (id: string, name: string) => {
    router.push(`/Genres/${id}/${name}`);
  };
  return (
    <div className={`bg-white w-fit h-fit rounded-sm `+ className}>
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
                  onClick={() => HandleGenre(value.id, value.name)}
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
    </div>
  );
};
