import AppLayout from '@/components/layouts/appLayout'
import AppInput from '@/components/organisms/AppInput'
import TimeComp from '@/components/organisms/TimeComp'
import { RiLockStarFill } from "react-icons/ri";
import { AiFillCreditCard } from "react-icons/ai";
import React, { useState } from 'react'

function Settings() {


  const [proccessing, setProccessing] = useState(false)

  return (

    <AppLayout title="Settings">
      <div className="p-3">
        <TimeComp title="Manage account and security." />
      </div>
      <div className="grid grid-cols-5">
        <div className="p-3 col-span-4 space-y-16">
          <div className="">
            <div className="">
              <div className="">
                <div className="flex flex-col items-center space-y-3 justify-center">
                  <div className="text-7xl text-gray-300"><AiFillCreditCard /></div>
                  <div className="">You currently have no account yet</div>
                  <div className="w-full">
                    <div className="text-xs max-w-xs mx-auto text-center cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Add Account</div>
                  </div>
                </div>
              </div>
              <div className=""></div>
            </div>
          </div>
          <form className="space-y-3 bg-gray-200/40 border border-gray-200 p-5 rounded-xl">
            <div className="font-bold">Security</div>
            <AppInput placeholder="Password" name="password" icon={<RiLockStarFill />} required label="Password" type="password" />
            <AppInput placeholder="Password" name="password" icon={<RiLockStarFill />} required label="New Password" type="password" />
            <AppInput placeholder="Confirm Password" name="cpassword" icon={<RiLockStarFill />} required label="Confirm Password" type="password" />
            <div className="flex gap-3">
              <button disabled={proccessing} className="px-7 cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Change Password"}</button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}

export default Settings
