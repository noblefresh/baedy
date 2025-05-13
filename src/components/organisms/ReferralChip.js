import React from 'react'
import { FaCopy } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";

function ReferralChip() {
    return (
        <div className="flex bg-gradient-to-r from-orange-400 from-0% to-40% to-transparent border space-y-5 border-gray-50 p-3 rounded-xl">
            <div className="xl:flex space-y-3 xl:space-y-0 w-full">
                <div className="flex-grow relative text-sm lg:text-base top-1">Refer your friends to earn amazing reward through your referral link.</div>
                <div className="flex  sm:w-96 bg-gray-200/40 border border-gray-50 rounded-lg overflow-hidden">
                    <div className="flex-grow gap-4 text-xs flex items-center">
                        <div className="text-amber-600 hidden sm:block px-3 font-bold">Referral link:</div>
                        <div className="px-2 sm:px-0">https//www.baedy.com/diala</div>
                    </div>
                    <div className="text-amber-600 cursor-pointer bg-amber-200 p-2"><FaCopy /></div>
                    <div className="text-amber-600 cursor-pointer bg-amber-200 p-2"><FaRegShareFromSquare /></div>
                </div>
            </div>
        </div>
    )
}

export default ReferralChip
