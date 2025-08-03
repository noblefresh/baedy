import Image from 'next/image'
import React from 'react'
import { FaBell } from "react-icons/fa6";
import appLogo from "@asset/Images/appLogo.png"
import { useSelector } from 'react-redux';
import { HiBars3BottomRight } from "react-icons/hi2";
import Link from 'next/link';
import { IoMdCart } from 'react-icons/io';

function TopBar({ title, toggleNaav }) {

    const user = useSelector((state) => state.User);
    const cart = useSelector((state) => state?.Cart?.items)

    return (
        <div className="flex gap-52 items-center w-full backdrop-blur-3xl bg-gray-200/40 border border-gray-200 p-2 md:p-5 rounded-xl">
            <div><Image alt="logo" src={appLogo} className='h-10 w-10' width={5} height={6} /></div>
            <div className="flex-grow flex items-center w-full">
                <div className="flex-grow font-bold"><span className='hidden md:block'>{title}</span></div>
                <div className="flex items-center gap-3">
                    <Link href='/products/cart'>
                        <div className="text-xl text-gray-500 relative">
                            {cart.length > 0 && <div className='text-[8px] absolute -right-2 bottom-2 py-0.5 px-1.5 text-center bg-red-500 text-white rounded-full'>{cart.length}</div>}
                            <IoMdCart />
                        </div>
                    </Link>
                    <div className="text-xl text-gray-500"><FaBell /></div>
                    <div className="flex items-center gap-3">
                        <Link href="/profile">
                            <div className="w-7 sm:w-10 h-7 sm:h-10 overflow-hidden bg-amber-200 rounded-full">
                                <Image alt={user?.value?.user?.fname.split("")[0]} width={100} height={100} className='w-full h-full' src={user?.value?.user?.avatar} />
                            </div>
                        </Link>
                        <div className="hidden md:block font-bold text-xs sm:text-sm">{user?.value?.user?.fname} {user?.value?.user?.lname}</div>
                        <div onClick={() => toggleNaav()} className='h-8 w-8 border md:hidden flex items-center justify-center text-xl border-gray-300 rounded-sm cursor-pointer'>
                            <HiBars3BottomRight />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar
