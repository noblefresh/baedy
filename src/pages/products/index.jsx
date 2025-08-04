import AppLayout from '@/components/layouts/appLayout'
import ProductChip from '@/components/organisms/ProductChip'
import TimeComp from '@/components/organisms/TimeComp'
import { fetchActiveProducts } from '@/services/authService'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CgShoppingCart } from "react-icons/cg";

function index() {


    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        const { status, data } = await fetchActiveProducts()
        status && setProducts(data?.data)
    }


    useEffect(() => {
        fetchProducts()
    }, [])


    return (
        <AppLayout active="products" title={(
            <div className='flex items-center divide-x-2 *:px-3'>
                <div className='text-gray-400'>Shop</div>
                <div>Products</div>
            </div>
        )}>

            <div className="p-3">
                <TimeComp title="Products" />
            </div>
            <div className="flex justify-end px-3">
                <Link href='/products/cart'>
                    <div className="flex py-2 px-3 rounded-lg text-white bg-amber-500 gap-2 items-center">
                        <CgShoppingCart /> View Cart
                    </div>
                </Link>
            </div>
            <div className="grid grid-cols-2 p-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((_, i) => (
                    <ProductChip data={_} key={i} />
                ))}
            </div>
        </AppLayout>
    )
}

export default index