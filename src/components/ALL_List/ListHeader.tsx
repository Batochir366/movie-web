import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
export const ListHeader = ({
  ListName,
  className,
}: {
  ListName: string;
  className?: string;
}) => {
  return (
    <div className={`flex w-full justify-between ` + className}>
      <h1 className="font-[600] text-[24px]">{ListName}</h1>
      <Button className="flex gap-2 px-4 py-2 bg-white hover:bg-[#F4F4F5] border-none font-[500] text-[#18181B] text-[14px]">
        See more <ArrowRight className="text-black hover:bg-none" />
      </Button>
    </div>
  );
};
