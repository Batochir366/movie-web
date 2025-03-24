"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
type datatype = {
  results: results[];
};
type results = {
    key:string
}
const Trailer = () => {
  const [data, setData] = useState<datatype>();
  const id = useParams();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id.id}/videos?language=en-US&api_key=d67d8bebd0f4ff345f6505c99e9d0289`
      )
      .then((response) => setData(response.data));
  }, []);
  return (
    <div className="flex rounded-sm">
      {data?.results.slice(0,1).map((value, index) => (
        <iframe
          key={index}
          className="flex rounded-sm"
          width="760"
          height="428"
          src={`https://www.youtube.com/embed/${value.key}?si=bB_vz5nDlE-bwi2u`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ))}
    </div>
  );
};

export default Trailer;
