"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Movies from "./Movies";

export const List = () => {
  return (
    <div className="gap-[32px] w-full justify-between flex px-[80px] flex-wrap">
      <Movies ListName="upcoming" datatype="upcoming" />
      <Movies ListName="popular" datatype="popular" />
      <Movies ListName="Top rated" datatype="top_rated" />
    </div>
  );
};
