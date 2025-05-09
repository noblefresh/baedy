import AppLayout from '@/components/layouts/appLayout'
import AppInput from '@/components/organisms/AppInput'
import React, { useState } from 'react'
import { MdMail, MdExplore } from "react-icons/md";
import { HiUser } from "react-icons/hi2";
import { ImPhone } from "react-icons/im";
import { FaMap, FaCalendarAlt } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { TfiAngleLeft } from "react-icons/tfi";

function Profile() {

  const [editMode, setEditMode] = useState(false)
  const [proccessing, setProccessing] = useState(false)

  return (

    <AppLayout title="Profile">


      <div className="p-3 space-y-4">
        <div className="">
          {editMode && <div onClick={() => setEditMode(false)} className="flex items-center gap-2 cursor-pointer"><TfiAngleLeft /> Go Back</div>}
          <div className="">
            <div className="h-56 bg-amber-50 rounded-lg"></div>
            <div className=""></div>
          </div>
        </div>
        <div className="space-y-3 bg-white/60 border border-gray-200 p-5 rounded-xl">
          <div className="font-bold">Personal Info</div>
          <div className="grid grid-cols-2 gap-4">
            <AppInput disabled={!editMode} placeholder="e.g Chisomaga" name="fname" required icon={<HiUser />} label="First Name" />
            <AppInput disabled={!editMode} placeholder="e.g Diala" name="lname" required icon={<HiUser />} label="Last Name" />
            <AppInput disabled={!editMode} placeholder="e.g 0901827464" name="phone" required icon={<ImPhone />} label="Phone" />
            <AppInput placeholder="e.g email@gmail.com" name="email" disabled type={'mail'} icon={<MdMail />} required label="Email" />
            <AppInput disabled={!editMode} placeholder="Country" name="country" icon={<FaMap />} required label="Country" />
            <AppInput disabled={!editMode} placeholder="State" name="state" icon={<MdExplore />} required label="State" />
            <AppInput disabled={!editMode} placeholder="City" name="city" icon={<FaMapLocation />} required label="City" />
            <AppInput disabled={!editMode} name="dob" icon={<FaCalendarAlt />} required label="Date of Birth" type={"date"} />
            {
              editMode && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <div className="flex">
                      <div onClick={() => setEditMode(false)} className="px-4 cursor-pointer w-full text-center border border-amber-500 text-amber-500 rounded-lg py-3">Cancel</div>
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <button disabled={proccessing} className="px-7 w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Save Changes"}</button>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>


    </AppLayout>
  )
}

export default Profile
