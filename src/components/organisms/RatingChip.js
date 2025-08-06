import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

function RatingChip({ rate }) {
    return (
        <div className="flex *:flex *:items-center *:flex-col *:justify-center justify-between">
            <div className="">
                <div className={`text-3xl ${ rate >= 1 ? 'text-amber-500 ' : 'text-gray-300 '}`}>
                    <AiFillStar />
                </div>
            </div>
            <div className="">
                <div className={`text-3xl ${ rate >= 2 ? 'text-amber-500 ' : 'text-gray-300 '}`}>
                    <AiFillStar />
                </div>
            </div>
            <div className="">
                <div className={`text-3xl ${rate >= 3 ? ' text-amber-500' : ' text-gray-300'}`}>
                    <AiFillStar />
                </div>
            </div>
            <div className="">
                <div className={`text-3xl ${ rate >= 4 ? 'text-amber-500 ' : 'text-gray-300 '}`}>
                    <AiFillStar />
                </div>
            </div>
            <div className="">
                <div className={`text-3xl ${rate >= 5 ? ' text-amber-500' : ' text-gray-300'}`}>
                    <AiFillStar />
                </div>
            </div>
        </div>
    )
}

export default RatingChip