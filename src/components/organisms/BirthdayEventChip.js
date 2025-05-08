import React from 'react'

function BirthdayEventChip() {
    return (
        <div className='p-1 bg-amber-50/70 flex gap-2 border-gray-50 rounded-xl'>
            <div>
                <div className='w-12 h-10 bg-amber-100 rounded-lg'></div>
            </div>
            <div>
                <div className='text-sm font-bold'>Birthday Month Reality</div>
                <div className='text-xs'>Game Show</div>
            </div>
        </div>
    )
}

export default BirthdayEventChip
