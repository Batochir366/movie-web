import { useParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

import { axiosInstance } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";

type datatype = {
  cast: cast[];
  crew: crew[];
};
type cast = {
  name: string;
};
type crew = {
  known_for_department: string;
  name: string;
  job: string;
  department: string;
};

const MovieDetails = () => {
  const [data, setData] = useState<datatype>();
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .get(`movie/${id}/credits?language=en-US`)
      .then((response) => setData(response.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!data) return null;

  const directors = data.crew.filter((c) => c.job === "Director");
  const writers = data.crew.filter((c) => c.department === "Writing");
  const stars = data.cast.slice(0, 3);

  const renderPeople = (people: { name: string }[]) => (
    <div className="flex flex-wrap gap-2">
      {people.map((person, idx) => (
        <span
          key={idx}
          className="text-gray-800 text-sm sm:text-base font-medium"
        >
          {person.name}
        </span>
      ))}
    </div>
  );

  return (
    <Suspense>
      <div className="flex flex-col gap-3">
        {/* Director */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <h2 className="w-[70px] font-bold text-gray-900">Director</h2>
          {renderPeople(directors)}
        </div>
        <Separator />

        {/* Writers */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <h2 className="w-[70px] font-bold text-gray-900">Writers</h2>
          {renderPeople(writers)}
        </div>
        <Separator />

        {/* Stars */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <h2 className="w-[70px] font-bold text-gray-900">Stars</h2>
          {renderPeople(stars)}
        </div>
        <Separator />
      </div>
    </Suspense>
  );
};

export default MovieDetails;
