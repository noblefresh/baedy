import { numberFormat } from '@/hooks/utils';
import { addToCart, clearCart } from '@/Store/reducers/Cart';
import Image from 'next/image';
import Link from 'next/link'
import React, { useState } from 'react'
import { FiMinus } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';

function ProductChip({ data }) {
    const dispatch = useDispatch()
    const [result, setResult] = useState(useSelector((state) => state?.Cart?.items).filter(product => product.id === data?.id)[0])
    

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
        // dispatch(clearCart())
    };

    const deductQty = (e) => {
        const payload = { ...result, qty: e }
        dispatch(addToCart({ ...result, qty: e }));
        setResult(payload)
    }


    return (
        <div className='rounded-lg overflow-hidden bg-gray-50 border border-white'>
            <Link href={`products/${data?.id}`}>
                <div>
                    <div className="h-56 rounded-lg relative">
                        <Image width={100} height={100} className='h-full w-full' src={data?.images[0]} alt='IMG' />
                    </div>
                </div>
                <div className='font-bold space-y-2 p-3'>
                    <div className='space-y-0'>
                        <div>{data?.name}</div>
                        <div>₦{numberFormat(data?.price)}</div>
                    </div>
                </div>
            </Link>
            <div className="px-3 pb-3 flex justify-end">
                {
                    result ? (
                        <div>
                            <div className='flex items-center gap-2'>
                                <div className={`cursor-pointer p-2 rounded-lg ${result.qty > 1 && 'bg-white'}`} onClick={() => deductQty(result.qty > 1 ? result.qty - 1 : 1)}><FiMinus /></div>
                                <div className='border border-gray-200 rounded-lg px-3 py-1 select-none'>{result.qty}</div>
                                <div className='cursor-pointer bg-white rounded-lg p-2' onClick={addToCartFN}><GoPlus /></div>
                            </div>
                        </div>
                    ) : (
                        <button onClick={addToCartFN} className="px-5 cursor-pointer text-xs disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-2">Add To Cart</button>
                    )
                }

            </div>
        </div>
    )
}

export default ProductChip