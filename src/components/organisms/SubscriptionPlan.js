import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import giftimg from "@asset/Images/giftimg.png"
import thanks from "@asset/Images/thankshand.png"
import { fetchSubscribtions, subscribeUser } from '@/services/authService'
import { useRouter } from 'next/navigation'
import AppModal from './AppModal'
import { FaRegStar } from "react-icons/fa";


function SubscriptionPlan({ text }) {


    const [showModal, setShowModal] = useState(false)
    const [proccessingFund, setProccessingFund] = useState(false)
    const [successModal, setSuccessModal] = useState(false)
    const [errMsg,setErrmsg] = useState('')

    const router = useRouter()

    const subNow = async () => {
        setProccessingFund(true)
        setErrmsg('')
        const { data, status } = await subscribeUser({ amount: 50000 })
        status && setSuccessModal(true)
        !status && setErrmsg(data?.message)
        setShowModal(true)
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
                        <div className="w-full space-y-4">
                            <div>
                                <Image alt="Thank" src={giftimg} width={100} height={100} className="w-2/4 mx-auto pointer-events-none" />
                            </div>
                            <div className="text-center text-sm space-y-5 px-5">
                                <div className='space-y-4 text-xs'>
                                    <div>Welcome to the ultimate subscription-based celebration experience! For just #50,000 naira/month</div>
                                    <div>Your wallet will be charged</div>
                                </div>
                                <div className='text-red-500'>{errMsg}</div>
                                <div>
                                    <div className='font-bold text-4xl text-amber-950'>&#8358;50,000</div>
                                </div>
                            </div>
                            <div>
                                <button onClick={subNow} disabled={proccessingFund} className="flex-grow w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessingFund ? "Proccessing..." : "Make Payment"}</button>
                            </div>
                        </div>
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
                            <div>Users subscribe with a minimum &#8358;50,000 Naira monthly payment, with the flexibility to contribute additional funds to their platform wallet for their chosen celebration. Subscribers enjoy monthly birthday parties, picnics, receive a gift during their celebration from the platform and a 90% payout of their saved funds during their celebration, with the platform retaining 10% as a service fee.</div>
                        </div>
                    </div>
                    <div>
                        <div className='bg-white lg:grid grid-cols-2 gap-5 gap-y-8 p-4 rounded-2xl'>
                            <div className='relative'>
                                <div className='absolute bg-amber-500 px-5 py-1 rounded-md -left-4 text-white '>1</div>
                                <div className='pl-16 space-y-6'>
                                    <div>
                                        <div className='font-bold'>Minimum 50,000 Naira Monthly Subscription</div>
                                        <div className='text-sm'>◦ Requirement: Users pay a minimum of 50,000 Naira per month to join the celebration program.</div>
                                        <div className='text-sm'>◦ Flexibility: Users can contribute additional funds (above 50,000 Naira) to their platform wallet monthly, increasing their savings for their milestone event.</div>
                                        <div className='text-sm'>◦ Purpose: The subscription grants access to exclusive events and the savings payout program, while additional contributions boost their celebration budget.</div>
                                        <div className='text-sm'>◦ Payment: Collected via a secure platform payment system, with all funds (subscription + additional contributions) stored in the user’s wallet.</div>
                                    </div>
                                </div>
                            </div>
                            <div className='relative'>
                                <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>2</div>
                                <div className='pl-16 space-y-6'>
                                    <div>
                                        <div className='font-bold'>6Exclusive Celebration Benefits</div>
                                        <div className='text-sm'>◦ Monthly Birthday Parties: Subscribers celebrating birthdays attend platform-organized bashes with music, food, and community networking.</div>
                                        <div className='text-sm'>◦ Picnics: Monthly or seasonal picnics for all subscribers, featuring games, food stalls, and social activities to foster community.</div>
                                        <div className='text-sm'>◦ Celebration Planning Tools: Access to platform features like vendor connections, customizable invitations, and event planning resources tailored to their milestone.</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='relative col-span-2'>
                                <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>3</div>
                                <div className='pl-16'>
                                    <div className='font-bold'>Savings Payout Program</div>
                                    <div className='text-sm'>◦  How It Works: Users save funds in their platform wallet (minimum 50,000 Naira/month + optional additional contributions) for their chosen celebration.</div>
                                    <div className='text-sm'>◦ Payout Structure: During their celebration month, users receive 90% of the total amount saved in their wallet for that year.</div>
                                    <div className='text-sm'>◦ The platform retains 10% as a service fee to support events and operations.</div>

                                    <div className='mt-3 font-bold'>Example :</div>
                                    <div className='text-sm'>◦ A user subscribes at 50,000 Naira/month (600,000 Naira/year) and adds an extra 20,000 Naira/month (240,000 Naira/year), totaling 840,000 Naira saved.</div>
                                    <div className='text-sm'>◦ During their graduation month, they receive 756,000 Naira (90% of 840,000 Naira), with the platform keeping 84,000 Naira (10%).</div>
                                    <div className='text-sm'>◦ Limit: The 90% payout applies to one celebration per year (birthday, wedding, graduation, or anniversary) to ensure fairness.</div>
                                
                                    <div className='mt-3 font-bold'>User Benefits :</div>
                                    <div className='text-sm'>◦ Flexible Savings: Users can tailor their monthly contributions (50,000 Naira or more) to match their celebration goals, maximizing their payout.</div>
                                    <div className='text-sm'>◦ Premium Experiences: Monthly parties and picnics create memorable, community-driven celebrations.</div>
                                    <div className='text-sm'>◦ Financial Reward: The 90% payout incentivizes saving, providing significant funds for their milestone event.</div>
                                    <div className='text-sm'>◦ Customization: Users choose their milestone and leverage platform tools to plan personalized celebrations.</div>
                                
                                    <div className='mt-3 font-bold'>Platform Benefits :</div>
                                    <div className='text-sm'>◦ Sustainable Revenue: The minimum 50,000 Naira subscription and 10% savings fee ensure steady income to fund events and operations.</div>
                                    <div className='text-sm'>◦ User Engagement: Flexible contributions and exclusive perks encourage long-term participation and loyalty.</div>
                                    <div className='text-sm'>◦ Require a minimum 3-month subscription to qualify for the savings payout, and verify celebration details to prevent misuse.</div>
                                
                                    <div className='mt-3 font-bold'>Sample User Journey :</div>
                                    <div className='text-sm'>◦ Month 1: A user subscribes with 50,000 Naira and adds 30,000 Naira extra (80,000 Naira total), selecting their birthday as their milestone.</div>
                                    <div className='text-sm'>◦ Months 2–12: They contribute 80,000 Naira/month (960,000 Naira total/year), attend two picnics and one birthday party.</div>
                                    <div className='text-sm'>◦ Birthday Month: They receive 864,000 Naira (90% of 960,000 Naira) to fund their celebration, with the platform retaining 96,000 Naira (10%). And gifts from the cash gifts from the platform </div>
                                    <div className='font-bold mt-3'>Automate wallet tracking and payout calculations to handle flexible amounts. </div>
                                    <div className='font-bold mt-3'>Build the reward system interface with flexible contribution options and clear payout visuals.</div>
                                    

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


