import AppLayout from '@/components/layouts/appLayout'
import TimeComp from '@/components/organisms/TimeComp';
import React from 'react'
import { FaCopy } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";

function Referral() {
  return (

    <AppLayout title="Referral">
      <div className="p-3">
        <TimeComp title="Invite others and get more rewards." />
      </div>
      <div className="px-4">
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
      <div className="p-3 grid-cols-2 grid gap-4">
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
