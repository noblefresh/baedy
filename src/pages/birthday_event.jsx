import AppLayout from '@/components/layouts/appLayout'
import BirthdayMateAccord from '@/components/molecules/BirthdayMateAccord'
import BirthdayEventChip from '@/components/organisms/BirthdayEventChip'
import TimeComp from '@/components/organisms/TimeComp'
import React from 'react'

function BirthdayEvent() {
  return (
    <AppLayout title="All User Birthday Event">
      <div className="p-3">
        <TimeComp title="Let’s celebrate the moments that matter most." />
      </div>
      <div className="p-3 space-y-4">
        <div className="p-3 border space-y-5 bg-gray-50/40 border-gray-50 rounded-xl">
          <div className="font-bold text-sm">Birthday Events</div>
          <div className="grid grid-cols-4 gap-4">
            {
              ["", "", "", ""].map((e, i) => <BirthdayEventChip key={i} />)
            }
          </div>
        </div>

        {
          ["May","June","July","August","September","October"].map((e) => <BirthdayMateAccord data={e} key={e} /> )
        }
      </div>
    </AppLayout>
  )
}

export default BirthdayEvent
