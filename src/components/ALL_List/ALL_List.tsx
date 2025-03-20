"use client";
import React from "react";
import { ListUpcoming } from "./ListUpcoming";
import { ListPopular } from "./ListPopular";
import { ListTopRated } from "./ListTopRated";

export const ALL_List = () => {
  return (
    <div className="flex flex-col pt-[52px] px-[80px] gap-[52px]">
      <ListUpcoming />
      <ListPopular />
      <ListTopRated />
    </div>
  );
};
