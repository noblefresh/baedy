import AppLayout from '@/components/layouts/appLayout'
import BirthdayMateAccord from '@/components/molecules/BirthdayMateAccord'
import AppModal from '@/components/organisms/AppModal'
import BirthdayEventChip from '@/components/organisms/BirthdayEventChip'
import TimeComp from '@/components/organisms/TimeComp'
import { fetchBirthdays } from '@/services/authService'
import Link from 'next/link'
import { LuFileBadge } from "react-icons/lu";
import React, { useEffect, useState } from 'react'

function BirthdayEvent() {

  const [list, setList] = useState([])
  const [eventData, setEventData] = useState([])
  const [showContactModal, setShowContactModal] = useState(false)

  const fetchBirthdayList = async () => {
    const { data, status } = await fetchBirthdays()


    const newArr = status && Object.entries(data?.data?.birthdays)
    setEventData(data?.data?.events)
    setList(newArr)
  }

  useEffect(() => {
    fetchBirthdayList()
  }, [])


  return (
    <>
      <AppModal mode={showContactModal} withClose={() => setShowContactModal(false)}>
        <div className='space-y-9'>
          <div className="">
            <div className='text-7xl text-amber-600 flex justify-center'><LuFileBadge /></div>
            <div className='font-extrabold text-2xl text-center'>Celebrate Event</div>
          </div>
          <div className="text-sm text-center px-6">
            To celebrate other events like Weddings, Graduations, and Wedding Anniversaries, send an email to us with all necessary infomations about the event.
          </div>
          <Link href='mailto:someone@example.com'>
            <div className="px-4 text-xs text-center cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Contact Via Email</div>
          </Link>
        </div>
      </AppModal>
      <AppLayout active="birthday_event" title="All User Birthday Event">
        <div className="p-3">
          <TimeComp title="Let’s celebrate the moments that matter most." />
        </div>
        <div className="p-3 space-y-4">
          <div className='flex md:justify-end'> <div onClick={() => setShowContactModal(true)} className="px-4 text-xs cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Celebate Other Events</div></div>
          {
            eventData?.length > 0 && (<div className="p-3 border space-y-5 bg-gray-50/40 border-gray-50 rounded-xl">
              <div className="font-bold text-sm">Birthday Events</div>

              <div className="grid  sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {
                  eventData?.map((e, i) => <BirthdayEventChip data={e} key={i} />)
                }
              </div>

            </div>
            )
          }
          {
            list.length > 0 && list.map((e) => <BirthdayMateAccord sideText={<div className='font-bold'>Birthdays</div>} data={e} key={e} />)
          }
        </div>
      </AppLayout>
    </>
  )
}

export default BirthdayEvent
