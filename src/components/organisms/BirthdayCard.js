import React from 'react'

function BirthdayCard() {
    return (
        <div className='bg-gray-100 space-y-3 rounded-xl p-2.5'>
            <div className='h-44 rounded-2xl overflow-hidden relative bg-amber-50/40'>
                <div className='bg-amber-400 absolute bottom-0 text-xs right-0 rounded-lg text-white p-2'>Send Gift</div>
            </div>
            <div className='text-gray-400 space-y-1'>
                <div className='flex gap-3'>
                    <div>Celebrant</div>
                    <div className='font-bold text-black'>Michael Joe</div>
                </div>
                <div className='flex gap-3'>
                    <div>Birthday Date</div>
                    <div className='font-bold text-black'>28-04-2025</div>
                </div>
            </div>
        </div>
    )
}

export default BirthdayCard
