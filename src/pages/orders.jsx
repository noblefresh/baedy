import AppLayout from '@/components/layouts/appLayout'
import TimeComp from '@/components/organisms/TimeComp'
import { numberFormat } from '@/hooks/utils'
import { fetchOrders } from '@/services/authService'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function Orders() {

    const [myOrders, setMyOrder] = useState([])


    const fetchOrderFN = async () => {
        const { status, data } = await fetchOrders()
        console.log(data);
        status && setMyOrder(data?.data)
    }

    useEffect(() => {
        fetchOrderFN()
    }, [])


    return (
        <AppLayout active="orders" title='Shop'>
            <div className="p-3">
                <TimeComp title="Orders" />
            </div>

            <div className="px-3 space-y-4">
                {
                    myOrders.map((_, i) => (
                        <div className="border border-white divide-y *:p-3 divide-white rounded-lg bg-white/30" key={i}>
                            <div className="md:grid-cols-4 grid gap-4">
                                <div className="">
                                    <div className="font-bold">Order Number</div>
                                    <div className="">{_?.order_id}</div>
                                </div>
                                <div className="">
                                    <div className="font-bold">Date Placed</div>
                                    <div className="">{_?.created_at.split('T')[0]}</div>
                                </div>
                                <div className="">
                                    <div className="font-bold">Total Amount</div>
                                    <div className="">₦{numberFormat(_?.price)}</div>
                                </div>
                                <div className="flex justify-end">
                                    <button className="px-7 cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Write a Review </button>
                                </div>
                            </div>
                            <div className="md:grid grid-cols-5">
                                <div className="md:col-span-3 items-center flex gap-5">
                                    <div className="-space-y-28">
                                        <div className="h-32 w-32 shadow-md border rounded-lg overflow-hidden bg-white/40">
                                            <Image alt='#' src={_?.product?.images[0]} width={100} height={100} className='w-full h-full' />
                                        </div>
                                    </div>
                                    <div className="space-y-7">
                                        <div className="font-bold text-lg">{_?.product?.name}</div>
                                        <div className="text-sm flex items-center gap-2"> Order <div className={`text-xs px-2 py-1 rounded-sm ${_?.status === 'processing' ? 'bg-yellow-400/30 text-yellow-500' :_?.status === 'in-transit'? 'bg-blue-400/30 text-blue-500' : _?.status === 'cancelled' ? 'bg-red-400/30 text-red-500' : 'bg-green-400/30 text-green-500'}`}>{_?.status}</div></div>
                                    </div>
                                </div>
                                <div className="md:col-span-2 flex justify-between">
                                    <div className="space-y-5 text-center">
                                        <div className="">QTY</div>
                                        <div className="">{_?.qty}</div>
                                    </div>
                                    <div className="text-xl font-bold">₦{numberFormat(_?.product?.price)}</div>
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