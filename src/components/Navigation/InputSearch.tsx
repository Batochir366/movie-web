"use client";
import React, { use, useState } from "react";
import { Search } from "lucide-react";
import Input from "./Input";
export const InputSearch = () => {
  return (
    <div className="flex justify-center items-center bg-white border border-solid rounded-md border-[#E4E4E7] w-fit h-[36px] px-3 gap-[10px]">
      <Search className="size-4 opacity-[0.5]" />
      <Input />
    </div>
  );
};
