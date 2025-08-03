import { numberFormat } from '@/hooks/utils'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function CartSum() {
    const [sum, setSum] = useState(0)
    const cart = useSelector((state) => state?.Cart?.items)

    const getSum = () => {
        let sm = 0
        cart.forEach(element => {
            sm += (element.qty * element.price)
        });
        setSum(sm)
    }



    useEffect(() => {
        getSum()
    }, [])


    return (
        <div>
            <div className="divide-y divide-gray-300">
                <div className="flex items-center justify-between py-4">
                    <div className="">Subtotal</div>
                    <div className="font-bold text-2xl">₦{numberFormat(sum)}</div>
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="">Shipping</div>
                    <div className="font-bold text-2xl">₦1,000</div>
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="">Tax</div>
                    <div className="font-bold text-2xl">₦500</div>
                </div>
                <div className="flex items-center justify-between py-4">
                    <div className="font-bold text-lg">Order Total</div>
                    <div className="font-bold text-2xl">₦26,500</div>
                </div>
            </div>
        </div>
    )
}

export default CartSum