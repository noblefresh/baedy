'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { registerAPI } from '@/services/authService'
import AuthLayout from '@/components/layouts/authLayout'
import AppInput from '@/components/organisms/AppInput'
import { MdMail, MdExplore } from "react-icons/md";
import { RiLockStarFill } from "react-icons/ri";
import { HiUser } from "react-icons/hi2";
import { ImPhone } from "react-icons/im";
import { FaMap, FaCalendarAlt } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { SignInAuth } from '@/hooks/Auth'


function Page() {
    const dispatch = useDispatch()
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()

    const searchParams = useSearchParams()


    const register = async (e) => {
        setProccessing(true)
        setErrMsg('')
        if (e.cpassword === e.password) {
            const { status, data } = await registerAPI(e).catch(err => console.log(err))
            if (status) {
                setErrMsg('')
                SignInAuth(data, dispatch)
                router.push("accountverification")
            } else {
                setErrMsg(data?.message)
            }
        } else {
            setErrMsg('Password mis-match')
        }
        setProccessing(false)
    }


    return (
        <AuthLayout errMsg={errMsg} onSubmit={(e) => register(e)} title={"Welcome To Baedy"} subText={`Your celebration journey starts here 🎉 Let’s make every moment magical starting now!`} formDes="To unlock unforgettable birthday experiences, exclusive game shows, and multi-celebration plans made just for you." formTitle="Sign Up">
            <AppInput placeholder="e.g Chisomaga" name="fname" required icon={<HiUser />} label="First Name" />
            <AppInput placeholder="e.g Diala" name="lname" required icon={<HiUser />} label="Last Name" />
            <AppInput placeholder="e.g 0901827464" name="phone" required icon={<ImPhone />} label="Phone" />
            <AppInput placeholder="e.g email@gmail.com" name="email" type={'mail'} icon={<MdMail />} required label="Email" />
            <div className="grid gap-4 grid-cols-2">
                <AppInput placeholder="Country" name="country" icon={<FaMap />} defaultValue="Nigeria" disabled required label="Country" />
                <AppInput placeholder="State" name="state" icon={<MdExplore />} required label="State" />
            </div>
            <input type="hidden" name='referral_code' value={searchParams.get('referral_code') ? searchParams.get('referral_code') : '' } />
            <AppInput placeholder="City" name="city" icon={<FaMapLocation />} required label="City" />
            <AppInput name="dob" icon={<FaCalendarAlt />} required label="Date of Birth" type={"date"} />
            <AppInput placeholder="Password" name="password" icon={<RiLockStarFill />} required label="Password" type="password" />
            <AppInput placeholder="Confirm Password" name="cpassword" icon={<RiLockStarFill />} required label="Confirm Password" type="password" />
            <div className="space-y-4">
                <div className="flex gap-3">
                    <button disabled={proccessing} className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Sign Up"}</button>
                </div>
            </div>
            <div className="">Already have an account? <Link href="login" className="font-bold underline text-amber-600">Login</Link> </div>
        </AuthLayout>
    )
}

export default Page