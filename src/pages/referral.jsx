import AppLayout from '@/components/layouts/appLayout'
import ReferralChip from '@/components/organisms/ReferralChip';
import TimeComp from '@/components/organisms/TimeComp';
import React from 'react'

function Referral() {
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
              <table className='w-full text-left'>
                <tr>
                  <th>Reward Earned</th>
                  <th>Reward Date</th>
                </tr>
                <tr>
                  <td><div className="pt-3">&#8358;1,000</div></td>
                  <td>05-04-2025</td>
                </tr>
                <tr>
                  <td><div className="pt-3">&#8358;1,000</div></td>
                  <td>05-04-2025</td>
                </tr>
                <tr>
                  <td><div className="pt-3">&#8358;1,000</div></td>
                  <td>05-04-2025</td>
                </tr>
                <tr>
                  <td><div className="pt-3">&#8358;1,000</div></td>
                  <td>05-04-2025</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-gray-200/40 border space-y-5 border-gray-200 p-5 rounded-xl">
            <div className="font-bold">My referrals</div>
            <div className="">
              <table className='w-full text-left'>
                <tr>
                  <th>Referred User</th>
                  <th>Date Joined</th>
                </tr>
                <tr>
                  <td>
                    <div className="pt-3 flex items-center gap-1">
                      <div className="">
                        <div className="w-8 h-8 rounded-full bg-amber-50"></div>
                      </div>
                      <div className="font-bold text-sm">Tunde Balogun</div>
                    </div>
                  </td>
                  <td>05-04-2025</td>
                </tr>
                <tr>
                  <td>
                    <div className="pt-3 flex items-center gap-1">
                      <div className="">
                        <div className="w-8 h-8 rounded-full bg-amber-50"></div>
                      </div>
                      <div className="font-bold text-sm">Tunde Balogun</div>
                    </div>
                  </td>
                  <td>05-04-2025</td>
                </tr>
                <tr>
                  <td>
                    <div className="pt-3 flex items-center gap-1">
                      <div className="">
                        <div className="w-8 h-8 rounded-full bg-amber-50"></div>
                      </div>
                      <div className="font-bold text-sm">Tunde Balogun</div>
                    </div>
                  </td>
                  <td>05-04-2025</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Referral
