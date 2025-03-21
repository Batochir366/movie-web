import React from "react";
import { Nav } from "./Navigation/Nav";
import { Upcoming } from "./Upcoming";
import { ALL_List } from "./ALL_List";
import { Footer } from "./Footer";

export const HomePage = () => {
  return (
    <div className="w-full flex flex-col  h-full bg-white">
      <Nav />
      <div className="flex pt-[24px]">
        <Upcoming />
      </div>
      <ALL_List />
      <div className="flex pt-[51px]">
        <Footer />
      </div>
    </div>
  );
};
