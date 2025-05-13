import AppLayout from '@/components/layouts/appLayout'
import TimeComp from '@/components/organisms/TimeComp'
import Image from 'next/image'
import cardImg from "@asset/Images/cards.png"
import wallet from "@asset/Images/wallet.png"
import React, { useState } from 'react'
import { BsPlusCircleFill } from "react-icons/bs";
import { IoCashOutline } from "react-icons/io5";
import AppModal from '@/components/organisms/AppModal'
import AppInput from '@/components/organisms/AppInput'
import { IoMail } from "react-icons/io5";

function Wallet() {

  const [showModal, setShowModal] = useState(false)
  const [addForm, setAddForm] = useState(false)
  const [proccessing, setProccessing] = useState(false)

  return (
    <>
      <AppModal mode={showModal} withClose={() => { setShowModal(false); setAddForm(false) }}>
        <form className="space-y-7">
          <div className="font-extrabold text-center text-2xl">Withdraw Funds</div>
          <div className="space-y-5">
            <div className="flex">
              <div onClick={() => setAddForm(true)} className="px-4 text-xs cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Add Account</div>
            </div>
            <div className="text-xs text-center">Please enter the amount and bank details below to withdraw funds.</div>
            <div className="">
              <AppInput placeholder="Min. 1000" name="amount" icon={<IoMail />} required label="Withdrawal Amount" />
            </div>
            {
              addForm && (
                <div className="grid grid-cols-2 gap-4">
                  <AppInput placeholder="902920819" name="amount" icon={<IoMail />} required label="Bank Account Number" />
                  <AppInput placeholder="John Doe" name="amount" icon={<IoMail />} required label="Account Name" />
                  <AppInput placeholder="Savings Account" name="amount" icon={<IoMail />} required label="Account Type" />
                  <AppInput placeholder="Opay" name="amount" icon={<IoMail />} required label="Bank Name" />
                </div>
              )
            }

            <div className="">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <button disabled={proccessing} className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Make Withdrawal"}</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </AppModal>
      <AppLayout title="Wallet">

        <div className="p-3">
          <TimeComp title="Manage balances, view rewards, and fund your celebration experience." />
        </div>
        <div className="px-3">
          <div className="max-w-3xl mx-auto border bg-gray-50/50 space-y-5 border-gray-50 p-3 rounded-xl">
            <div className="h-72 overflow-hidden relative bg-gradient-to-bl rounded-xl from-amber-600 via-amber-500 to-amber-500">
              <Image alt='card' src={cardImg} className='absolute bottom-20 -right-40' width={300} height={300} />
              <Image alt='card' src={cardImg} className='absolute top-32 -left-36' width={300} height={300} />
              <div className="w-full gap-3 items-center justify-center flex flex-col h-full z-10 relative bg-amber-500/60">
                <div className="">
                  <div className="w-20 h-20 border-8 border-amber-400 rounded-full overflow-hidden">
                    <Image alt='card' src={wallet} className='h-full w-full' width={300} height={300} />
                  </div>
                </div>
                <div className="text-white text-lg font-extralight">Balance</div>
                <div className="font-extrabold text-5xl text-white">&#8358;200,000</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gray-50/50 flex gap-4 border-gray-50 p-3 rounded-xl">
                <div className="text-center flex items-center justify-center flex-col gap-2 cursor-pointer bg-amber-300/10 px-9 rounded-md py-5 ">
                  <div className="text-amber-600 text-3xl text-center"><BsPlusCircleFill /></div>
                  <div className="">Fund Wallet</div>
                </div>
                <div onClick={() => setShowModal(true)} className="text-center flex items-center justify-center flex-col gap-2 cursor-pointer bg-amber-300/10 px-9 rounded-md py-5 ">
                  <div className="text-blue-600 text-3xl text-center"><IoCashOutline /></div>
                  <div className="">Withdraw Fund</div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className=" border bg-gray-50/50 space-y-5 border-gray-50 p-3 rounded-xl">
              <div className="font-bold">Transactions</div>
              <div className="overflow-x-auto">
                <table className='w-full gap-2 text-left'>
                  <thead>
                    <th> <div  className='w-32'> Type</div></th>
                    <th> <div  className='w-32 lg:w-52'> Amount</div></th>
                    <th> <div  className='w-32 lg:w-52'> Date</div></th>
                    <th> <div  className='w-32 lg:w-52'> Time</div></th>
                    <th> <div  className='w-24 lg:w-44'> Status</div></th>
                  </thead>

                  <tbody>
                    <tr className="text-xs">
                      <td className='pt-4'>
                        <div className=''>
                          <div className="font-bold">Withdrawal</div>
                          <div className="">ID: 1234567</div>
                        </div>
                      </td>
                      <td>&#8358;50,000</td>
                      <td>16-04-2025</td>
                      <td>10:47 am</td>
                      <td>
                        <div className="text-xs text-red-500 px-3 py-1 inline rounded-md bg-red-300/30">Pending</div>
                      </td>
                    </tr>

                    <tr className="text-xs">
                      <td className='pt-4'>
                        <div>
                          <div className="font-bold">Withdrawal</div>
                          <div className="">ID: 1234567</div>
                        </div>
                      </td>
                      <td>&#8358;50,000</td>
                      <td>16-04-2025</td>
                      <td>10:47 am</td>
                      <td>
                        <div className="text-xs text-green-500 px-3 py-1 inline rounded-md bg-green-300/30">Completed</div>
                      </td>
                    </tr>

                    <tr className="text-xs">
                      <td className='pt-4'>
                        <div>
                          <div className="font-bold">Withdrawal</div>
                          <div className="">ID: 1234567</div>
                        </div>
                      </td>
                      <td>&#8358;50,000</td>
                      <td>16-04-2025</td>
                      <td>10:47 am</td>
                      <td>
                        <div className="text-xs text-red-500 px-3 py-1 inline rounded-md bg-red-300/30">Pending</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  )
}

export default Wallet
