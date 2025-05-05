'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import AuthLayout from '@/components/layouts/authLayout'
import AppInput from '@/components/organisms/AppInput'
import { Applogin } from '@/services/authService'
import { SignInAuth } from '@/hooks/Auth'
import { MdMail } from "react-icons/md";
import { RiLockStarFill } from "react-icons/ri";

function Page() {
    const dispatch = useDispatch()
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()

    const login = async (e) => {
        setProccessing(true)
        const { status, data } = await Applogin(e).catch(err => console.log(err))
        setProccessing(false)
        if (status) {
            setErrMsg('')
            SignInAuth(data, dispatch)
            router.push("/")
            window !== "undefined" && window.location.reload()
        } else {
            setErrMsg(data.message)
        }
    }


    return (
        <AuthLayout errMsg={errMsg} onSubmit={(e) => login(e)} formTitle="login" formDes="Please log in to continue celebrating your moments" title={"Welcome Back"} subText={"We're so glad to see you again 🎈"}>
            <AppInput placeholder="email@gmail.com" name="email" icon={<MdMail />} required label="Email" />
            <AppInput placeholder="Password" name="password" icon={<RiLockStarFill />} required label="Password" type="password" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex-grow">
                    <AppInput type="checkbox" name="remember" label="remember me" />
                </div>
                <Link href="forgotten-password" className="text-sm font-bold underline text-amber-600 hidden sm:block">Forgot Password?</Link>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="flex gap-3">
                        <button disabled={proccessing} className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Log In"}</button>
                    </div>
                    <div className=""><Link href="forgotten-password" className="text-sm font-bold underline text-amber-600 sm:hidden">Forgot Password?</Link></div>
                </div>
            </div>
            <div className="">New User? <Link href="register" className="text-amber-600 font-bold capitalize underline">sign Up</Link> </div>
        </AuthLayout>
    )
}

export default Page