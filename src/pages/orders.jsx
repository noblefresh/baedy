import AppLayout from '@/components/layouts/appLayout'
import TimeComp from '@/components/organisms/TimeComp'
import React from 'react'

function Orders() {
    return (
        <AppLayout active="orders" title='Shop'>
            <div className="p-3">
                <TimeComp title="Orders" />
            </div>

            <div className="px-3 space-y-4">
                {
                    Array.from({ length: 2 }).map((_, i) => (
                        <div className="border border-white divide-y *:p-3 divide-white rounded-lg bg-white/30" key={i}>
                            <div className="md:grid-cols-4 grid gap-4">
                                <div className="">
                                    <div className="font-bold">Order Number</div>
                                    <div className="">SM0019915</div>
                                </div>
                                <div className="">
                                    <div className="font-bold">Date Placed</div>
                                    <div className="">July 10, 2025</div>
                                </div>
                                <div className="">
                                    <div className="font-bold">Total Amount</div>
                                    <div className="">₦26,500</div>
                                </div>
                                <div className="flex justify-end">
                                    <button className="px-7 cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Write a Review </button>
                                </div>
                            </div>
                            <div className="md:grid grid-cols-5">
                                <div className="md:col-span-3 items-center flex gap-5">
                                    <div className="">
                                        <div className="h-32 w-32 rounded-lg overflow-hidden bg-white/40"></div>
                                    </div>
                                    <div className="space-y-7">
                                        <div className="font-bold text-lg">SmartFit Wireless Earbud</div>
                                        <div className="text-sm"> Order In Progress</div>
                                    </div>
                                </div>
                                <div className="md:col-span-2 flex justify-between">
                                    <div className="space-y-5 text-center">
                                        <div className="">QTY</div>
                                        <div className="">1</div>
                                    </div>
                                    <div className="text-xl font-bold">₦22,000</div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </AppLayout>

    )
}

export default Orders