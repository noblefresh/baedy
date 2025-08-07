'use client';

import AppLayout from '@/components/layouts/appLayout';
import CartChip from '@/components/organisms/CartChip';
import CartSum from '@/components/organisms/CartSum';
import TimeComp from '@/components/organisms/TimeComp';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Updated import
import React, { useMemo } from 'react';
import { SlArrowLeft } from 'react-icons/sl';
import { useSelector } from 'react-redux';

function Cart() {
    const router = useRouter();
    const cartItems = useSelector((state) => state?.Cart?.items ?? {});

    const cart = useMemo(() => Object.values(cartItems), [cartItems]);

    return (
        <AppLayout
            active="products"
            title={
                <div className="flex items-center divide-x-2 *:px-3">
                    <div className="text-gray-400">Shop</div>
                    <div>Products</div>
                </div>
            }
        >
            <div className="md:grid grid-cols-2">
                <div className="p-3 py-4">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex cursor-pointer gap-2 items-center hover:text-amber-500 transition-colors"
                        aria-label="Go back"
                    >
                        <SlArrowLeft /> Go Back
                    </button>
                </div>
                <div className="p-3">
                    <TimeComp title="Shopping Cart" />
                </div>
            </div>

            {cart.length > 0 ? (
                <div className="px-3 space-y-5">
                    <div className="space-y-5">
                        {cart.map((item) => (
                            <CartChip data={item} key={item.id} /> // Use proper unique key
                        ))}
                    </div>
                    <div className="md:grid grid-cols-2 gap-4">
                        <div></div>
                        <div className="border bg-gray-100 border-white rounded-lg p-3">
                            <CartSum />
                            <div className="mt-4">
                                <Link href="/products/checkout" className="w-full block">
                                    <button
                                        className="w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-amber-500/35 shadow-md bg-amber-500 hover:bg-amber-600 text-white rounded-lg py-3 transition-colors"
                                    >
                                        Checkout
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center max-w-sm mx-auto py-24 space-y-5">
                    <div className="text-lg">Your Cart is Empty</div>
                    <button
                        onClick={() => router.push('/products')} // Changed replace to push
                        className="w-full cursor-pointer shadow-md bg-amber-500 hover:bg-amber-600 text-white rounded-lg py-3 transition-colors"
                    >
                        Start Shopping
                    </button>
                </div>
            )}
        </AppLayout>
    );
}

export default Cart;