import React from "react";
import { ListHeader } from "./ListHeader";
import { Movies } from "./Movies";
const moviesData = {
  imgSrc:
    "https://s3-alpha-sig.figma.com/img/7aa1/1575/96c5c5026e3cccbd4a9ca91b9d63dc7a?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TVUi4evCaWv5DXCkFcCXhK5a7XqGLRmAZ46uJH1yM-Fvt~EQO~x3pvBs-s1NXOhAYDjpUlbOSlxEvu0qGD57d4VrRTCnAduwbs0mxFf0XrFpCnOA5Yt0Z3zOCtbnrr4uPJc9aI~O75AITvlCwxdGsFkTgJfdO9nna51yGU-NKXwsjijsbuumFxUJmGULzs5dUbvEW-zBHN2ndMv~eM2QSY0CidjLVlvxQ2il8o8ppwYjVcrskJdifcewBLBgDJTkSID-kb~gxp2lj1Kt75UebcktxFj6yKftUrfgywB1-slsmVEV0J1DftM00LXqF9Y2T1EGuq8XFxug-QkftbReyg__",
};
export const MovieList = () => {
  return (
    <div className="flex flex-col gap-[32px]">
      <ListHeader />
      <div className="grid gap-[32px] grid-cols-5 grid-rows-2"></div>
    </div>
  );
};
