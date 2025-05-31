'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AuthLayout from '@/components/layouts/authLayout'
import { sendOTP } from '@/services/authService'
import { MdMail } from "react-icons/md"
import AppInput from '@/components/organisms/AppInput'

function Page() {
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()


    const sendMail = async (e) => {
        setProccessing(true)
        const { status, data } = await sendOTP(e).catch(err => console.log(err))
        setProccessing(false)
        if (status) {
            setErrMsg('')
            router.push(`forgotten-password/otp?em=${e.email}`)
        } else {
            setErrMsg(data?.message)
        }
    }


    return (
        <AuthLayout errMsg={errMsg} onSubmit={(e) => sendMail(e)} title={"Forgotten Password"} subText={"Don’t worry you can reset it at ease."} formTitle="Reset Password" formDes="Please reset code will be send to your registered email">
            <div className="space-y-7">
                
                <div className="space-y-3">
                    <AppInput placeholder="email@gmail.com" name="email" icon={<MdMail />} required label="Email" />
                </div>
                <div className="space-y-2">
                    <div className="flex gap-3">
                        <button disabled={proccessing} className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Send Code"}</button>
                    </div>
                </div>
                <div className="text-center">Don&apos;t have an account? <Link href="register" className="font-extrabold text-amber-600">sign Up</Link> </div>
            </div>
        </AuthLayout>
    )
}

export default Page