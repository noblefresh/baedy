import React, { useState } from 'react'
import BirthdayCard from '../organisms/BirthdayCard'
import { IoIosArrowUp } from "react-icons/io";


function BirthdayMateAccord({ data }) {

    const [show, setShow] = useState(false)

    return (
        <div>
            <div className="bg-gray-200/40 border space-y-5 border-gray-200 p-5 rounded-xl">
                <div className="flex items-center">
                    <div className="flex-grow flex text-sm gap-1">
                        <div className="font-bold">Birthday Mates -</div>
                        <div className="">This month</div>
                    </div>
                    {/* <div onClick={() => setShow(!show)} className="flex gap-2 cursor-pointer items-center">{data} <IoIosArrowUp /></div> */}
                </div>
                {
                    show && (
                        <div className="grid  sm:grid-cols-2 xl:grid-cols-4 gap-6">
                            {
                                ["", "", "", ""].map((e, i) => <BirthdayCard key={i} />)
                            }
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default BirthdayMateAccord
