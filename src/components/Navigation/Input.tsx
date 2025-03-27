import * as React from "react";

function Input({ HandleOnChange }: { HandleOnChange: (event: any) => void }) {
  return (
    <input
      placeholder="Search.."
      onChange={HandleOnChange}
      className={
        "file:text-foreground border-none h-[20px] flex shadow-none w-[355px] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-w-0 rounded-md border bg-transparent px-3 py-1 text-base  transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-smaria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
      }
    />
  );
}
export default Input;
