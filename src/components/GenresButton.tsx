import { ChevronRight, X } from "lucide-react";
import React from "react";

const GenresButton = ({
  onClick,
  children,
  active,
}: {
  onClick: () => void;
  children: string;
  active: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        active ? "bg-black text-white" : "bg-white text-black"
      } border cursor-pointer border-[#E4E4E7] flex items-center justify-center gap-1 text-[12px] font-semibold px-[10px] py-1 rounded-full transition-colors duration-200 h-fit`}
    >
      {children}
      {active ? <X className="size-4" /> : <ChevronRight className="size-4" />}
    </button>
  );
};

export default GenresButton;
