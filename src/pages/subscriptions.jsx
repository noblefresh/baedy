import AppLayout from '@/components/layouts/appLayout'
import TimeComp from '@/components/organisms/TimeComp'
import Image from 'next/image'
import cardImg from "@asset/Images/cardSlide.png"
import wallet from "@asset/Images/money3D.png"
import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaRegFolderOpen } from "react-icons/fa";
import { fetchSubscribtions } from '@/services/authService'

function Subscriptions() {

  const [subscription, setSubscription] = useState({})

  const fetchSubscribtionInfo = async () => {
    const { data, status } = await fetchSubscribtions()
    status && setSubscription(data?.data);
  }


  useEffect(() => {
    fetchSubscribtionInfo()
  }, [])


  return (
    <>
      <AppLayout title="Subscriptions">
        <div className="p-3">
          <TimeComp title="Manage your celebration access plan." />
        </div>
        <div className="px-3">
          <div className="max-w-3xl mx-auto border bg-gray-50/50 space-y-5 border-gray-50 p-3 rounded-xl">
            <div className="h-96 overflow-hidden relative bg-gradient-to-br rounded-xl from-amber-950 from-30% via-amber-500 to-amber-300">
              <Image alt='card' src={cardImg} className='absolute bottom-24 -right-40' width={500} height={500} />
              <Image alt='card' src={cardImg} className='absolute top-20 -left-44' width={500} height={500} />
              <div className="w-full gap-4 items-center justify-center flex flex-col h-full z-10 relative bg-amber-800/80">
                <div className="">
                  <div className="w-20 h-20 border-8 border-white rounded-full overflow-hidden">
                    <Image alt='card' src={wallet} className='h-full w-full' width={300} height={300} />
                  </div>
                </div>
                <div className="text-white text-lg font-extralight">Active Subscription</div>
                <div className="flex items-center justify-center">
                  <div className="text-amber-400 border text-4xl border-amber-300 font-bold rounded-lg py-2 px-16">{subscription?.count_active_subscriptions}</div>
                </div>
                { subscription?.expires_in > 0 ? <div className="text-white">Expires in {subscription?.expires_in} days.</div> : <div className="text-white">No Active Subscription</div>}
                <div className="flex items-center">
                  <div className="px-4 text-xs cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Renew Subscription</div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className=" border bg-gray-50/50 space-y-5 border-gray-50 p-3 rounded-xl">
              <div className="font-bold">Subscription History</div>
              <div className=" overflow-x-auto">
                {
                  subscription.subscriptions.length > 0 ? (
                    <table className='w-full gap-2 text-left'>
                      <tr>
                        <th><div className="w-44">Events</div></th>
                        <th><div className="w-32">Amount</div></th>
                        <th><div className="w-44">Payment Method</div></th>
                        <th><div className="w-24">Date</div></th>
                        <th><div className="w-24">Time</div></th>
                        <th><div className="">Status</div></th>
                      </tr>
                      {
                        subscription.subscriptions.map((item, index) => (
                          <tr key={index} className="text-xs">
                            <td className='pt-4'>
                              <div className='flex items-center  gap-2'>
                                <div className="">
                                  <div className="w-9 h-9 bg-amber-400/30 text-amber-400 rounded-full flex items-center justify-center"><FaCalendarAlt /></div>
                                </div>
                                <div className="font-bold">Renewed Plan</div>
                              </div>
                            </td>
                            <td>&#8358;50,000</td>
                            <td>Wallet</td>
                            <td>16-04-2025</td>
                            <td>10:47 am</td>
                            <td>
                              <div className="text-xs text-red-500 px-3 py-1 inline rounded-md bg-red-300/30">Pending</div>
                            </td>
                          </tr>
                        ))
                      }
                    </table>
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center justify-center h-52">
                      <div className="text-2xl"><FaRegFolderOpen /></div>
                      <div className="">No subscription yet</div>
                    </div>
                  )
                }

              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  )
}

export default Subscriptions
