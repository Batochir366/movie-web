import React from "react";
import Image from "next/image";
export const Movies = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <div className="h-[440px] w-[230px] rounded-[8px] bg-[#F4F4F5]">
      <Image
        className="w-[230px] h-[340px] rounded-t-[8px] "
        height={340}
        width={230}
        src={imgSrc}
        alt="poster"
      />
      <div></div>
    </div>
  );
};
