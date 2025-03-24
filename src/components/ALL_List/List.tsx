"use client";
import React, { useEffect, useState } from "react";
import UpcomingData from "./UpcomingData";
import PopularData from "./PopularData";
import TopRatedData from "./TopRatedData";

export const List = () => {
  return (
    <div className="flex flex-col w-full pt-[52px] gap-[52px]">
      <UpcomingData ListName="Upcoming" />
      <PopularData ListName="Popular" />
      <TopRatedData ListName="Top Rated" />
    </div>
  );
};
