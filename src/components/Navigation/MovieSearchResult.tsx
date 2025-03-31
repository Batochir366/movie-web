import { VoteAverage } from "../VoteAverage";
import Image from "next/image";
import { Separator } from "../Separator";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

export const MovieSearchResult = ({
  src,
  voteAverage,
  release_date,
  original_title,
  HandleonClick,
}: {
  src?: any;
  voteAverage?: string;
  release_date?: string;
  original_title?: any;
  HandleonClick: () => void;
}) => {
  return (
    <div
      onClick={HandleonClick}
      className="bg-white flex rounded-md z-20 flex-col h-fit w-fit p-2"
    >
      <div className="flex gap-4">
        <Image
          className="rounded-md w-[67px] text-[14px] h-[100px] border-black border"
          src={src}
          alt="image not found"
          width={67}
          height={100}
        />
        <div className="w-[454px] h-fit bg-white flex gap-3 items-start flex-col">
          <div className="flex flex-col">
            <h1 className="text-[20px] font-[600] text-black">
              {original_title}
            </h1>
            <VoteAverage voteAverage={voteAverage} />
          </div>
          <div className="w-[454px] h-fit bg-white flex items-center justify-between">
            <p className="text-black h-fit font-[500] text-[14px]">
              {release_date}
            </p>
            <Button className="flex gap-2 px-4 py-2 bg-white hover:bg-[#F4F4F5] shadow-none border-none font-[500] text-[#18181B] text-[14px]">
              See more <ArrowRight className="text-black hover:bg-none" />
            </Button>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
};
