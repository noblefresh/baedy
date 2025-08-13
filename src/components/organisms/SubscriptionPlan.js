import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import giftimg from "@asset/Images/giftimg.png"
import thanks from "@asset/Images/thankshand.png"
import { fetchSubscribtions, subscribeUser } from '@/services/authService'
import { useRouter } from 'next/navigation'
import AppModal from './AppModal'
import { FaRegStar } from "react-icons/fa";

import axios from 'axios';
import AppInput from './AppInput'
import serialize from '@/hooks/Serialize'


function SubscriptionPlan({ text }) {


    const [showModal, setShowModal] = useState(false)
    const [proccessingFund, setProccessingFund] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [errMsg, setErrmsg] = useState('')
    const [inpVal, setInpVal] = useState(1)

    const router = useRouter()

    const subNow = async (e) => {
        e.preventDefault()
        const payload = serialize(e.target)
        setProccessingFund(true)
        setErrmsg('')
        if (payload?.amount >= 20000) {
            const { data, status } = await subscribeUser(payload)
            status && setSuccessModal(true)
            !status && setErrmsg(data?.message)
            setShowModal(true)
        } else {
            setErrmsg('Low subscription amount. Amount should be above #20,000 ')
        }

        setProccessingFund(false)
    }


    const goBack = () => {
        router.back()
    }


    return (
        <div>

            {
                successModal ? (
                    <AppModal mode={showModal} >
                        <div className="w-full space-y-7">
                            <div className='text-amber-500 flex items-center justify-center text-8xl'>
                                <FaRegStar />
                            </div>
                            <div className="text-center text-sm space-y-5 px-5">
                                <div className='space-y-4 text-xs'>
                                    <div className='font-bold text-2xl'>Your subscription is successful</div>
                                    <div>You can now enjoy full package</div>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => router.push("/")} className="flex-grow w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> Continue to Dashboard</button>
                            </div>
                        </div>
                    </AppModal>
                ) : (
                    <AppModal withClose={() => setShowModal(false)} mode={showModal} >
                        <form onSubmit={subNow} className="w-full space-y-4">
                            <div>
                                <Image alt="Thank" src={giftimg} width={100} height={100} className="w-2/4 mx-auto pointer-events-none" />
                            </div>
                            <div className="text-center text-sm space-y-5 px-5">
                                <div className='space-y-4 text-xs'>
                                    <div>Welcome to the ultimate subscription-based celebration experience! from just &#8358;20,000 and above per month</div>
                                    <div>Your wallet will be charged</div>
                                </div>
                                <div className='text-red-500'>{errMsg}</div>
                                <div>

                                    <AppInput
                                        onChange={(e) => {
                                            if (!/[0-9]/.test(e.key) &&
                                                e.key !== 'Backspace' &&
                                                e.key !== 'Delete' &&
                                                e.key !== 'Tab' &&
                                                e.key !== 'ArrowLeft' &&
                                                e.key !== 'ArrowRight') {
                                                if (inpVal === 0 && e.target?.value) {
                                                    setInpVal(e.target?.value.split('')[1])
                                                } else {
                                                    e.target?.value !== '' ? setInpVal(e.target?.value) : (e.target?.value.length < 1 && setInpVal(inpVal.length > 0 ? 0 : inpVal))
                                                }
                                                e.preventDefault();
                                            }
                                        }}
                                        type='number' value={inpVal} required name='amount' icon={<div className='font-bold text-2xl absolute -top-2'> &#8358;</div>} />
                                </div>
                            </div>
                            <div>
                                <button disabled={proccessingFund} className="flex-grow w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessingFund ? "Proccessing..." : "Make Payment"}</button>
                            </div>
                        </form>
                    </AppModal>
                )
            }
            <div className="lg:max-w-[85%] mx-auto bg-gray-200/40 border space-y-5 border-gray-200 p-5 rounded-xl">
                <div>
                    <Image alt="Thank" src={thanks} width={100} height={100} className="w-44 mx-auto pointer-events-none" />
                </div>
                <div className='space-y-7'>
                    <div className='space-y-4'>
                        <div>Our platform redefines milestone celebrations—birthdays, weddings, graduations, and anniversaries—through a subscription-based program that offers exclusive events and financial rewards.</div>
                        <div>
                            <div className='font-bold'>Subscription Tiers & Rewards</div>
                            {/* <div>Users subscribe with a minimum &#8358;50,000 Naira monthly payment, with the flexibility to contribute additional funds to their platform wallet for their chosen celebration. Subscribers enjoy monthly birthday parties, picnics, receive a gift during their celebration from the platform and a 90% payout of their saved funds during their celebration, with the platform retaining 10% as a service fee.</div> */}
                        </div>
                    </div>
                    <div>
                        <div className='bg-white lg:grid grid-cols-2 gap-5 gap-y-8 p-4 rounded-2xl'>
                            <div className='relative'>
                                <div className='absolute bg-amber-500 px-5 py-1 rounded-md -left-4 text-white '>1</div>
                                <div className='pl-16 space-y-6'>
                                    <div className='space-y-3'>
                                        <div className='font-bold'>1. Bronze (#20,000-50,000 naira /month):</div>
                                        <div className='text-sm'>◦ ⁠birthday gift from us.</div>
                                        <div className='text-sm'>◦⁠⁠ Birthday shoutouts across all of our platforms to let people send you gift money during your birthday.</div>
                                    </div>
                                </div>
                            </div>
                            <div className='relative'>
                                <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>2</div>
                                <div className='pl-16 space-y-6'>
                                    <div className='space-y-3'>
                                        <div className='font-bold'>Silver (100,000–200,000 naira/monthly)</div>
                                        <div className='text-sm'>◦ ⁠birthday and party celebrations access each month.</div>
                                        <div className='text-sm'>◦ ⁠⁠birthday gifts (e.g., custom cakes, money gift)</div>
                                        <div className='text-sm'>◦ birthday shoutouts across all our platforms for people to send you gifts money(your account number will be posted along)</div>
                                    </div>
                                </div>
                            </div>

                            <div className='relative'>
                                <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>3</div>
                                <div className='pl-16 space-y-3'>
                                    <div className='font-bold'>Gold(300k above/naira monthly  )</div>
                                    <div className='text-sm'>(users must have subscriped for over 3 months in advance to receive the benefits)</div>
                                    <div className='text-sm'>◦ Premium gifts during your birthday or any celebrations in a year (e.g., tech gadgets, spa dates)</div>
                                    <div className='text-sm'>◦ Personalized birthday/celebration planning for you during your birthday or any celebration.</div>
                                    <div className='text-sm'>◦ VIP club/ birthday party invitations during your birthday month.</div>
                                    <div className='text-sm'>◦ VIP picnics/beach Access in Lagos during your birthday month.</div>
                                    <div className='text-sm'>◦ Users in other cities will receive premium gifts and spa or VIP hair cuts in any location during their birthday or any celebrations</div>
                                    <div className='text-sm'>◦ VIP birthday shoutouts and posting your account number accross all our platforms in social media to let people send you  gift money.</div>
                                </div>
                            </div>
                            <div className='relative'>
                                <div className='absolute bg-amber-500 px-5 py-1 rounded-md -left-4 text-white '>4</div>
                                <div className='pl-16 space-y-6'>
                                    <div className='space-y-3'>
                                        <div className='font-bold'> ⁠Daimond Level. ( 1million naira above/monthly):</div>
                                        <div>(users must have subscribed for 6 months in advance before their birthday to receive the benefits)</div>
                                        <div className='text-sm'>◦ All expense trip to China for vacation during your birthday or any celebrations for 5days.</div>
                                        <div className='text-sm'>◦⁠⁠ business tour in China to visit factories or visit to scenic places in China.</div>
                                        <div className='text-sm'>◦⁠⁠ VIP club party invitation at a popular big club in China Guangzhou.</div>
                                        <div className='text-sm'>◦⁠⁠ VIP Picnic/beach party access</div>
                                        <div className='text-sm'>◦⁠⁠ Big VIP birthday shoutouts across all our pages and platforms to let people wish you happy and send you money gift.</div>
                                        <div className='text-sm'>◦⁠⁠ ⁠⁠Birthday or any celebration shoutout in any popular blogs on Instagram (if you want)</div>
                                        <div className='text-sm'>◦⁠⁠ ⁠Premium birthday gifts from us.</div>
                                        <div className='text-sm'>◦⁠⁠ in the case you couldn’t make it to China during your birthday month we will send you 50% of your subscribed money/your saved money in the wallet on our website during your birthday)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-center items-center gap-7">
                            <div className="">
                                <div className="flex">
                                    <div onClick={goBack} className="px-4 cursor-pointer w-full text-center border border-amber-500 text-amber-500 rounded-lg py-3">Cancel</div>
                                </div>
                            </div>
                            <div className="">
                                <div className="">
                                    <button onClick={() => setShowModal(true)} className="px-7 w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">{text}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SubscriptionPlan


