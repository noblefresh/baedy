import React, { useState } from 'react'
import { FiMinus } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'

function CartChip() {

    const [currentNumber,setNumber] = useState(1)

    const action = (e) => {
        setNumber(e)
    }


    return (
        <div className='md:grid border border-white rounded-lg bg-gray-100 p-4 grid-cols-2 gap-2'>
            <div>
                <div className='flex items-center font-bold gap-2'>
                    <div>
                        <div className='w-32 h-20 rounded-lg bg-amber-100'></div>
                    </div>
                    <div>SmartFit Wireless Earbud</div>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <div className='text-center space-y-4'>
                    <div>QTY</div>
                    <div className='flex items-center gap-2'>
                        <div className={`cursor-pointer p-2 rounded-lg ${currentNumber > 1 && 'bg-white'}`} onClick={() => action(currentNumber > 1 ? currentNumber - 1 : currentNumber)}><FiMinus /></div>
                        <div className='border border-gray-200 rounded-lg px-3 py-1 select-none'>{currentNumber}</div>
                        <div className='cursor-pointer bg-white rounded-lg p-2' onClick={() => action(currentNumber + 1)}><GoPlus /></div>
                    </div>
                </div>
                <div className='text-right space-y-3'>
                    <div className='font-bold text-2xl'>₦25,000</div>
                    <div className='inline-flex border text-xs text-red-500 hover:text-white hover:bg-red-500 cursor-pointer border-red-500 px-3 py-1 rounded-lg'>Remove</div>
                </div>
            </div>
        </div>
    )
}

export default CartChip