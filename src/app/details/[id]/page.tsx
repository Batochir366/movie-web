import { ListHeader } from "@/components/ALL_List/ListHeader";
import { VoteAverage } from "@/components/ALL_List/VoteAverage";
import { Separator } from "@/components/MovieSearch/Separator";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
const page = ({
  voteAverage,
  className,
}: {
  voteAverage: string;
  className: string;
}) => {
  const router = useRouter()
  const HandleOnClick = ((id:string)=>{
    router.push(`/details/${id}`)
  }
  )
  return (
    <div className="w-fit h-fit bg-white">
      <div className="flex flex-col px-[178px] bg-white">
        <div className="flex flex-col pt-6 gap-6">
          <div className="flex w-full justify-between gap-1">
            <div className="flex flex-col gap-1 ">
              <h1 className="text-black font-[700] text-[36px]">{"fdsh"}</h1>
              <div className="flex">
                <p className="text-black text-[18px]">{`${"2025.3.21"} · ${"GG"} · ${"2h 40m"}`}</p>
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
          <div className="flex gap-8">
            <Image
              className="rounded-sm"
              src={""}
              alt={""}
              width={290}
              height={428}
            />
            <iframe className="w-[760px] rounded-sm border-black border border-solid h-[428px]" />
          </div>
        </div>
        <div className="flex gap-5 pt-[32px] flex-col">
          <div className="flex h-[20px] flex-wrap gap-3 bg-amber-200">
            <div className="bg-red-700 h-[20px] rounded-full w-fit">35</div>
            <div className="bg-red-700 h-[20px] rounded-full w-fit">2</div>
            <div className="bg-red-700 h-[20px] rounded-full w-fit">3</div>
          </div>
          <p className="text-[16px] text-black">
            {
              "Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads. "
            }
          </p>
          <div className="flex flex-col gap-5">
            <div className="flex gap-[53px]">
              <h1 className="text-[16px] font-[700]">{"test"}</h1>
              <h1 className="text-[16px]">{"test"}</h1>
            </div>
            <Separator />
            <div className="flex gap-[53px]">
              <h1 className="text-[16px] font-[700]">{"test"}</h1>
              <h1 className="text-[16px]">{"test"}</h1>
            </div>
            <Separator />
            <div className="flex gap-[53px]">
              <h1 className="text-[16px] font-[700]">{"test"}</h1>
              <h1 className="text-[16px]">{"test"}</h1>
            </div>
            <Separator />
          </div>
        </div>
        <div className="flex pb-[113px] pt-[32px]">
          <div className="flex flex-col gap-8">
            <ListHeader ListName="More Like this" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
