import SubscriptionPlan from '@/components/organisms/SubscriptionPlan';
import TopBar from '@/components/organisms/TopBar'
import { useRouter } from 'next/router';
import React from 'react'
import { TfiAngleLeft } from "react-icons/tfi";
import { useSelector } from 'react-redux';

function SubscriptionDetails() {

    const router = useRouter()
    const user = useSelector((state) => state.User);


    return (
        <>
            <div className="relative">
                <div className="p-6 z-20 sticky top-0 w-full">
                    <TopBar title={`Welcome ${user?.value?.user?.fname} 👋`} />
                </div>
                <div className="w-96 fixed -top-36 -right-36 h-96 rounded-full bg-orange-400"></div>
                <div className="w-96 fixed  top-72 -left-36 h-96 rounded-full bg-orange-400"></div>
                <div className="w-[60vh] h-[60vh] fixed -bottom-52 right-12 rounded-full bg-orange-400"></div>
                <div className="bg-amber-50/70 h-screen w-screen z-10 top-0 right-0 fixed backdrop-blur-3xl">
                </div>
                <div className='pb-24'>
                    <div className="px-9 relative z-10">
                        <div className="relative md:px-4 pb-3">
                            <div onClick={() => router.back()} className="cursor-pointer flex gap-1 items-center top-0 left-12">
                                <TfiAngleLeft /> Go Back
                            </div>
                        </div>
                        <SubscriptionPlan text="Continue To Subscription" />
                    </div>
                </div>
            </div>
        </>

    )
}

export default SubscriptionDetails
