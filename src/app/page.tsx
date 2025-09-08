"use client";
import { List } from "@/components/ALL_List/List";
import { Upcoming } from "@/components/Upcoming";

export default function Home() {
  return (
    <div className="flex w-fit h-fit flex-col scroll-auto pb-6">
      <Upcoming />
      <List />
    </div>
  );
}
