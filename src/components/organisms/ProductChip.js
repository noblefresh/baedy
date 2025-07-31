import Link from 'next/link'
import React from 'react'

function ProductChip() {

    const addToCart = () => {
        console.log('hi');
    }

    return (
        <div className='rounded-lg overflow-hidden bg-gray-50 border border-white'>
            <Link href='products/123'>
                <div>
                    <div className="h-56 profilebg rounded-lg relative">
                    </div>
                </div>
                <div className='font-bold space-y-2 p-3'>
                    <div className='space-y-0'>
                        <div>SmartFit Wireless Earbuds</div>
                        <div>₦25,000</div>
                    </div>
                </div>
            </Link>
            <div className="px-3 pb-3">
                <button onClick={addToCart} className="px-5 cursor-pointer text-xs disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-2">Add To Cart</button>
            </div>
        </div>
    )
}

export default ProductChip