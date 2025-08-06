import AppLayout from '@/components/layouts/appLayout'
import AppInput from '@/components/organisms/AppInput'
import AppModal from '@/components/organisms/AppModal'
import TimeComp from '@/components/organisms/TimeComp'
import serialize from '@/hooks/Serialize'
import { numberFormat } from '@/hooks/utils'
import { fetchOrders, rateOrder } from '@/services/authService'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FaRegFileAlt } from 'react-icons/fa'
import { FaRegFileLines } from 'react-icons/fa6'
import { PiCityFill } from 'react-icons/pi'
import { toast } from 'sonner'

function Orders() {

    const [myOrders, setMyOrder] = useState([])
    const [review, setReview] = useState({})
    const [proccessing, setProccessing] = useState(false)
    const [rate, setRate] = useState(null)
    


    const fetchOrderFN = async () => {
        const { status, data } = await fetchOrders()
        console.log(data);
        status && setMyOrder(data?.data)
    }


    const postReview = async (e) => {
        e.preventDefault()
        const payload = serialize(e.target)
        payload.rating = rate
        const { status, data } = await rateOrder(payload)
        toast.success(data?.message)
        setReview({})
        setRate(0)
    }

    useEffect(() => {
        fetchOrderFN()
    }, [])


    return (
        <AppLayout active="orders" title='Shop'>
            <div className="p-3">
                <TimeComp title="Orders" />
            </div>

            <AppModal mode={Object.keys(review).length > 0}>
                <form onSubmit={postReview} className='space-y-5'>
                    <input type="hidden" name='product_id' value={review?.product?.id} />
                    <input type="hidden" name='id' value={review?.id} />
                    <div className="font-semibold">Rate Product</div>
                    <div className="space-y-3">
                        <div className="font-semibold text-gray-600 text-sm">Rating</div>
                        <div className="flex *:flex *:items-center *:flex-col *:justify-center justify-between">
                            <div className="" onClick={() => setRate(1)}>
                                <div className="text-3xl text-amber-500">
                                    {
                                        rate >= 1 ? <AiFillStar /> : <AiOutlineStar />
                                    }
                                </div>
                                <div className="">Very Poor</div>
                            </div>
                            <div className="" onClick={() => setRate(2)}>
                                <div className="text-3xl text-amber-500">
                                    {
                                        rate >= 2 ? <AiFillStar /> : <AiOutlineStar />
                                    }
                                </div>
                                <div className="">Poor</div>
                            </div>
                            <div className="" onClick={() => setRate(3)}>
                                <div className="text-3xl text-amber-500">
                                    {
                                        rate >= 3 ? <AiFillStar /> : <AiOutlineStar />
                                    }
                                </div>
                                <div className="">Good</div>
                            </div>
                            <div className="" onClick={() => setRate(4)}>
                                <div className="text-3xl text-amber-500">
                                    {
                                        rate >= 4 ? <AiFillStar /> : <AiOutlineStar />
                                    }
                                </div>
                                <div className="">Very Good</div>
                            </div>
                            <div className="" onClick={() => setRate(5)}>
                                <div className="text-3xl text-amber-500">
                                    {
                                        rate >= 5 ? <AiFillStar /> : <AiOutlineStar />
                                    }
                                </div>
                                <div className="">Excellent</div>
                            </div>
                        </div>
                    </div>
                    <AppInput name='comment' type='textarea' placeholder='Enter Comment' label='Comment' icon={<FaRegFileLines />} />
                    <div className="grid text-xs col-span-1 sm:col-span-2 lg:col-span-1 sm:grid-cols-2 gap-4">
                        <div className="">
                            <div className="flex">
                                <div onClick={() => { setReview({}); setRate(0) }} className="px-4 cursor-pointer w-full text-center border border-amber-500 text-amber-500 rounded-lg py-3">Cancel</div>
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <button disabled={proccessing} className="px-7 w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {proccessing ? "Proccessing..." : "Save Review"}</button>
                            </div>
                        </div>
                    </div>
                </form>
            </AppModal>


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
                                    <button onClick={() => setReview(_)} className="px-7 cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Write a Review </button>
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
                                        <div className="text-sm flex items-center gap-2"> Order <div className={`text-xs px-2 py-1 rounded-sm ${_?.status === 'processing' ? 'bg-yellow-400/30 text-yellow-500' : _?.status === 'in-transit' ? 'bg-blue-400/30 text-blue-500' : _?.status === 'cancelled' ? 'bg-red-400/30 text-red-500' : 'bg-green-400/30 text-green-500'}`}>{_?.status}</div></div>
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