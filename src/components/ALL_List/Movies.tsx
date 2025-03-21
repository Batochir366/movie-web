import React from 'react'
import { ListHeader } from './ListHeader'
import Image from 'next/image'
import { VoteAverage } from './VoteAverage'

const Movies = ({Data,datatype}: {Data?:string,datatype?:string}) => {
  return (
    <div className=" gap-[32px] w-full justify-between flex px-[80px] flex-wrap">
        <ListHeader ListName="Up coming" />
        {{Data}?.slice(0, 10).map((value: any, i: any) => (
          <div
            key={i}
            className="h-[440px] w-[230px] rounded-[8px] bg-[#F4F4F5]"
          >
            <Image
              className="w-[230px] h-[340px] rounded-t-[8px] "
              height={340}
              width={230}
              src={`https://image.tmdb.org/t/p/original${
                value.poster_path || value.backdrop_path
              }`}
              alt="poster"
            />
            <div className="flex flex-col p-2 gap-[3px]">
              <VoteAverage voteAverage={value.vote_average} />
              <p className="text-[12px] text-[#09090b] w-[214px] h-fit">
                {value.title}
              </p>
            </div>
          </div>
        ))}
      </div>
  )
}

export default Movies
