import Image from 'next/image'
import React, { useState } from 'react'
import AppModal from './AppModal'
import { convertToAmPm } from '@/hooks/utils';

function BirthdayEventChip({ data }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <AppModal mode={showModal} withClose={() => setShowModal(false)}>
                <div className='text-sm space-y-4'>
                    <div className='h-44 rounded-lg overflow-hidden bg-amber-50'>
                        <Image lazyRoot lazyBoundary src={data?.image} alt='Img' width={100} height={100} className='h-full rounded-lg w-full' />
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div>
                            <div className='font-bold'>Host</div>
                            <div className='text-gray-600'>{data?.host}</div>
                        </div>
                        <div>
                            <div className='font-bold'>Title</div>
                            <div className='text-gray-600'>{data?.title}</div>
                        </div>
                        <div>
                            <div className='font-bold'>Event Date</div>
                            <div className='text-gray-600'>{data?.event_date.split(' ')[0]}</div>
                        </div>
                        <div>
                            <div className='font-bold'>Start Time</div>
                            <div className='text-gray-600'>{convertToAmPm(data?.event_start_time)}</div>
                        </div>
                        <div>
                            <div className='font-bold'>End Time</div>
                            <div className='text-gray-600'>{convertToAmPm(data?.event_end_time)}</div>
                        </div>
                        <div className='col-span-2'>
                            <div className='font-bold'>Venue</div>
                            <div className='text-gray-600'>{data?.venue}</div>
                        </div>
                        <div className='col-span-2'>
                            <div className='font-bold'>Description</div>
                            <div className='text-gray-600'>{data?.description}</div>
                        </div>
                    </div>
                </div>
            </AppModal>
            <div onClick={() => setShowModal(true)} className='p-1 cursor-pointer bg-amber-50/70 flex gap-2 border-gray-50 rounded-xl'>
                <div>
                    <div className='w-12 h-10 bg-amber-100 overflow-hidden rounded-lg'>
                        <Image lazyRoot lazyBoundary src={data?.image} alt='Img' width={100} height={100} className='h-full w-full' />
                    </div>
                </div>
                <div>
                    <div className='text-sm font-bold'>{data?.title}</div>
                    <div className='text-xs'>Host: {data?.host}</div>
                </div>
            </div>
        </>
    )
}

export default BirthdayEventChip
