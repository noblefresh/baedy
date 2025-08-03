import AppLayout from '@/components/layouts/appLayout'
import CartChip from '@/components/organisms/CartChip'
import CartSum from '@/components/organisms/CartSum'
import TimeComp from '@/components/organisms/TimeComp'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { SlArrowLeft } from 'react-icons/sl'
import { useSelector } from 'react-redux'

function cart() {

    const router = useRouter()

    const cart = useSelector((state) => state?.Cart?.items)


    return (
        <AppLayout active="products" title={(
            <div className='flex items-center divide-x-2 *:px-3'>
                <div className='text-gray-400'>Shop</div>
                <div>Products</div>
            </div>
        )}>

            <div className='md:grid grid-cols-2'>
                <div className='p-3 py-4'>
                    <div onClick={() => router.back()} className='inline-flex cursor-pointer gap-2 items-center'><SlArrowLeft /> Go Back</div>
                </div>
                <div className="p-3">
                    <TimeComp title="Shopping Cart" />
                </div>
            </div>



            {
                cart.length > 0 ? (
                    <div className="px-3 space-y-5">
                        <div className="space-y-5">
                            {
                                cart.map((_, i) => (
                                    <CartChip data={_} key={i} />
                                ))
                            }
                        </div>
                        <div className="md:grid grid-cols-2 gap-4">
                            <div className=""></div>
                            <div className="border bg-gray-100 border-white rounded-lg p-3">
                                <CartSum />
                                <div className="">
                                    <div className="flex gap-3">
                                        <Link href='/products/checkout' className='w-full'>
                                            <button className="flex-grow w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Checkout</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center max-w-sm mx-auto py-24 space-y-5">
                        <div className="text-lg">Your Cart is Empty</div>
                        <button onClick={() => router.replace('/products')} className="flex-grow w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> Start Shopping </button>
                    </div>
                )
            }

        </AppLayout>
    )
}

export default cart