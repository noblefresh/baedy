import { numberFormat } from '@/hooks/utils'
import { addToCart, clearCart, deductQty, removeFromCart } from '@/Store/reducers/Cart'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FiMinus } from 'react-icons/fi'
import { GoPlus } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'

function CartChip({ data }) {


    const dispatch = useDispatch()
    const itemsArray = useSelector((state) => state?.Cart?.items)
    const cart = Object.values(itemsArray)
    const [result, setResult] = useState([])


    const addToCartFN = () => {
        if (result) {
            const payload = { ...result, qty: result.qty + 1 }
            dispatch(addToCart(payload));
            setResult(payload)
        } else {
            const payload = { ...data, qty: 1 }
            dispatch(addToCart(payload));
            setResult(payload)
        }
    };


    const deductQtyFN = (e) => {
        const payload = { ...result, qty: e }
        dispatch(deductQty({ ...result, qty: e }));
        setResult(payload)
    }

    const removeFromCartFN = () => {
        dispatch(removeFromCart(result?.id))
    }


    useEffect(() => {
        setResult(cart.filter(product => product.id === data?.id)[0])
    }, [])


    return (
        <div className='md:grid space-y-3 md:space-y-0 border border-white rounded-lg bg-gray-100 p-4 grid-cols-2 gap-2'>
            <div>
                <div className='flex items-center font-bold gap-2'>
                    <div>
                        <div className='w-32 h-20 rounded-lg overflow-hidden bg-amber-100'>
                            {result?.images?.length > 0 && <Image width={100} height={100} className='h-full w-full' src={result?.images[0]} alt='IMG' />}
                        </div>
                    </div>
                    <div>{result?.name}</div>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <div className='text-center md:space-y-4'>
                    <div>QTY</div>
                    <div className='flex items-center gap-2'>
                        <div className={`cursor-pointer p-2 rounded-lg ${result.qty > 1 && 'bg-white'}`} onClick={() => deductQtyFN(result.qty > 1 ? result.qty - 1 : 1)}><FiMinus /></div>
                        <div className='border border-gray-200 rounded-lg px-3 py-1 select-none'>{result.qty}</div>
                        <div className='cursor-pointer bg-white rounded-lg p-2' onClick={addToCartFN}><GoPlus /></div>
                    </div>
                </div>
                <div className='text-right space-y-3'>
                    <div className='font-bold text-2xl'>₦{numberFormat(result.qty * result?.price)}</div>
                    <div onClick={removeFromCartFN} className='inline-flex border text-xs text-red-500 hover:text-white hover:bg-red-500 cursor-pointer border-red-500 px-3 py-1 rounded-lg'>Remove</div>
                </div>
            </div>
        </div>
    )
}

export default CartChip