import AppLayout from '@/components/layouts/appLayout'
import BirthdayCard from '@/components/organisms/BirthdayCard';
import React from 'react'
import { IoIosArrowUp } from "react-icons/io";
import { FaCopy } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import TimeComp from '@/components/organisms/TimeComp';
import { fetchDashBoardData } from '@/services/authService';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import BirthdayMateAccord from '@/components/molecules/BirthdayMateAccord';
import ReferralChip from '@/components/organisms/ReferralChip';

function Index({ dashboardData }) {

  const user = useSelector((state) => state.User);


  return (
    <AppLayout title={`Welcome ${user?.value?.user?.fname} 👋`}>
      <div className="p-3">
        <TimeComp title="Activities Overview" />
      </div>
      <div className="pl-4">
        <ReferralChip />
      </div>
      <div className="p-4">
        <div className="grid lg:grid-cols-2 items-center gap-4 bg-gray-200/40 border space-y-5 border-gray-200 p-5 rounded-xl">
          <div className="space-y-6">
            <div className="font-extrabold sm:text-xl lg:text-2xl xl:text-5xl">You don&apos;t have any subscription</div>
            <div className="text-xs sm:text-sm lg:text-xl xl:text-2xl">Subscribe to see your birthday mate and other amazing stuff that awaits you!  </div>
            <div className="px-4 py-2 rounded-lg bg-amber-400 text-white inline text-xs">Learn More</div>
          </div>
          <div className="">
            <Link href="subscription_details" className="">
              <div className="bg-amber-400 rounded-lg lg:rounded-2xl w-full lg:py-5 py-3 text-center text-white font-bold lg:text-2xl">Subscribe Now</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4">
        
          {
            ["April"].map((e) => <BirthdayMateAccord data={e} key={e} />)
          }
      </div>
    </AppLayout>
  )
}


export const getServerSideProps = async (context) => {
  const { status, data } = await fetchDashBoardData();

  return {
    props: {
      dashboardData: status ? data : {},
    },
  };
};


export default Index
