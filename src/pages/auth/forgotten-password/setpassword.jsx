'use client'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { setNewPassword } from '@/services/authService'
import AuthLayout from '@/components/layouts/authLayout'
import AppInput from '@/components/organisms/AppInput'
import { RiLockStarFill } from 'react-icons/ri'

function Page() {
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    const confirmOTP = async (e) => {
        const new_password = e.new_password.toString()
        setErrMsg('')

        if (e.new_password === e.code) {
            setProccessing(true)
            const i = {
                email: searchParams.get('em'),
                new_password
            }
            const { status, data } = await setNewPassword(i).catch(err => console.log(err))
            setProccessing(false)
            if (status) {
                router.push('/');
            } else {
                setErrMsg(data.message)
            }
        } else {
            setErrMsg('Password mis-match')
        }

    }


    return (
        <AuthLayout errMsg={errMsg} onSubmit={(e) => confirmOTP(e)} title='Set New Password' subText='Don’t worry you can reset it at ease.' formTitle='Enter New Password' formDes='Please carefully choose your new password'>
            <div className="space-y-7">
                <div className="space-y-3">
                    <div className="space-y-3">
                        <AppInput placeholder="Password" required label='Enter New Password' icon={<RiLockStarFill />} type="password" name='new_password' />
                    </div>
                    <div className="space-y-3">
                        <AppInput placeholder="Password" required label='Confirm New Password' icon={<RiLockStarFill />} type="password" name='code' />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex gap-3">
                        <button disabled={proccessing} className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Save Password"}</button>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Page
