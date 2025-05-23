import AppLayout from '@/components/layouts/appLayout'
import AppInput from '@/components/organisms/AppInput'
import TimeComp from '@/components/organisms/TimeComp'
import { RiBankLine, RiLockStarFill } from "react-icons/ri";
import { AiFillCreditCard } from "react-icons/ai";
import React, { useEffect, useState } from 'react'
import serialize from '@/hooks/Serialize';
import { addBank, fetchAccountName, fetchBank, fetchpayStack, updatePassword } from '@/services/authService';
import { PiBankDuotone } from 'react-icons/pi';
import AppModal from '@/components/organisms/AppModal';
import AppSelect from '@/components/organisms/AppSelect';
import { TbNumber123 } from 'react-icons/tb';
import { FaCircleUser } from 'react-icons/fa6';

function Settings() {


  const [proccessing, setProccessing] = useState(false)
  const [proccessingChangeBtn, setProccessingChangeBtn] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [bankList, setBankList] = useState([])
  const [bank, setBank] = useState([])
  const [errMsg, setErrMsg] = useState("")

  const [bankForm, setBankForm] = useState({
    name: '',
    account_number: '',
    bank_code: '',
    error: ''
  })



  const fetcBankList = async () => {
    const { data, status } = await fetchBank()
    status && setBankList(data?.data);
  }




  const fetchdata = async () => {
    const { data: banks, status: bankStatus } = await fetchpayStack()

    const result = []

    bankStatus && banks?.data?.forEach(el => {
      result.push({ label: el.name, value: el.code })
    });

    setBank(result)
  }



  const addMyBankAccount = async (e) => {
    e.preventDefault()
    setProccessing(true)
    if (bankForm.error === '') {
      bankForm.bank_name = e.target[0].selectedOptions[0].innerHTML
      bankForm.account_name = bankForm.name
      const { data, status } = await addBank(bankForm)
      status && fetcBankList() && setShowFormModal(false);
    }
    setProccessing(false)
  }

  const change = async (e) => {
    e.preventDefault()
    setErrMsg("")
    setProccessingChangeBtn(true)
    const payload = serialize(e.target)
    if (payload.new_password === payload.cpassword) {
      const { data } = await updatePassword(payload)
      if (data?.success) {
        e.target.reset()
      } else {
        setErrMsg(data?.message)
      }

    } else {
      setErrMsg("Password Mis-match, Please check new password and confirm password")
    }
    setProccessingChangeBtn(false)
  }


  const fetchBankInfo = async () => {
    setBankForm(prev => ({ ...prev, error: "" }))
    const { data, status } = await fetchAccountName(bankForm)
    data.status ? setBankForm(prev => ({ ...prev, name: data?.data?.account_name })) : setBankForm(prev => ({ ...prev, error: data?.message }));
  }


  useEffect(() => {
    fetcBankList()
    fetchdata()
  }, [])


  useEffect(() => {
    (bankForm.bank_code !== '' && bankForm.account_number.length === 10) && fetchBankInfo()

  }, [bankForm.account_number, bankForm.bank_code])


  return (

    <AppLayout title="Settings">
      <div className="p-3">
        <TimeComp title="Manage account and security." />
      </div>

      <AppModal mode={showFormModal} withClose={() => setShowFormModal(false)} >
        <form onSubmit={addMyBankAccount} className="space-y-7">
          <div className="font-extrabold text-center text-2xl">Add Account</div>
          <div className="space-y-5">
            {
              bankForm.error && (
                <div className="text-red-500 text-xs">{bankForm.error}</div>
              )
            }
            <div className="md:grid grid-cols-2 gap-4">
              <AppSelect name="bank" label="Bank" icon={<RiBankLine />} onChange={(e) => setBankForm(prev => ({ ...prev, bank_code: e.target.value }))} options={[...bank]} />
              <AppInput placeholder="Account number" name="amount" maxLength={10} onChange={(e) => setBankForm(prev => ({ ...prev, account_number: e.target.value }))} icon={<TbNumber123 />} required label="Account Number" />
              <div className="col-span-2">
                <AppInput placeholder="John Doe" value={bankForm.name} disabled name="amount" icon={<FaCircleUser />} required label="Bank Name" />
              </div>
            </div>

            <div className="">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div onClick={() => { setShowFormModal(false); setBankForm({ name: '', account_number: '', bank_code: '' }) }} className="flex-grow cursor-pointer text-amber-500 border border-amber-500 text-center rounded-lg py-3"> Cancel </div>
                  <button disabled={proccessing} className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Add Account"}</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </AppModal>

      <div className="">
        <div className="p-3 space-y-16">
          <div className="">
            <div className="">
              {
                bankList.length > 0 ? (
                  <div className="space-y-3">
                    <div onClick={() => setShowFormModal(true)} className="text-xs inline-block px-12 text-center cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Add Account</div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {
                        bankList[0].map((data, i) => (
                          <label key={i} className='has-[:checked]:bg-gray-50 has-[:checked]:border-gray-800 cursor-pointer flex items-center gap-3 border border-gray-300/50 backdrop-blur-md rounded-lg p-3'>
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
                  <div className="">
                    <div className="flex flex-col items-center space-y-3 justify-center">
                      <div className="text-7xl text-gray-300"><AiFillCreditCard /></div>
                      <div className="">You currently have no account yet</div>
                      <div className="w-full">
                        <div onClick={() => setShowFormModal(true)} className="text-xs max-w-xs mx-auto text-center cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Add Account</div>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
          <form onSubmit={change} className="space-y-3 bg-gray-200/40 border border-gray-200 p-5 rounded-xl">
            <div className="font-bold">Security</div>
            <div className="text-xs text-red-500">{errMsg}</div>
            <AppInput placeholder="Password" name="old_password" icon={<RiLockStarFill />} required label="Password" type="password" />
            <AppInput placeholder="Password" name="new_password" icon={<RiLockStarFill />} required label="New Password" type="password" />
            <AppInput placeholder="Confirm Password" name="cpassword" icon={<RiLockStarFill />} required label="Confirm Password" type="password" />
            <div className="flex gap-3">
              <button disabled={proccessingChangeBtn} className="px-7 w-full sm:w-auto cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessingChangeBtn ? "Proccessing..." : "Change Password"}</button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}

export default Settings
