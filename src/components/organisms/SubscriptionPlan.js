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
                    <div className='bg-white grid grid-cols-2 gap-5 gap-y-8 p-4 rounded-2xl'>
                        <div className='relative'>
                            <div className='absolute bg-amber-500 px-5 py-1 rounded-md -left-4 text-white '>1</div>
                            <div className='pl-16 space-y-6'>
                                <div>
                                    <div>11+ Months Subscription(People that subscribed 11 months ago before their celebration)</div>
                                    <div>◦ Cash/Gift Value: #1,000,000 naira (or equivalent in gifts)</div>
                                    <div>◦ Game Show Option: Participate in the Birthday Month Reality Game Show for a chance to win 2,000,000 naira cash + sponsored perks (see below).</div>
                                </div>

                                <div>
                                    <div className='font-bold'>Special Perks:</div>
                                    <div>
                                        <div>▪ Birthday: Sponsored birthday party (venue, cake, entertainment) OR dinner date for two.</div>
                                        <div>▪ Wedding: #1,000,000 naira toward wedding expenses + a romantic getaway voucher.</div>
                                        <div>▪ Graduation: #1,000,000 naira tech bundle (laptop, tablet, etc.) + career coaching session.</div>
                                        <div>▪ Anniversary: #1,000,000 luxury gift basket + couple’s spa day.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>2</div>
                            <div className='pl-16 space-y-6'>
                                <div>
                                    <div>6+ Months Subscription (People that subscribed 6months+ ago before their celebrations)</div>
                                    <div>◦ Cash/Gift Value: #500,000 naira</div>
                                    <div>◦ Game Show Option: Participate for a chance to win #,1,000,000 cash + additional gifts.</div>
                                </div>

                                <div>
                                    <div className='font-bold'>Special Perks:</div>
                                    <div>
                                        <div>▪ Birthday: Sponsored dinner date OR game show dating match (if single).</div>
                                        <div>▪ Wedding: #500,000 naira cash or gift worth.</div>
                                        <div>▪ Graduation: #500,000 naira cash + personalized diploma frame.</div>
                                        <div>▪ Anniversary: #500,000 naira or dining voucher.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>3</div>
                            <div className='pl-16 space-y-6'>
                                <div>
                                    <div>3+ Months Subscription (People that subscribed 3months+ ago before their celebrations)</div>
                                    <div>◦ Cash/Gift Value: #150,000 naira</div>
                                    <div>◦ Game Show Option: Participate for a chance to win #500,000 + assorted gifts.</div>
                                </div>

                                <div>
                                    <div className='font-bold'>Special Perks:</div>
                                    <div>
                                        <div>▪ Birthday: #150,000 naira, gift card + party kit (decor, games).</div>
                                        <div>▪ Wedding: #150,000 naira toward wedding favors.</div>
                                        <div>▪ Graduation: #150,000 naira bookstore voucher.</div>
                                        <div>▪ Anniversary:#150,000 naira, floral arrangement.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <div className='absolute bg-amber-500 px-5 py-1 rounded-md -left-4 text-white '>4</div>
                            <div className='pl-16 space-y-6'>
                                <div>
                                    <div>1+ Month Subscription (People that subscribed 1month+ ago before their celebrations)</div>
                                    <div>◦ Cash/Gift Value: 50,000 naira</div>
                                    <div>◦ Game Show Option: No cash prize, but eligible for fun participation and small gift bags.</div>
                                </div>

                                <div>
                                    <div className='font-bold'>Special Perks:</div>
                                    <div>
                                        Celebration-themed goodie bag (value 50,000 naira).
                                        A Birthday Month Reality Game Show: Concept & Ideas
                                        A monthly live-streamed game show where subscribers celebrating their birthday compete for cash, prizes, and unforgettable experiences! (The game show is only for people living in Lagos)</div>
                                </div>
                            </div>
                        </div>
                        <div className='relative'>
                            <div className='absolute bg-amber-500 px-5 py-1 rounded-md -left-4 text-white '>5</div>
                            <div></div>
                        </div>
                        <div className='relative'>
                            <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>6</div>
                            <div></div>
                        </div>
                        <div className='relative col-span-2'>
                            <div className='absolute bg-amber-700 px-5 py-1 rounded-md -left-4 text-white '>7</div>
                            <div></div>
                        </div>
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
