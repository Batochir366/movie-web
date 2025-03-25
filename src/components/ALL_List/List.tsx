"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Movies from "./Movies";
import { ListHeader } from "./ListHeader";

export const List = () => {
  return (
    <div className="flex flex-col w-full pt-[52px] gap-[52px]">
      <div className="gap-[32px] w-full justify-between flex px-[80px] flex-wrap">
        <ListHeader ListName="Upcoming" />
        <Movies datatype="upcoming" />
        <ListHeader ListName="Popular" />
        <Movies datatype="popular" />
        <ListHeader ListName="Top Rated" />
        <Movies datatype="top_rated" />
      </div>
    </div>
  );
};
