import AppLayout from '@/components/layouts/appLayout'
import TimeComp from '@/components/organisms/TimeComp'
import Image from 'next/image'
import cardImg from "@asset/Images/cards.png"
import wallet from "@asset/Images/wallet.png"
import React, { useEffect, useState } from 'react'
import { BsPlusCircleFill } from "react-icons/bs";
import { IoCashOutline } from "react-icons/io5";
import AppModal from '@/components/organisms/AppModal'
import AppInput from '@/components/organisms/AppInput'
import { IoMail } from "react-icons/io5";
import { fetchBank, fetchpayStack, fetchWallet, payment } from '@/services/authService'
import { FaRegFolderOpen } from "react-icons/fa";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbNumber123 } from "react-icons/tb";
import serialize from '@/hooks/Serialize'
import { useRouter } from 'next/navigation'
import { convertToAmPm } from '@/hooks/utils'
import { PiBankDuotone } from 'react-icons/pi'
import AppSelect from '@/components/organisms/AppSelect'
import { FaCircleUser } from 'react-icons/fa6'
import { RiBankLine } from 'react-icons/ri'

function Wallet() {

  const [walletInfo, setWalletInfo] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [addForm, setAddForm] = useState(false)
  const [proccessing, setProccessing] = useState(false)
  const [proccessingFund, setProccessingFund] = useState(false)
  const [showFundModal, setShowFundModal] = useState(false)
  const [bankList, setBankList] = useState([])
  const [bank, setBank] = useState('')



  const router = useRouter()

  const fetchdata = async () => {
    const { data, status } = await fetchWallet()
    setWalletInfo(data?.data);

    const { data: banks, status: bankStatus } = await fetchpayStack()

    const result = []

    bankStatus && banks?.data?.forEach(el => {
      result.push({ label: el.name, value: el.code })
    });

    setBank(result)
  }


  const fetcBankList = async () => {
    const { data, status } = await fetchBank()
    status && setBankList(data?.data);
  }


  const pay = async (e) => {
    e.preventDefault()
    setProccessingFund(true)
    const payload = serialize(e.target)
    const { data, status } = await payment(payload)
    router.push(data.data.data.authorization_url, '_blank', 'noopener,noreferrer')
    setProccessingFund(false)
  }

  useEffect(() => {
    fetchdata()
    fetcBankList()
  }, [])


  return (
    <>
      <AppModal mode={showModal} withClose={() => { setShowModal(false); setAddForm(false) }}>


        {
          addForm ? (
            <form className="space-y-7">
              <div className="font-extrabold text-center text-2xl">Add Account</div>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <AppSelect name="bank" label="Bank" icon={<RiBankLine />} options={[...bank]} />
                  <AppInput placeholder="Account number" name="amount" icon={<TbNumber123 />} required label="Account Number" />
                  <div className="col-span-2">
                    <AppInput placeholder="John Doe" disabled name="amount" icon={<FaCircleUser />} required label="Bank Name" />
                  </div>
                </div>

                <div className="">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div onClick={() => { setAddForm(false) }} className="flex-grow cursor-pointer text-amber-500 border border-amber-500 text-center rounded-lg py-3"> Cancel </div>
                      <button disabled={proccessing} className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Add Account"}</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <form className="space-y-7">
              <div className="font-extrabold text-center text-2xl">Withdraw Funds</div>
              <div className="space-y-5">
                {
                  bankList[0]?.length > 0 ? (
                    <div className="space-y-3">
                      <div className="font-bold">Select Bank</div>
                      <div>
                        {
                          bankList[0].map((data, i) => (
                            <label key={i} className='has-[:checked]:bg-gray-50 has-[:checked]:border-gray-800 cursor-pointer flex items-center gap-3 border border-gray-300 rounded-lg p-3'>
                              <input type="radio" value={data.id} name="bank_id" required class="opacity-0 absolute" />
                              <div className="">
                                <div className='bg-white shadow-md h-10 w-10 sm:h-14 sm:w-14 rounded-full flex items-center justify-center'>
                                  <PiBankDuotone />
                                </div>
                              </div>
                              <div>
                                <div className='font-semibold text-sm sm:text-base'>{data.account_name}</div>
                                <div className='flex flex-wrap items-center text-xs sm:text-sm gap-1'>
                                  <div>{data.account_number}</div>
                                  <div className='w-1 h-1 rounded-full bg-black'></div>
                                  <div>{data.bank_name}</div>
                                </div>
                              </div>
                            </label>
                          ))
                        }
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="flex">
                        <div onClick={() => setAddForm(true)} className="px-4 text-xs cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Add Account</div>
                      </div>
                      <div className="text-xs text-center">Please enter the amount and bank details below to withdraw funds.</div>
                    </div>
                  )
                }

                <div className="">
                  <AppInput placeholder="Min. 1000" name="amount" icon={<IoMail />} required label="Withdrawal Amount" />
                </div>

                <div className="">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <button disabled={proccessing} className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Make Withdrawal"}</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )
        }
      </AppModal>


      <AppModal mode={showFundModal} withClose={() => { setShowFundModal(false) }}>
        <form onSubmit={pay} className="space-y-7">
          <div className="font-extrabold text-center text-2xl">Fund Account</div>
          <div className="space-y-5">
            <div className="">
              <AppInput placeholder="Min. 1000" name="amount" icon={<BiMoneyWithdraw />} type="number" required label="Enter Amount" />
            </div>
            <div className="">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <button disabled={proccessingFund} className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessingFund ? "Proccessing..." : "Make Payment"}</button>
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
                <div className="font-extrabold text-5xl text-white">&#8358;{
                  walletInfo?.wallet?.balance != null
                    ? new Intl.NumberFormat('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    }).format(walletInfo?.wallet.balance)
                    : '0.00'
                }</div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-gray-50/50 flex gap-4 border-gray-50 p-3 rounded-xl">
                <div onClick={() => setShowFundModal(true)} className="text-center flex items-center justify-center flex-col gap-2 cursor-pointer bg-amber-300/10 px-9 rounded-md py-5 ">
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
                {
                  walletInfo?.transactions?.length > 0 ? (
                    <table className='w-full gap-2 text-left'>
                      <thead>
                        <tr>
                          <th> <div className='w-32'> Type</div></th>
                          <th> <div className='w-32 lg:w-52'> Amount</div></th>
                          <th> <div className='w-32 lg:w-52'> Date</div></th>
                          <th> <div className='w-32 lg:w-52'> Time</div></th>
                          <th> <div className='w-24 lg:w-44'> Status</div></th>
                        </tr>
                      </thead>

                      <tbody>
                        {
                          walletInfo?.transactions?.map(ex => (
                            <tr key={ex.id} className="text-xs">
                              <td className='pt-4'>
                                <div className=''>
                                  <div className="font-bold capitalize">{ex.type}</div>
                                  <div className="">ID: {ex.transaction_id}</div>
                                </div>
                              </td>
                              <td>&#8358;{
                                new Intl.NumberFormat('en-US', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2
                                }).format(ex?.amount)
                              }</td>
                              <td>{ex.created_at.split('T')[0]}</td>
                              <td>{convertToAmPm(ex.created_at.split('T')[1].split('.')[0])}</td>
                              <td>
                                <div className={`text-xs ${ex.status === "success" ? "text-green-500 bg-green-300/30" : "text-red-500 bg-red-300/30"} px-3 py-1 inline rounded-md`}>{ex.status}</div>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center justify-center h-52">
                      <div className="text-2xl"><FaRegFolderOpen /></div>
                      <div className="">No transactions yet</div>
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

export default Wallet
