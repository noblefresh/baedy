import { numberFormat } from '@/hooks/utils'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function CartSum() {
    const [sum, setSum] = useState(0)
    const itemsArray = useSelector((state) => state?.Cart)

    const getSum = () => {
        const cart = Object.values(itemsArray?.items)
        let sm = 0
        cart.length > 0 && cart.forEach(element => {
            sm += (element.qty * element.price)
        });
        setSum(sm)
    }



    useEffect(() => {
        getSum()
    }, [itemsArray])


    return (
        <div>
            <div className="divide-y divide-gray-300">
                <div className="flex items-center justify-between py-4">
                    <div className="">Subtotal</div>
                    <div className="font-bold text-2xl">₦{numberFormat(sum)}</div>
                </div>
                {/* <div className="flex items-center justify-between py-4">
                    <div className="font-bold text-lg">Order Total</div>
                    <div className="font-bold text-2xl">₦26,500</div>
                </div> */}
            </div>
        </div>
    )
}

export default CartSum