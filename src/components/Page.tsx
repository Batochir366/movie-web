import React from "react";
import { Nav } from "./Navigation/Nav";
import { Upcoming } from "./Upcoming";
import { ALL_List } from "./ALL_List";

export const Page = () => {
  return (
    <div className="w-fit h-screen bg-white">
      <Nav />
      <div className="flex pt-[24px]">
        <Upcoming />
      </div>
      <ALL_List />
    </div>
  );
};
