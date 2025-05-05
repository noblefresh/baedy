import AuthLayoutX from '@/components/layouts/authLayoutX'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PiShootingStarBold } from "react-icons/pi";
import { sendOTP, verifyOTP } from '@/services/authService';
import OtpInput from 'react-otp-input';

function Accountverification() {

  const dispatch = useDispatch()
  const [proccessing, setProccessing] = useState(false)
  const [proccessingOTP, setProccessingOTP] = useState(false)
  const [errMsg, setErrMsg] = useState(false)
  const router = useRouter()
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(60);
  const user = useSelector((state) => state.User);

  const confirmOTP = async (e) => {
    e.otp = otp
    e.email = user?.value?.user?.email
    if (otp.length === 4) {
      setProccessingOTP(true)
      const { status, data } = await verifyOTP(e).catch(err => console.log(err))
      setProccessingOTP(false)
      if (status) {
        setErrMsg('')
        router.replace(`success`)
      } else {
        setErrMsg(data.message)
      }
    }else{
      setErrMsg("Please enter OTP")
    }
  }

  const requestOTP = async () => {
    setShowOTP(true)
  }




  const resend = async () => {
    setCounter(60)
    const e = {
      user_id: user?.value?.user?.id,
      email: user?.value?.user?.email
    }
    const { status, data } = await sendOTP(e).catch(err => console.log(err))
  }



  useEffect(() => {
    counter > 0 && showOTP && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter, showOTP]);






  return (
    <AuthLayoutX errMsg={errMsg} formTitle={showOTP && "Verify Your Email"} formDes={showOTP && "Enter the 4 digit code sent to your email address"} onSubmit={(e) => confirmOTP(e)} title={showOTP ? "Email Verification" : "Account Created"} subText={"Your celebration journey starts here 🎉 Let’s make every moment magical starting now!"}>

      {
        showOTP ? (
          <div className="">
            <div className="space-y-4">
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
              <div className="space-y-3 select-none flex gap-1">
                Didn`t receive code?
                {counter < 1 ? <div className="font-bold cursor-pointer text-amber-500" onClick={resend}>Resend OTP</div> : <div className="font-bold text-amber-600">{counter < 10 && '0'}{counter}s</div>}
              </div>
              <div className="space-y-2">
                <div className="flex gap-3">
                  <button disabled={proccessingOTP} className="flex-grow disabled:bg-amber-500/35 shadow-md cursor-pointer bg-amber-500 text-white rounded-lg py-3"> {proccessingOTP ? "Proccessing..." : "Verify"}</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="text-9xl flex items-center justify-center text-amber-600"><PiShootingStarBold /></div>
            <div className="text-center font-semibold text-xl">Please verify your  email</div>
            <div className="flex gap-3">
              <div disabled={proccessing} onClick={requestOTP} className={`flex-grow cursor-pointer text-center ${proccessing && "cursor-none bg-amber-500/35 "} shadow-md bg-amber-500 text-white rounded-lg py-3`}> {proccessing ? "Proccessing..." : "Verify Email"}</div>
            </div>
          </div>
        )
      }



    </AuthLayoutX>
  )
}

export default Accountverification
