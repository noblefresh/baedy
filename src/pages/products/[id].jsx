import AppLayout from '@/components/layouts/appLayout'
import TimeComp from '@/components/organisms/TimeComp'
import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import { CgShoppingCart } from 'react-icons/cg';
import { GoStarFill } from "react-icons/go";
import { SlArrowLeft } from "react-icons/sl";

function index() {

    const router = useRouter()

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
                    <TimeComp title="Products" />
                </div>
            </div>
            <div className="flex justify-end p-3">
                <Link href='/products/cart'>
                    <div className="flex py-2 px-3 rounded-lg text-white bg-amber-500 gap-2 items-center">
                        <CgShoppingCart /> View Cart
                    </div>
                </Link>
            </div>
            <div className='px-3 space-y-4'>
                <div className='md:grid grid-cols-3 gap-4 space-y-4 border border-white rounded-xl md:space-y-0 bg-gray-100 p-3'>
                    <div>
                        <div className="h-96 w-full rounded-xl bg-amber-50"></div>
                    </div>
                    <div className='col-span-2 space-y-5'>
                        <div className='font-bold'>
                            <div className='text-sm'>Product Name:</div>
                            <div className='text-4xl'>SmartFit Wireless Earbud</div>
                        </div>
                        <div className='font-bold'>
                            <div className='text-sm'>Price:</div>
                            <div className='text-4xl'>₦25,000</div>
                        </div>
                        <div>
                            <div className='text-sm font-bold'>Product Description:</div>
                            <div>
                                Sleek, noise-cancelling earbuds with a 20-hour battery life and intuitive touch controls. Designed for comfort and a secure fit, they deliver crisp, immersive sound quality for music, calls, and videos. Features include a compact charging case, fast pairing, and sweat-resistant design — perfect for workouts, travel, or everyday use.
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-7">
                                <div className="">
                                    <div className="flex">
                                        <div className="px-4 cursor-pointer w-full text-center border border-amber-500 text-amber-500 rounded-lg py-3">Add To Cart</div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="">
                                        <button className="px-7 w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:grid grid-cols-3 gap-4 space-y-4 p-3'>
                    <div className="">
                        <div className='border p-3 border-white rounded-xl md:space-y-0 bg-gray-100'>
                            <div className="font-bold text-xl">Customer Reviews</div>
                            <div className="flex items-center gap-1">
                                <div className="text-amber-500 flex items-center gap-1"><GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill /></div>
                                <div className="text-gray-200 flex items-center gap-1"><GoStarFill /></div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2 space-y-6'>
                        {
                            Array.from({ length: 5 }).map((_, i) => (
                                <div className="space-y-3">
                                    <div className="flex gap-1 items-center">
                                        <div className="">
                                            <div className="w-12 h-12 rounded-full bg-amber-50"></div>
                                        </div>
                                        <div className="">
                                            <div className="font-bold">Emily Selman</div>
                                            <div className="flex items-center gap-1">
                                                <div className="text-amber-500 flex items-center gap-1"><GoStarFill /><GoStarFill /><GoStarFill /><GoStarFill /></div>
                                                <div className="text-gray-200 flex items-center gap-1"><GoStarFill /></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm italic">This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </AppLayout>
    )
}

export default index