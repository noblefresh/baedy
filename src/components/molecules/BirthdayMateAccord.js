import React, { useState } from 'react'
import BirthdayCard from '../organisms/BirthdayCard'
import { IoIosArrowUp } from "react-icons/io";
import EmblaCarousel from './EmblaCarousel';


function BirthdayMateAccord({ data, sideText }) {

    const [show, setShow] = useState(false)
    

    return (
        <div>
            <div className="bg-gray-200/40 overflow-x-auto border space-y-5 border-gray-200 p-5 rounded-xl">
                <div onClick={() => setShow(!show)} className="flex sticky left-0 items-center">
                    <div className="flex-grow flex text-sm gap-1">
                        {sideText}
                    </div>
                    <div className="flex gap-2 cursor-pointer items-center">{data[0] ?? data[0]} <IoIosArrowUp /></div>
                </div>

                {
                    show && (

                        <EmblaCarousel
                            options={{ align: "start", dragFree: true}}
                        >
                            {
                                data[1].map((e) => <BirthdayCard data={e} month={data[0] ?? data[0]} key={e.id} />)
                            }
                        </EmblaCarousel>

                    )
                }


            </div>
        </div>
    )
}

export default BirthdayMateAccord
