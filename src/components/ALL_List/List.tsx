"use client";
import React, { useEffect, useState } from "react";
import { ListHeader } from "./ListHeader";
import axios from "axios";
import Image from "next/image";
import { VoteAverage } from "./VoteAverage";
import Movies from "./Movies";

export const List = () => {
  
  const [data2 ,setData2]=useState()
  const arr = ["upcoming","top_rated","popular"]
  return (
    <div className="flex flex-col w-full pt-[52px] gap-[52px]">
      <Movies ListName="Upcoming" datatype={arr[0]} />
      <Movies ListName="Popular" datatype={arr[1]} />
      <Movies ListName="Top Rated" datatype={arr[1]} />
    </div>
  );
};
