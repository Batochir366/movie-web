import { ChevronRight, X } from "lucide-react";
import React, { useState } from "react";

const GenresButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: string;
}) => {
  const [isActive, setIsActive] = useState(true);
  const HanleIsActive = () => {
    setIsActive(!isActive);
  };
  return (
    <button
      onClick={() => {
        onClick();
        HanleIsActive();
      }}
      className={`${
        isActive ? "bg-white text-black" : "bg-black text-white"
      } border cursor-pointer border-[#E4E4E7] justify-center items-center text-[12px] font-[600] flex border-solid px-[10px] py-1 h-fit rounded-full w-fit`}
    >
      {children}
      {isActive ? (
        <ChevronRight className="size-4" />
      ) : (
        <X className="size-4" />
      )}
    </button>
  );
};

export default GenresButton;
