import { numberFormat } from '@/hooks/utils'
import { removeFromCart } from '@/Store/reducers/Cart'
import React from 'react'
import { useDispatch } from 'react-redux'

function CheckoutChip({ data }) {

    const dispatch = useDispatch()

    const removeFromCartFN = () => {
        dispatch(removeFromCart(result?.id))
    }

    return (
        <div className='flex border border-white rounded-lg bg-gray-100 p-3'>
            <div className='flex-auto'></div>
            <div className='flex gap-5'>
                <div className='text-center space-y-2'>
                    <div>QTY</div>
                    <div>1</div>
                </div>
                <div className='text-right space-y-3'>
                    <div className='font-bold text-2xl'>₦{numberFormat(data?.qty * data?.price)}</div>
                    <div onClick={removeFromCartFN} className='inline-flex border text-xs text-red-500 hover:text-white hover:bg-red-500 cursor-pointer border-red-500 px-3 py-1 rounded-lg'>Remove</div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutChip