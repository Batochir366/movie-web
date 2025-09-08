import Movies from "../Movies";

export const List = () => {
  return (
    <div className=" w-full justify-between flex md:px-[80px] flex-wrap">
      <Movies ListName="Upcoming" datatype="upcoming" />
      <Movies ListName="Popular" datatype="popular" />
      <Movies ListName="Top Rated" datatype="top_rated" />
    </div>
  );
};
