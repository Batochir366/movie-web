import React from 'react'
import { VoteAverage } from '../ALL_List/VoteAverage'
import Image from 'next/image'
import { MovieDescription } from './MovieDescription'
import { Separator } from './Separator'

export const MovieSearchResult = () => {
  return (
    <div className="bg-white h-fit w-fit p-2">
       <div className="flex gap-4">
            <Image
            className="rounded-md"
            src={""}
            alt="poster"
            width={64}
            height={100}/>
            <MovieDescription/>
        </div>
        <Separator/>
    </div>
  )
}
