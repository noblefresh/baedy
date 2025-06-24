import AppLayout from '@/components/layouts/appLayout'
import BirthdayCard from '@/components/organisms/BirthdayCard';
import React, { useEffect, useState } from 'react'
import wallet from "@asset/Images/money3D.png"
import snadtime from "@asset/Images/snadtime.png"
import TimeComp from '@/components/organisms/TimeComp';
import { fetchDashBoardData } from '@/services/authService';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import BirthdayMateAccord from '@/components/molecules/BirthdayMateAccord';
import bgImg from "@asset/Images/sub_bg.png"
import ReferralChip from '@/components/organisms/ReferralChip';
import Image from 'next/image';

function Index() {

  const user = useSelector((state) => state.User);

  const [dashboardData, setDashboardData] = useState({});

  const [shoutouts, setShouts] = useState([])


  const fetchData = async () => {
    const { status, data } = await fetchDashBoardData();
    status && setDashboardData(data?.data);
  }

  const shouts = async () => {
    fetch('https://api.bigdaymi.com/api/frontend/fetch_frontend_shoutouts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setShouts(data.data.data)
      })
  }

  useEffect(() => {
    fetchData()
    shouts()
  }, [])


  return (
    <AppLayout active="home" title={`Welcome ${user?.value?.user?.fname} 👋`}>
      <div className="p-3">
        <TimeComp title="Activities Overview" />
      </div>
      <div className="pl-4">
        <ReferralChip />
      </div>
      <div className="p-4">
        {
          dashboardData?.count_active_subscriptions > 0 ? (
            <div className="lg:grid grid-cols-2 xl:grid-cols-3 items-center gap-4">
              <div className={`xl:col-span-2 space-y-5 px-8 py-8 bgImg bg-cover bg-no-repeat rounded-xl`}>
                <div className="">
                  <div className="w-16 h-16 border-8 border-white/50 rounded-full overflow-hidden">
                    <Image alt='card' src={snadtime} className='h-full w-full' width={300} height={300} />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="">
                    <div className="font-bold">Your Birthday Countdown</div>
                    <div className="text-lg">Only {dashboardData?.user_birthday} days until your special day! 🎈</div>
                  </div>
                  <div className="font-extrabold text-lg md:text-xl lg:text-3xl xl:text-5xl text-amber-100">
                    {dashboardData?.user_birthday} day{dashboardData?.user_birthday > 1 && "s"}
                  </div>
                </div>
              </div>
              <div className="bg-green-100/30 space-y-5 border border-white/30 p-5 rounded-xl">
                <div className="">
                  <div className="w-16 h-16 border-8 border-white rounded-full overflow-hidden">
                    <Image alt='card' src={wallet} className='h-full w-full' width={300} height={300} />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="space-y-3">
                    <div className="font-bold text-xl">Active Subscriptions</div>
                    <div className="">Premium Plan - Expires in {dashboardData?.expires_in} day{dashboardData?.expires_in > 1 && "s"}.</div>
                  </div>
                  <div className="font-bold text-5xl text-green-600">{dashboardData?.count_active_subscriptions}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 items-center gap-4 bg-gray-200/40 border space-y-5 border-gray-200 p-5 rounded-xl">
              <div className="space-y-6">
                <div className="font-extrabold sm:text-xl lg:text-2xl xl:text-5xl">You don&apos;t have any subscription</div>
                <div className="text-xs sm:text-sm lg:text-xl xl:text-2xl">Subscribe to earn rewards, receive gifts and other amazing things that awaits you!.  </div>
                <Link href="subscription_details" className="">
                  <div className="px-4 py-2 rounded-lg bg-amber-400 text-white inline text-xs">Learn More</div>
                </Link>
              </div>
              <div className="">
                <Link href="subscription_details" className="">
                  <div className="bg-amber-400 rounded-lg lg:rounded-2xl w-full lg:py-5 py-3 text-center text-white font-bold lg:text-2xl">Subscribe Now</div>
                </Link>
              </div>
            </div>
          )
        }

      </div>
      <div className="p-4 relative">
        {
          [[dashboardData?.current_month, dashboardData?.this_month_birthday_users]].map((e) => <BirthdayMateAccord sideText={<div className='flex items-center gap-2'>
            <div className="font-bold">Celebrants -</div>
            <div className="text-xs">This month</div>
          </div>} data={e} key={e} />)
        }
      </div>

      <div className="space-y-2">
        <div className="font-bold px-5">Birthday Shoutout</div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 px-4">
          {
            shoutouts.map(el => (
              <div key={el?.id} class="swiper-slide bg-white rounded-xl flex-shrink-0">
                <div class="bg-[#F6F6F6] p-2.5 rounded-xl text-left">
                  <Image src={el?.user?.avatar} alt="" class="rounded-xl w-full h-40 object-cover" width={100} height={100} />
                  <p class="pt-2 text-[#6D6D6D]">Celebrant: <span class="font-semibold text-[#3D3D3D]">{el?.user?.fname} {el?.user?.lname}</span></p>
                </div>
                <div class="text-left p-4">
                  <h2 class="text-[#FC9A04] font-semibold">Shoutout Message</h2>
                  <p class="text-[#3D3D3D] text-sm">{el?.message}</p>
                </div>
              </div>
            ))
          }
        </div>
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
