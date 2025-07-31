import AppLayout from '@/components/layouts/appLayout'
import TimeComp from '@/components/organisms/TimeComp'
import { useRouter } from 'next/router'
import React from 'react'
import { SlArrowLeft } from 'react-icons/sl'

function cart() {

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
                    <TimeComp title="Shopping Cart" />
                </div>
            </div>

            <div className=""></div>

        </AppLayout>
    )
}

export default cart