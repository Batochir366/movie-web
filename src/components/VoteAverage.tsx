import React from "react";

export const VoteAverage = ({
  voteAverage,
  className,
}: {
  voteAverage?: string;
  className?: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex justify-center items-center">
        <h3 className={`text-[#09090B] text-[14px] font-[600] ` + className}>
          {voteAverage}
        </h3>
        <h3 className="text-[#71717A] text-[12px] font-[400] ">/10</h3>
      </div>
    </div>
  );
};
