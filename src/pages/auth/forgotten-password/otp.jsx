'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import OtpInput from 'react-otp-input';
import { useEffect } from 'react'
import AuthLayout from '@/components/layouts/authLayout'
import { sendOTP, verifyOTP } from '@/services/authService'

function Page() {
    const dispatch = useDispatch()
    const [proccessing, setProccessing] = useState(false)
    const [errMsg, setErrMsg] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()
    const [otp, setOtp] = useState('');
    const [counter, setCounter] = useState(60);
    const user = useSelector(state => state.PerUser)



    const resend = async () => {
        setCounter(60)
        const e = {
            user_id: searchParams.get('uid'),
            email: searchParams.get('em')
        }
        const { status, data } = await sendOTP(e).catch(err => console.log(err))

    }

    const confirmOTP = async (e) => {
        e.otp = otp
        e.email = searchParams.get('em')
        if (otp.length === 4) {
            setProccessing(true)
            const { status, data:res } = await verifyOTP(e).catch(err => console.log(err))
            setProccessing(false)
            if (status) {
                setErrMsg('')
                router.push(`setpassword?em=${e.email}`)

            } else {
                setErrMsg(res.message)
            }
        }
    }


    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);


    return (
        <AuthLayout errMsg={errMsg} onSubmit={(e) => confirmOTP(e)} formTitle='Reset Password' formDes='Enter the 4 digit code sent to your email address' title="Reset Code Sent" subText="Don’t worry you can reset it at ease.">
            <div className="space-y-4">
                <div className="">An OTP have been sent to {searchParams.get('em').split("@")[0].substring(0, 4)}*****@{searchParams.get('em').split("@")[1]}</div>
                <div className="justify-center flex *:gap-4">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        inputType='tel'
                        inputStyle={{
                            border: "1px solid #e3e3e3",
                            borderRadius: "8px",
                            appearance: "none",
                            width: "22%",
                            height: "54px",
                            fontSize: "18px",
                            color: "#000",
                            fontWeight: "400",
                            caretColor: "gray",
                            outline: "none",
                            background: "#f3f4fa00"
                        }}
                        focusStyle={'outline-none ring-0 border border-gray-400'}
                        renderInput={(props) => <input name='otp' {...props} />}
                    />
                </div>
                <div className="space-y-2">
                    <div className="flex gap-3">
                        <button disabled={proccessing} className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Reset Password"}</button>
                    </div>
                </div>
                <div className="text-center space-y-3 flex justify-between items-center select-none">
                    {counter < 1 ? <div className="font-bold cursor-pointer" onClick={resend}>Resend OTP</div> : <div className="text-sm">{counter < 10 && '0'}{counter}s</div>}
                </div>
            </div>
        </AuthLayout>
    )
}

export default Page

