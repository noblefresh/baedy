import AuthLayoutX from '@/components/layouts/authLayoutX'
import React from 'react'
import { PiShootingStarBold } from "react-icons/pi";
import Link from 'next/link';

function Accountverification() {


    return (
        <AuthLayoutX title={"Email Verified"} subText={"Your celebration journey starts here 🎉 Let’s make every moment magical starting now!"}>
            <div className="space-y-5">
                <div className="text-9xl flex items-center justify-center text-amber-600"><PiShootingStarBold /></div>
                <div className="text-center font-semibold text-xl">success</div>
                <div className="flex gap-3">
                    <Link href="/" replace className='w-full'>
                        <div className={`flex-grow w-full cursor-pointer text-center shadow-md bg-amber-500 text-white rounded-lg py-3`}>Continue to Dashboard</div>
                    </Link>
                </div>
            </div>
        </AuthLayoutX>
    )
}

export default Accountverification
