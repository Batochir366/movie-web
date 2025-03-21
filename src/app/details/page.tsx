import { ListHeader } from "@/components/ALL_List/ListHeader";
import { ListPopular } from "@/components/ALL_List/ListPopular";
import { VoteAverage } from "@/components/ALL_List/VoteAverage";
import { Separator } from "@/components/MovieSearch/Separator";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
const page = ({
  voteAverage,
  className,
}: {
  voteAverage: string;
  className: string;
}) => {
  return (
    <div className="w-fit h-fit bg-white">
      <div className="flex px-[178px] bg-white">
        <div className="flex pt-6 gap-6">
          <div className="flex w-full justify-between gap-1">
            <div className="flex flex-col gap-1 ">
              <h1 className="text-black font-[700] text-[36px]">{"fdsh"}</h1>
              <div className="flex">
                <p className="text-black text-[18px]">{`${"462346"}`}</p>
                <p className="text-black text-[18px]">{`·${"462346"}`}</p>
                <p className="text-black text-[18px]">{`·${"3426"}`}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-col">
              <p className="text-[12px] text-black font-[500]">Rating</p>
              <div>
                <div className="flex gap-2 items-center">
                  <Star className="text-[#FDE047] fill-[#FDE047] size-[28px]" />
                  <div className="flex flex-col justify-center items-start">
                    <div className="flex items-center justify-center">
                      <h3
                        className={
                          `text-[#09090B] text-[18px] font-[600] ` + className
                        }
                      >
                        {"6.9"}
                      </h3>
                      <h3 className="text-[#71717A] text-[16px] font-[400] ">
                        /10
                      </h3>
                    </div>
                    <p className="text-[#71717A] text-[12px]">{"31k"}</p>
                  </div>
                </div>
                <p>{}</p>
              </div>
            </div>
          </div>
          <Image src={""} alt={""} width={290} height={428} />
          <iframe className="w-[760px] h-[428px]" />
        </div>
        <div>
          <div></div>
          <p>{}</p>
          <div className="flex justify-center gap-[53px]">
            <h1 className="text-[16px] font-[700]">{}</h1>
            <h1 className="text-[16px]">{}</h1>
            <Separator />
          </div>
          <div className="flex justify-center gap-[53px]">
            <h1 className="text-[16px] font-[700]">{}</h1>
            <h1 className="text-[16px]">{}</h1>
            <Separator />
          </div>
          <div className="flex justify-center gap-[53px]">
            <h1 className="text-[16px] font-[700]">{}</h1>
            <h1 className="text-[16px]">{}</h1>
            <Separator />
          </div>
        </div>
        <div>
          <ListHeader ListName="More like this" />
          <ListPopular />
        </div>
      </div>
    </div>
  );
};
export default page;
