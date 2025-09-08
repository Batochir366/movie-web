import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { axiosInstance } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";

type datatype = {
  genres: genres[];
};

type genres = {
  id: string;
  name: string;
};

export const Dropdown = ({
  className,
  isActive,
}: {
  className?: string;
  isActive?: boolean;
}) => {
  const [data, setData] = useState<datatype>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`genre/movie/list?language=en`)
      .then((response) => setData(response.data));
  }, []);

  const router = useRouter();

  const HandleGenre = (id: string, name: string) => {
    router.push(`/Genres/${id}/${name}`);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-all duration-200 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
        <Filter className="size-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
        <span className="hidden sm:inline">Genres</span>
        {isOpen ? (
          <ChevronUp className="size-4 text-gray-500 group-hover:text-gray-700 transition-all duration-200" />
        ) : (
          <ChevronDown className="size-4 text-gray-500 group-hover:text-gray-700 transition-all duration-200" />
        )}
      </PopoverTrigger>

      <PopoverContent
        className="w-80 p-0 border border-gray-200 rounded-xl bg-white shadow-xl"
        align="end"
        sideOffset={8}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="size-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">
              Browse by Genre
            </h3>
          </div>

          <Separator className="mb-4" />

          <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
            {data?.genres.map((value: genres, index: number) => (
              <button
                onClick={() => HandleGenre(value.id, value.name)}
                key={index}
                className="group flex items-center justify-center px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-700 border border-gray-200 hover:border-indigo-200 rounded-lg transition-all duration-200 hover:shadow-sm"
              >
                <span className="truncate">{value.name}</span>
              </button>
            ))}
          </div>

          {!data?.genres && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            </div>
          )}

          {data?.genres && data.genres.length === 0 && (
            <div className="text-center py-8 text-sm text-gray-500">
              No genres available
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
