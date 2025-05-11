import SubscriptionPlan from '@/components/organisms/SubscriptionPlan';
import TopBar from '@/components/organisms/TopBar'
import { useRouter } from 'next/router';
import React from 'react'
import { TfiAngleLeft } from "react-icons/tfi";

function SubscriptionDetails() {

    const router = useRouter()

    return (
        <div className="relative">
            <div className="w-96 fixed -top-36 -right-36 h-96 rounded-full bg-orange-400"></div>
            <div className="w-96 fixed  top-72 -left-36 h-96 rounded-full bg-orange-400"></div>
            <div className="w-[60vh] h-[60vh] fixed -bottom-52 right-12 rounded-full bg-orange-400"></div>
            <div className="min-h-screen bg-amber-50/70 z-30 relative backdrop-blur-3xl">
                <div className="p-6 z-20 sticky top-0 w-full">
                    <TopBar title="Welcome Diala 👋" />
                </div>
                <div className="relative px-4">
                    <div onClick={() => router.back()} className="absolute cursor-pointer flex gap-1 items-center top-0 left-12">
                        <TfiAngleLeft /> Go Back
                    </div>
                    <div className="p-3">
                        <SubscriptionPlan />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionDetails
