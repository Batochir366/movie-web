import Image from 'next/image'
import React from 'react'
import { VoteAverage } from '../ALL_List/VoteAverage'
import { MovieSearchResult } from './MovieSearchResult'

export const MovieSearch = () => {
  return (
    <div className="bg-white w-fit h-fit border-[#E4E4E7] rounded-lg border border-solid p-3">
       <MovieSearchResult/>
    </div>
  )
}
