import Image from 'next/image'
import React from 'react'
import { FaBell } from "react-icons/fa6";
import appLogo from "@asset/Images/appLogo.png"
import { useSelector } from 'react-redux';

function TopBar({title}) {

    const user = useSelector((state) => state.User);


    return (
        <div className="flex gap-52 items-center w-full backdrop-blur-3xl bg-gray-200/40 border border-gray-200 p-5 rounded-xl">
            <div><Image alt="logo" src={appLogo} width={35} height={60} /></div>
            <div className="flex-grow flex items-center w-full">
                <div className="flex-grow font-bold">{title}</div>
                <div className="flex items-center gap-3">
                    <div className="text-xl text-gray-500"><FaBell /></div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-200 rounded-full">
                            <Image alt={user?.value?.user?.fname.split("")[0]} src={user?.value?.user?.avatar} />
                        </div>
                        <div className="font-bold text-sm">{user?.value?.user?.fname} {user?.value?.user?.lname}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBar
