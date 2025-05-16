import AppLayout from '@/components/layouts/appLayout'
import ReferralChip from '@/components/organisms/ReferralChip';
import TimeComp from '@/components/organisms/TimeComp';
import { fetchReferral } from '@/services/authService';
import React, { useEffect, useState } from 'react'

function Referral() {

  const [list, setList] = useState([])

  const fetchList = async () => {
    const { data } = await fetchReferral()
    setList(data?.data);
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (

    <AppLayout title="Referral">
      <div className="p-3">
        <TimeComp title="Invite others and get more rewards." />
      </div>
      <div className="px-4">
        <ReferralChip />
      </div>
      <div className="p-3 lg:grid-cols-2 grid gap-4">
        <div className="">
          <div className="bg-gray-200/40 border space-y-5 border-gray-200 p-5 rounded-xl">
            <div className="font-bold">Referral Rewards</div>
            <div className="">
              {
                list?.refferral_earnings?.length > 0 ? (
                  <table className='w-full text-left'>
                    <tr>
                      <th>Reward Earned</th>
                      <th>Reward Date</th>
                    </tr>
                    {
                      list?.refferral_earnings.map((item, index) => (
                        <tr key={index}>
                          <td><div className="pt-3">&#8358;1,000</div></td>
                          <td>05-04-2025</td>
                        </tr>
                      ))
                    }
                  </table>
                ) : (<div>No rewards yet</div>)
              }

            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-gray-200/40 border space-y-5 border-gray-200 p-5 rounded-xl">
            <div className="font-bold">My referrals</div>
            <div className="">
              {
                list?.referrals?.length > 0 ? (
                  <table className='w-full text-left'>
                    <tr>
                      <th>Referred User</th>
                      <th>Date Joined</th>
                    </tr>
                    {
                      list?.referrals.map((item, index) => (
                        <tr key={index}>
                          <td><div className="pt-3">{item?.fname} {item?.lname}</div></td>
                          <td>05-04-2025</td>
                        </tr>
                      ))
                    }
                  </table>
                ) : (
                  <div className="">No referrals</div>
                )
              }

            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Referral
