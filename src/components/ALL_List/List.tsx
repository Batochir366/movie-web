"use client";
import React, { useEffect, useState } from "react";
import { ListHeader } from "./ListHeader";
import axios from "axios";
import Image from "next/image";
import { VoteAverage } from "./VoteAverage";
import Movies from "./Movies";

export const List = () => {
  const [data,setData] = useState()
  const [data2 ,setData2]=useState()
  const arr=["upcoming",""]
  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=d67d8bebd0f4ff345f6505c99e9d0289`).then((responce)=> setData(responce.data.results))
  },[])
  return (
    <div className="flex flex-col w-full pt-[52px]  gap-[52px]">
      <Movies Data={data} datatype="upcoming"/>
    </div>
  );
};
