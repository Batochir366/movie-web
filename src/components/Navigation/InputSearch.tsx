import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export const InputSearch = () => {
  return (
    <div className="flex justify-center items-center bg-white border border-solid rounded-md border-[#E4E4E7] w-fit h-[36px] px-3 gap-[10px]">
      <Search className="size-4 opacity-[0.5]" />
      <Input
        className="border-none h-[20px] flex shadow-none w-[355px]"
        placeholder="Search.."
      />
    </div>
  );
};
