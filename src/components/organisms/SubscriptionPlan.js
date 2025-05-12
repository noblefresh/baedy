import Image from 'next/image'
import React from 'react'
import thanks from "@asset/Images/thankshand.png"

function SubscriptionPlan() {
    return (
        <div className="max-w-7xl mx-auto bg-gray-200/40 border space-y-5 border-gray-200 p-5 rounded-xl">
            <div>
                <Image alt="Thank" src={thanks} width={100} height={100} className="w-44 mx-auto pointer-events-none" />
            </div>
            <div className='space-y-7'>
                <div className='space-y-4'>
                    <div>Welcome to the ultimate subscription-based celebration experience! For just #20,000 naira/month, subscribers unlock exclusive rewards, picnics, cash prizes, gifts, and a chance to shine on the Birthday Month Reality Game Show or celebrate life&apos;s big moments Birthdays, Weddings, Graduations, and Wedding Anniversaries. The longer you&apos;re subscribed before your celebration, the bigger the rewards!</div>
                    <div>
                        <div className='font-bold'>Subscription Tiers & Rewards</div>
                        <div>Rewards scale based on how many months you&apos;ve been subscribed before your celebration date. Proof of celebration (e.g., birth certificate, wedding invite, diploma, anniversary photo) is required for non-birthday events.</div>
                    </div>
                </div>
                <div>
                    <div className='bg-white p-4 rounded-2xl h-96'>

                    </div>
                </div>
                <div>
                    <div className="flex justify-center items-center gap-7">
                        <div className="">
                            <div className="flex">
                                <div className="px-4 cursor-pointer w-full text-center border border-amber-500 text-amber-500 rounded-lg py-3">Cancel</div>
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <button className="px-7 w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Continue To Renew</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>







        </div>
    )
}

export default SubscriptionPlan
