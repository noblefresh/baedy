import AppLayout from '@/components/layouts/appLayout'
import BirthdayCard from '@/components/organisms/BirthdayCard';
import React, { useEffect, useState } from 'react'
import wallet from "@asset/Images/money3D.png"
import snadtime from "@asset/Images/snadtime.png"
import TimeComp from '@/components/organisms/TimeComp';
import { fetchDashBoardData, giftUser } from '@/services/authService';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import BirthdayMateAccord from '@/components/molecules/BirthdayMateAccord';
import bgImg from "@asset/Images/sub_bg.png"
import giftimg from "@asset/Images/giftimg.png"
import ReferralChip from '@/components/organisms/ReferralChip';
import Image from 'next/image';
import AppModal from '@/components/organisms/AppModal';
import serialize from '@/hooks/Serialize';
import { FiStar } from 'react-icons/fi';

function Index() {

  const user = useSelector((state) => state.User);

  const [giftModal, setGiftModal] = useState(false)
  const [dashboardData, setDashboardData] = useState({});

  const [showAmount, setAmount] = useState(false)
  const [proccessingFund, setProccessingFund] = useState(false)
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




  const submit = async (e) => {
    e.preventDefault();
    setProccessingFund(true)
    let payload = serialize(e.target)
    payload.user_id = giftModal?.user?.id
    const { status, data: res } = await giftUser(payload)
    status && setAmount(true) && setAmount(true) && setGiftModal({})
    setProccessingFund(false)
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
      <div className='fixed z-50'>
        {
          showAmount ? (
            <AppModal mode={showAmount}>
              <div className="space-y-6 text-center">
                <div className='text-8xl flex items-center justify-center text-amber-500'><FiStar /></div>
                <div className='text-xl font-bold'>Gift sent successfully</div>
                <div className='text-gray-400 text-sm'>Thank You</div>
                <button onClick={() => { setGiftModal({}); setAmount(false) }} className="flex-grow w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> Done </button>
              </div>
            </AppModal>
          ) : (
            <AppModal mode={Object.keys(giftModal).length > 0} withClose={() => { setGiftModal({}); setAmount(false) }} >
              <form onSubmit={submit}>
                <div className='space-y-6 text-center'>
                  <div>
                    <Image alt="Thank" src={giftimg} width={100} height={100} className="w-2/4 mx-auto pointer-events-none" />
                  </div>
                  <div>Please enter the amount to send</div>
                  <div>
                    <div className='w-40 items-center justify-center border border-white/50 flex gap-1 rounded-lg p-2 mx-auto font-extrabold text-4xl'>
                      &#8358;  <input name='amount' required className='w-full outline-0 ring-0 focus-within:outline-0' placeholder='50,000' type='tel' />
                    </div>
                  </div>
                  <div>Receiver: {giftModal?.user?.fname} {giftModal?.user?.lname}</div>
                  <div>
                    <div className="flex gap-3">
                      <button disabled={proccessingFund} className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessingFund ? "Proccessing..." : "Send Gift"}</button>
                    </div>
                  </div>
                </div>
              </form>
            </AppModal>
          )
        }
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
                <div class="bg-[#F6F6F6] p-2.5  rounded-xl text-left">
                  <div className="relative">
                    <Image src={el?.user?.avatar} alt="" class="rounded-xl w-full h-40 object-cover" width={100} height={100} />
                    {
                      (user?.id !== el?.user?.id) && <div onClick={() => setGiftModal(el)} className='bg-amber-400 cursor-pointer absolute bottom-0 text-xs right-0 rounded-lg text-white p-2'>Send Gift</div>
                    }
                  </div>
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
