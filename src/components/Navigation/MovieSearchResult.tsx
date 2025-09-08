import { VoteAverage } from "../VoteAverage";
import Image from "next/image";

export const MovieSearchResult = ({
  src,
  voteAverage,
  release_date,
  original_title,
  HandleonClick,
}: {
  src?: string;
  voteAverage?: string;
  release_date?: string;
  original_title?: string;
  HandleonClick: () => void;
}) => {
  return (
    <div
      onClick={HandleonClick}
      className="group bg-white hover:bg-gray-50 flex gap-3 rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-md border border-transparent hover:border-gray-200"
    >
      {/* Image */}
      <div className="flex-shrink-0 w-12 h-16 sm:w-14 sm:h-20 relative overflow-hidden rounded-md">
        <Image
          src={src || "/placeholder.png"}
          alt={original_title || "Movie Poster"}
          fill
          className="object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {/* Overlay gradient for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center flex-1 min-w-0 gap-1">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
          {original_title}
        </h3>

        <div className="flex items-center gap-2">
          <VoteAverage voteAverage={voteAverage} />
          {release_date && (
            <>
              <span className="text-gray-300">•</span>
              <p className="text-xs text-gray-600">{release_date}</p>
            </>
          )}
        </div>
      </div>

      {/* Arrow indicator */}
      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <svg
          className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};
