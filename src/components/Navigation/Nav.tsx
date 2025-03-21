import React from "react";
import { Dropdown } from "./Dropdown";
import { InputSearch } from "./InputSearch";
import { Film, Moon } from "lucide-react";
export const Nav = () => {
  return (
    <nav className="w-full h-full border border-solid border-black px-[80px] py-[11.5px]">
      <div className="bg-white w-full justify-around flex">
        <div className="flex gap-2 items-center justify-center">
          <Film className="text-indigo-700 size-[20px]" />
          <h1 className="text-[16px] italic text-indigo-700 font-[700]">
            Movie Z
          </h1>
        </div>
        <div className="w-fit flex gap-3">
          <Dropdown />
          <InputSearch />
        </div>
        <div className="size-[36px] shadow-sm flex justify-center items-center border border-[#E4E4E7] border-solid rounded-[10px] ">
          <Moon className="size-4 " />
        </div>
      </div>
    </nav>
  );
};
