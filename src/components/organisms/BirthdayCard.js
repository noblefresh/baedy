import Image from 'next/image'
import React, { useState } from 'react'
import giftimg from "@asset/Images/giftimg.png"
import AppModal from './AppModal'
import { giftUser } from '@/services/authService'
import serialize from '@/hooks/Serialize'
import { useSelector } from 'react-redux'
import { FiStar } from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";

function BirthdayCard({ data, month }) {

    const [giftModal, setGiftModal] = useState(false)
    const [showAmount, setAmount] = useState(false)
    const user = useSelector((state) => state.User?.value?.user)
    const [proccessingFund, setProccessingFund] = useState(false)


    const submit = async (e) => {
        e.preventDefault();
        setProccessingFund(true)
        let payload = serialize(e.target)
        payload.user_id = data?.id
        const { status, data: res } = await giftUser(payload)
        status && setAmount(true) && setAmount(true) && setGiftModal(false)
        setProccessingFund(false)
    }

    const prefix = () => {
        switch (data?.dob.split(" ")[0].split("-")[2].split('')[1]) {
            case '1':
                if (data?.dob.split(" ")[0].split("-")[2].split('')[0] === '1') {
                    return 'th'
                } else {
                    return 'st'
                }
                break;

            case '2':
                if (data?.dob.split(" ")[0].split("-")[2].split('')[0] === '1') {
                    return 'th'
                } else {
                    return 'nd'
                }
                break;
            case '3':
                if (data?.dob.split(" ")[0].split("-")[2].split('')[0] === '1') {
                    return 'th'
                } else {
                    return 'rd'
                }
                break;

            default:
                return 'th'
                break;
        }
    }

    return (

        <>
            <div className='fixed z-50'>
                {
                    showAmount ? (
                        <AppModal mode={showAmount}>
                            <div className="space-y-6 text-center">
                                <div className='text-8xl flex items-center justify-center text-amber-500'><FiStar /></div>
                                <div className='text-xl font-bold'>Gift sent successfully</div>
                                <div className='text-gray-400 text-sm'>Thank You</div>
                                <button onClick={() => { setGiftModal(false); setAmount(false) }} className="flex-grow w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> Done </button>
                            </div>
                        </AppModal>
                    ) : (
                        <AppModal mode={giftModal} withClose={() => { setGiftModal(false); setAmount(false) }} >
                            <form onSubmit={submit}>
                                <div className='space-y-6 text-center'>
                                    <div>
                                        <Image alt="Thank" src={giftimg} width={100} height={100} className="w-2/4 mx-auto pointer-events-none" />
                                    </div>
                                    <div>Please enter the amount to send</div>
                                    <div>
                                        <div className='w-40 items-center justify-center border border-white/50 flex gap-1 rounded-lg p-2 mx-auto font-extrabold text-4xl'>
                                            &#8358;  <input name='amount' required className='w-full outline-0 ring-0 focus-within:outline-0' placeholder='50,000' type='tel' />
                                        </div>
                                    </div>
                                    <div>Receiver: {data.fname} {data.lname}</div>
                                    <div>
                                        <div className="flex gap-3">
                                            <button disabled={proccessingFund} className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessingFund ? "Proccessing..." : "Send Gift"}</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </AppModal>
                    )
                }
            </div>
            <div>
                <div className='bg-gray-100 w-60 space-y-3 rounded-xl p-2.5'>
                    <div className='h-44 rounded-2xl overflow-hidden relative bg-amber-50/40'>
                        <Image alt='user images' src={data.avatar} layout="fill" objectFit="cover" />
                        {
                            (user?.id !== data?.id && data?.subscription?.length > 0 )&& <div onClick={() => setGiftModal(true)} className='bg-amber-400 cursor-pointer absolute bottom-0 text-xs right-0 rounded-lg text-white p-2'>Send Gift</div>
                        }
                    </div>
                    <div className='text-gray-400 space-y-1'>
                        <div className='flex gap-3'>
                            <div>Celebrant</div>
                            <div className='font-bold text-black'>{data.fname} {data.lname} {data?.subscription?.length > 0 && <span className='inline-block relative top-0.5 text-amber-400'><HiBadgeCheck size={17} /></span> }</div>
                        </div>
                        <div className='flex gap-3'>
                            <div>Birthday Date</div>
                            <div className='font-bold text-black'> {data?.dob.split(" ")[0].split("-")[2]}<span className='text-xs relative bottom-1'>{prefix()}</span> {month}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default BirthdayCard
