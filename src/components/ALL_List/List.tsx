import Movies from "../Movies";

export const List = () => {
  return (
    <div className="gap-[32px] w-full justify-between flex px-[80px] flex-wrap">
      <Movies ListName="Upcoming" datatype="upcoming" />
      <Movies ListName="Popular" datatype="popular" />
      <Movies ListName="Top Rated" datatype="top_rated" />
    </div>
  );
};
