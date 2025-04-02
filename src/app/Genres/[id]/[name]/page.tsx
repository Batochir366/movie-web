"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { VoteAverage } from "@/components/VoteAverage";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { axiosInstance } from "@/lib/utils";
import { Method } from "axios";
import { ChevronRight } from "lucide-react";
import GenresButton from "@/components/GenresButton";
type datatype = {
  total_pages: number | undefined;
  total_results: number;
  results: results[];
  genres: genres[];
};
type genres = {
  name: string;
};
type results = {
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
};
const Movies = () => {
  const { id } = useParams();
  const { name } = useParams();
  const params = useSearchParams();
  const page = params.get("page");
  const pathname = usePathname();
  const [Data, setData] = useState<datatype>();
  const [currentPage, setCurrentPage] = useState(parseInt(page || "1"));
  const [genresId, setGenresId] = useState(id);
  const [genresName, setGenresName] = useState("");
  const searchParams = useSearchParams();

  const HanleMovieGenreId = (id: string) => {
    const test = searchParams.getAll("genresIds");
    console.log(test, "test");

    router.push(`${pathname}?genresIds=${id}`);
  };
  const HanleMovieGenreName = (name: string) => {
    setGenresName((prev) => prev + ", " + name);
  };

  useEffect(() => {
    axiosInstance
      .get(`discover/movie?language=en&with_genres=${id}&page=${currentPage}`)
      .then((response) => setData(response.data));
  }, [genresId]);

  console.log(Data, "inputValue");

  const [seeAllResults, setSeeAllResults] = useState<datatype>();
  useEffect(() => {
    axiosInstance
      .get(`genre/movie/list?language=en`)
      .then((response) => setSeeAllResults(response.data));
  }, []);

  const router = useRouter();
  const HandleOnClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  return (
    <div className="w-full pt-[52px] flex px-[80px] gap-[52px]">
      <div className="w-[577px] flex flex-col gap-5">
        <h1 className="font-[600] flex text-[24px]">Search Filter</h1>
        <div className="w-[387px] flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className="text-[24px] font-[600] text-black">Genres</p>
            <p className="text-[16px] text-black">
              See lists of movies by genre
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {seeAllResults?.genres.map((value: any, index: any) => (
              <GenresButton
                onClick={() => {
                  HanleMovieGenreId(value.id);
                  HanleMovieGenreName(value.name);
                }}
                key={index}
              >
                {value.name}
              </GenresButton>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-8 items-start flex-col">
        <p className="text-[28px] font-[600]">{`${Data?.total_results} titles in "${name}${genresName}"`}</p>
        <div className="gap-[32px] w-full justify-between flex flex-wrap">
          {Data?.results.slice(0, 12).map((value: any, i: number) => (
            <div key={i}>
              <div
                onClick={() => HandleOnClick(value.id)}
                className="h-[331px] w-[165px] rounded-[8px] bg-[#F4F4F5]"
              >
                <Image
                  className="w-[165px] h-[244px] rounded-t-[8px] "
                  height={244}
                  width={165}
                  src={`https://image.tmdb.org/t/p/original${
                    value.poster_path || value.backdrop_path
                  }`}
                  alt="poster"
                />
                <div className="flex flex-col p-2 gap-[3px]">
                  <VoteAverage voteAverage={value.vote_average} />
                  <p className="text-[12px] text-[#09090b] w-fit h-fit">
                    {value.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination>
          <PaginationContent>
            {currentPage !== 1 && (
              <PaginationItem>
                <PaginationPrevious href={`?page=${currentPage - 1}`} />
              </PaginationItem>
            )}
            {currentPage > 4 && (
              <PaginationItem>
                <PaginationLink href={`?page=1`}>1</PaginationLink>
              </PaginationItem>
            )}
            {currentPage > 4 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {currentPage !== 1 && (
              <PaginationItem>
                <PaginationLink href={`?page=${currentPage - 1}`}>
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href={`?page=${currentPage}`}
                isActive={currentPage == currentPage}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {currentPage < 499 && (
              <PaginationItem>
                <PaginationLink href={`?page=${currentPage + 1}`}>
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            {currentPage <= 495 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {currentPage < 496 && (
              <PaginationItem>
                <PaginationLink href={`?page=500`}>{500}</PaginationLink>
              </PaginationItem>
            )}
            {currentPage !== 500 && (
              <PaginationItem>
                <PaginationNext href={`?page=${currentPage + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
export default Movies;
