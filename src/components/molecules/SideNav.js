import React from 'react'
import img from "../../../public/images/party_icon.png"
import Image from 'next/image'
import AppLink from '../organisms/AppLink'
import { FaCalendarAlt, FaUserAlt, FaCog } from "react-icons/fa";
import { PiWalletFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BsFillGridFill } from "react-icons/bs";
import { IoIosCard } from "react-icons/io";
import { ImExit } from "react-icons/im";


function SideNav() {
    return (
        <div className='px-5 py-2 h-full'>
            <div className='flex flex-col h-full  bg-gray-50/80 border border-gray-200 overflow-hidden rounded-xl'>
                <div className='flex-grow'>
                    <div className='space-y-4'>
                        <div>
                            <AppLink
                                text={"Home"}
                                icon={<BsFillGridFill />}
                            />
                            <AppLink
                                text={"Birthday Event"}
                                icon={<FaCalendarAlt />}
                            />
                            <AppLink
                                text={"Wallet"}
                                icon={<PiWalletFill />}
                            />
                            <AppLink
                                text={"Subscriptions"}
                                icon={<IoIosCard />}
                            />
                            <AppLink
                                text={"Referral"}
                                icon={<HiMiniUserGroup />}
                            />
                            <AppLink
                                text={"Profile"}
                                icon={<FaUserAlt />}
                            />
                        </div>
                        <div className="divition"></div>
                        <div>
                            <AppLink
                                text={"Settings"}
                                icon={<FaCog />}
                            />
                            <div className='flex cursor-pointer px-3 py-2 items-center gap-1'>
                                <ImExit />
                                <div>Log Out</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=''>
                    <Image alt='img' src={img} className='w-full' />
                </div>
            </div>
        </div>
    )
}

export default SideNav
