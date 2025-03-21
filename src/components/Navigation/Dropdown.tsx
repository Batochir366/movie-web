import React from "react";
import { IoChevronDown } from "react-icons/io5";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export const Dropdown = () => {
  return (
    <Popover>
      <PopoverTrigger className="border-[#E4E4E7] w-fit h-[36px] shadow-sm px-4 py-2 justify-center items-center font-[500] text-[14px]  gap-2  flex  border-solid border rounded-md">
        <ChevronDown className="size-4" />
        Genre
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};
