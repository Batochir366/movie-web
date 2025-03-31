"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlayIcon } from "lucide-react";
import Image from "next/image";
import { axiosInstance } from "@/lib/utils";
type datatype = {
  results: results[];
  poster_path: string;
  backdrop_path: string;
};
type results = {
  key: string;
};
const Trailer = () => {
  const [data, setData] = useState<datatype>();
  const [idData, setIdData] = useState<datatype>();
  const id = useParams();
  useEffect(() => {
    axiosInstance
      .get(`movie/${id.id}/videos?language=en-US`)
      .then((response) => setData(response.data));
    axiosInstance
      .get(`movie/${id.id}?language=en-US`)
      .then((response) => setIdData(response.data));
  }, []);
  return (
    <div className="flex w-full h-[425px] rounded-sm">
      <Image
        src={`https://image.tmdb.org/t/p/original${
          idData?.backdrop_path || idData?.poster_path
        }`}
        alt="poster"
        width={790}
        height={428}
      />
      <Dialog>
        <div className="absolute gap-3 justify-center items-center flex pl-[24px] pt-[370px]">
          <DialogTrigger className="flex cursor-pointer size-fit bg-white hover:bg-gray-200 active:bg-black rounded-full border p-2">
            <PlayIcon className="size-4" />
          </DialogTrigger>
          <p className="text-white text-[16px]">Play trailer </p>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription className="w-[760px] h-[428px]">
              {data?.results.slice(0, 1).map((value, index) => (
                <iframe
                  key={index}
                  className="flex relative w-[760px] h-[450px] bg-no-repeat rounded-sm"
                  width={997}
                  height={561}
                  src={`https://www.youtube.com/embed/${value.key}?si=bB_vz5nDlE-bwi2u`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ))}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Trailer;
