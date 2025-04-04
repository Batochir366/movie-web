"use client";
import { List } from "@/components/ALL_List/List";
import { Upcoming } from "@/components/Upcoming";

export default function Home() {
  return (
    <div className="flex w-screen h-fit flex-col scroll-auto">
      <Upcoming />
      <List />
    </div>
  );
}
