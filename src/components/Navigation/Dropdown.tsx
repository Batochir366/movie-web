import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoChevronDown } from "react-icons/io5";
import { ChevronDown } from "lucide-react";

export const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-[#E4E4E7] w-fit h-[36px] shadow-sm px-4 py-2 justify-center items-center font-[500] text-[14px]  gap-2  flex  border-solid border rounded-md">
        <ChevronDown className="size-4" /> Genre
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
