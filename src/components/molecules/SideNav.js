import React from 'react'
import img from "@asset/Images/sideimg.png"
import Image from 'next/image'
import AppLink from '../organisms/AppLink'
import { FaCalendarAlt, FaUserAlt, FaCog } from "react-icons/fa";
import { PiWalletFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BsFillGridFill } from "react-icons/bs";
import { IoIosCard } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { SignOut } from '@/hooks/Auth';
import { GiShoppingBag } from "react-icons/gi";
import { IoStorefrontOutline } from 'react-icons/io5';


function SideNav({ active }) {
    const dispatch = useDispatch()
    const router = useRouter()

    const siOut = () => {
        SignOut(dispatch)
        router.push("/")
    }

    return (
        <div className='md:px-5 md:py-2 h-full'>
            <div className='flex flex-col h-full bg-gray-50/80 border backdrop-blur-lg border-gray-200 overflow-hidden rounded-xl'>
                <div className='flex-grow'>
                    <div className='space-y-4'>
                        <div>
                            <AppLink
                                active={active}
                                text={"Home"}
                                icon={<BsFillGridFill />}
                            />
                            <AppLink
                                active={active}
                                text={"Birthday Event"}
                                icon={<FaCalendarAlt />}
                            />
                            <AppLink
                                active={active}
                                text={"Wallet"}
                                icon={<PiWalletFill />}
                            />
                            <AppLink
                                active={active}
                                text={"Subscriptions"}
                                icon={<IoIosCard />}
                            />
                            <AppLink
                                active={active}
                                text={"Referral"}
                                icon={<HiMiniUserGroup />}
                            />
                            <AppLink
                                active={active}
                                text={"Profile"}
                                icon={<FaUserAlt />}
                            />
                        </div>
                        <div className="divition"></div>
                        <div>
                            <div className='p-3'>Shop</div>
                            <div>
                                <AppLink
                                    active={active}
                                    text={"Products"}
                                    icon={<IoStorefrontOutline />}
                                />
                                <AppLink
                                    active={active}
                                    text={"Orders"}
                                    icon={<GiShoppingBag />}
                                />
                            </div>
                        </div>
                        <div className="divition"></div>
                        <div>
                            <AppLink
                                active={active}
                                text={"Settings"}
                                icon={<FaCog />}
                            />
                            <div onClick={siOut} className='flex cursor-pointer px-3 py-2 text-gray-500 items-center gap-1'>
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
