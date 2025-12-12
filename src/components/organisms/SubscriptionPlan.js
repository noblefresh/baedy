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
                        {/* <div className='bg-white lg:grid grid-cols-2 gap-5 gap-y-8 p-4 rounded-2xl'>
                            <div className='relative'>
                                <div className='absolute bg-amber-500 px-5 py-1 rounded-md -left-4 text-white '>1</div>
                                <div className='pl-16 space-y-6'>
                                    <div className='space-y-3'>
                                        <div className='font-bold'>1. Bronze Tier:</div>
                                        <div className='text-sm'>◦ Monthly Subscription Amount: ₦20,000 or ₦50,000 (users choose one fixed amount per subscription cycle).</div>
                                        <div className='text-sm'>◦ Eligibility Requirement: Consistent monthly subscriptions for at least 3 consecutive months immediately before your birthday month.</div>
                                        <div className='text-sm'>◦ Rewards (Choose one option during your birthday month or any personal celebration):</div>
                                        <div className='text-sm'>◦ Gifts and Shoutouts: Receive birthday gifts from us (e.g., personalized items ) and public birthday shoutouts and showing of your account number across all social media platforms to celebrate you and for people to send you gift money.</div>
                                        <div className='text-sm'>◦ Chance to participate in our monthly birthday picnics, games and party activities and win prices.</div>
                                        <div className='text-sm'>◦ Cashback Alternative: Receive 50% of your total subscription payments for the qualifying 3+ months as a cash gift during your birthday (e.g., if you subscribed ₦50,000/month for 3 months = ₦150,000 total, you’d get ₦75,000 cashback).</div>
                                    </div>
                                </div>
                            </div>
                            <div className='relative'>
                                <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>2</div>
                                <div className='pl-16 space-y-6'>
                                    <div className='space-y-3'>
                                        <div className='font-bold'>2. Silver Tier</div>
                                        <div className='text-sm'>◦ Monthly Subscription Amount: ₦100,000 to ₦200,000 (users choose one fixed amount within this range per subscription cycle).</div>
                                        <div className='text-sm'>◦ Eligibility Requirement: Consistent monthly subscriptions for at least 3 consecutive months immediately before your birthday month.</div>
                                        <div className='text-sm'>◦ Rewards (Choose one option during your birthday month or any personal celebration):</div>
                                        <div className='text-sm'>◦ Events and Shoutouts: Access to an exclusive birthday party or picnic during your birthday month. Plus, enhanced birthday shoutouts across all our social media platforms, encouraging followers to send you gifts or money transfers.</div>
                                        <div className='text-sm'>◦ Cashback Alternative: Receive 50% of your total subscription payments for the qualifying 3+ months as a cash gift during your birthday(e.g., if you subscribed ₦150,000/month for 3 months = ₦450,000 total, you’d get ₦225,000 cashback) and free shoutouts in social media with your account number.</div>
                                    </div>
                                </div>
                            </div>

                            <div className='relative'>
                                <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>3</div>
                                <div className='pl-16 space-y-3'>
                                    <div className='font-bold'>3. Gold Tier</div>
                                    <div className='text-sm'>◦ Monthly Subscription Amount: ₦300,000 to ₦500,000 (users choose one fixed amount within this range per subscription cycle)/</div>
                                    <div className='text-sm'>◦ Eligibility Requirement: Consistent monthly subscriptions for at least 3 consecutive months immediately before your birthday month.</div>
                                    <div className='text-sm'>◦ Rewards (Choose one option during your birthday month or any personal celebration):</div>
                                    <div className='text-sm'>◦ Premium Perks and VIP Access: Receive high-value premium gifts (e.g., gadgets, spa dates, or luxury experiences). Get VIP invitations to a club/birthday party or exclusive picnics/beach access in Lagos during your birthday month. Plus, VIP birthday shoutouts across all our social media platforms, including posting your account details (with your consent) to allow followers to send direct gift money transfers.</div>
                                    <div className='text-sm'>◦ Cashback Alternative: Receive 50% of your total subscription payments for the qualifying 3+ months as a cash gift during your birthday (e.g., if you subscribed ₦400,000/month for 3 months = ₦1,200,000 total, you’d get ₦600,000 cashback) and free shoutouts in social media with your account number.</div>
                                </div>
                            </div>
                            <div className='relative'>
                                <div className='absolute bg-amber-500 px-5 py-1 rounded-md -left-4 text-white '>4</div>
                                <div className='pl-16 space-y-6'>
                                    <div className='space-y-3'>
                                        <div className='font-bold'>4. Diamond Tier</div>
                                        <div className='text-sm'>◦⁠⁠ Monthly Subscription Amount: ₦1,000,000 or more (users choose one fixed amount per subscription cycle).</div>
                                        <div className='text-sm'>◦⁠⁠ Eligibility Requirement: Consistent monthly subscriptions for at least 6 consecutive months immediately before your birthday month or chosen celebration.</div>
                                        <div className='text-sm'>◦⁠⁠ Rewards (Choose one option during your birthday month or any personal celebration):</div>
                                        <div className='text-sm'>◦⁠⁠ Luxury China Experience and VIP Perks: An all-expenses-paid 5-day vacation trip to China, including a business tour to visit factories or scenic destinations in China and a VIP club party invitation at a popular club in Guangzhou, China. Plus, premium VIP birthday shoutouts across all our social media platforms and select major blogs, encouraging followers to wish you a happy birthday and send gift money transfers.</div>
                                        <div className='text-sm'>◦⁠⁠ Cashback Alternative: Receive 50% of your total subscription payments for the qualifying 6+ months as a cash gift during your birthday (e.g., if you subscribed ₦1,000,000/month for 6 months = ₦6,000,000 total, you’d get ₦3,000,000 cashback) and free shoutouts plus VIP access to any monthly picnics/party in Nigeria incase you don’t get the visa to travel to China.</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-2 space-y-4'>
                                <div className='font-bold'>Additional Program Details</div>
                                <div className='space-y-3'>
                                    <div className='text-sm'>◦⁠⁠ <span className='font-bold'>How to Claim Rewards:</span> Eligible users will be notified via email or app 30 days before their birthday or chosen celebration. Choose your reward option (gifts/events vs. cashback) at that time. Cashback is paid via bank transfer or preferred method. For Diamond tier, travel arrangements are coordinated with the user, subject to availability and visa requirements.</div>
                                    <div className='text-sm'>◦⁠⁠ <span className='font-bold'>Terms and Conditions:</span> Subscriptions must be paid in full and on time each month. If a subscription lapses, the eligibility counter (3 or 6 months) resets. Rewards are non-transferable. Event locations for Gold tier are limited to Lagos; Diamond tier travel is limited to China. We reserve the right to modify the program with notice.</div>
                                    <div className='text-sm'>◦⁠⁠ <span className='font-bold'>Why Join?:</span> Celebrate your special day with exclusive rewards, from personalized gifts to luxury international experiences, or opt for generous cashback to make your celebration truly yours!</div>
                                </div>
                            </div>
                        </div> */}

                        <div className='bg-white lg:grid grid-cols-2 gap-5 gap-y-8 p-4 rounded-2xl'>
                            <div className='relative'>
                                <div className='absolute bg-amber-500 px-5 py-1 rounded-md -left-4 text-white '>1</div>
                                <div className='pl-16 space-y-6'>
                                    <div className='space-y-3'>
                                        <div className='font-bold'>1. VIP Tag on Your Profile</div>
                                        <div className='text-sm'>◦ Stand out with a premium VIP badge displayed prominently on your profile on our website platform.                                        .</div>
                                    </div>
                                </div>
                            </div>
                            <div className='relative'>
                                <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>2</div>
                                <div className='pl-16 space-y-6'>
                                    <div className='space-y-3'>
                                        <div className='text-sm'>◦ Send Gift Button on Your Profile Picture, Enable a dedicated “Send Gift” button right on your profile picture, allowing friends to easily send you monetary gifts during your birthday or any celebration.</div>
                                    </div>
                                </div>
                            </div>

                            <div className='relative'>
                                <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>3</div>
                                <div className='pl-16 space-y-3'>
                                    <div className='font-bold'>3. Personalized Birthday Link</div>
                                    <div className='text-sm'>◦ Share a custom birthday link with friends and family to join the fun, celebrate together, and send you gifts seamlessly.</div>
                                </div>
                            </div>
                            <div className='relative'>
                                <div className='absolute bg-amber-500 px-5 py-1 rounded-md -left-4 text-white '>4</div>
                                <div className='pl-16 space-y-6'>
                                    <div className='space-y-3'>
                                        <div className='text-sm'>◦⁠⁠ Monthly Picnic & Party Participation, Get the chance to join our exclusive birthday monthly picnics, games, and party activities—plus opportunities to win exciting prizes</div>
                                    </div>
                                </div>
                            </div>

                            <div className='relative'>
                                <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>5</div>
                                <div className='pl-16 space-y-3'>
                                    <div className='text-sm'>◦ Birthday shoutouts on our website platform and Baedy app and also on social media platforms/blogs(attached with your account number for people to send you birthday gift money wishes) </div>
                                </div>
                            </div>
                            <div className='relative'>
                                <div className='absolute bg-amber-500 px-5 py-1 rounded-md -left-4 text-white '>6</div>
                                <div className='pl-16 space-y-6'>
                                    <div className='space-y-3'>
                                        <div className='text-sm'>◦⁠⁠ Receive a gift from the platform on your birthday or any celebration.</div>
                                    </div>
                                </div>
                            </div>
                            <div className='relative col-span-2'>
                                <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>7</div>
                                <div className='pl-16 space-y-6'>
                                    <div className='space-y-3'>
                                        <div className='font-bold'>7. ⁠Annual Cash Back Reward</div>
                                        <div className='text-sm'>◦⁠⁠ Receive 70% of your subscription/savings money back as cash on your birthday or chosen celebration, once a year. </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-2 space-y-4'>
                                <div className='font-bold'>Additional Program Details</div>
                                <div className='space-y-3'>
                                    <div className='text-sm'>◦⁠⁠ <span className='font-bold'>How to Claim Rewards:</span> Eligible users will be notified via email or the app 30 days before their birthday or chosen celebration. Cashback is paid via bank transfer or preferred method.</div>
                                    <div className='text-sm'>◦⁠⁠ <span className='font-bold'>Terms and Conditions:</span> 50,000 naira minimum monthly subscriptions must be paid in full and on time each month. If a subscription lapses, the eligibility counter (3 months ) resets. Rewards are non-transferable. Those who want to get a larger amount during their birthday or any celebration in a year can subscribe with a big amount above 50,000 naira. For example, if you subscribe with 100,000 naira every month for 12 months till your birthday you will get 840,000 naira, that&apos;s 70% of your 100,000 in 12 months.</div>
                                    <div className='text-sm'>◦⁠⁠ <span className='font-bold'>Why Join?:</span> Celebrate your special day with exclusive rewards, from personalized gifts to luxury experiences, or opt for generous cashback to make your celebration truly yours!</div>
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


