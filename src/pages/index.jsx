import AppLayout from '@/components/layouts/appLayout'
import BirthdayCard from '@/components/organisms/BirthdayCard';
import React from 'react'
import { IoIosArrowUp } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";

function Index() {
  return (
    <AppLayout>
      <div className=""></div>
      <div className="pl-4">
        <div className="flex bg-gradient-to-r from-orange-400 from-0% to-40% to-transparent border space-y-5 border-gray-50 p-3 rounded-xl">
          <div className="flex w-full">
            <div className="flex-grow relative top-1">Refer your friends to earn amazing reward through your referral link.</div>
            <div className="flex w-96 bg-gray-200/40 border border-gray-50 rounded-lg overflow-hidden">
              <div className="flex-grow gap-4 text-xs flex items-center">
                <div className="text-amber-600 px-3 font-bold">Referral link:</div>
                <div className="">https//www.baedy.com/diala</div>
              </div>
              <div className="text-amber-600 cursor-pointer bg-amber-200 p-2"><FaCopy /></div>
              <div className="text-amber-600 cursor-pointer bg-amber-200 p-2"><FaRegShareFromSquare /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 items-center gap-4 bg-gray-200/40 border space-y-5 border-gray-200 p-5 rounded-xl">
          <div className="space-y-6">
            <div className="font-extrabold text-5xl">You don&apos;t have any subscription</div>
            <div className="">Subscribe to see your birthday mate and other amazing stuff that awaits you!  </div>
            <div className="px-4 py-2 rounded-lg bg-amber-400 text-white inline text-xs">Learn More</div>
          </div>
          <div className="">
            <div className="">
              <div className="bg-amber-400 rounded-2xl w-full py-5 text-center text-white font-bold text-2xl">Subscribe Now</div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="bg-gray-200/40 border space-y-5 border-gray-200 p-5 rounded-xl">
          <div className="flex items-center">
            <div className="flex-grow flex text-sm gap-1">
              <div className="font-bold">Celebrants -</div>
              <div className="">This month</div>
            </div>
            <div className="flex gap-2 items-center">April <IoIosArrowUp /></div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {
              ["", "", "", ""].map((e, i) => <BirthdayCard key={i} />)
            }
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Index
