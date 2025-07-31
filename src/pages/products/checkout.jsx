import AppLayout from '@/components/layouts/appLayout'
import AppInput from '@/components/organisms/AppInput'
import AppModal from '@/components/organisms/AppModal'
import CheckoutChip from '@/components/organisms/CheckoutChip'
import TimeComp from '@/components/organisms/TimeComp'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FaMap } from 'react-icons/fa'
import { FiStar } from 'react-icons/fi'
import { HiUser } from 'react-icons/hi2'
import { IoMdCompass } from 'react-icons/io'
import { IoMail } from 'react-icons/io5'
import { MdLocalPhone } from 'react-icons/md'
import { PiCityFill } from 'react-icons/pi'
import { SlArrowLeft } from 'react-icons/sl'

function checkout() {

    const router = useRouter()
    const [confirmCheckout, setConfirm] = useState(false)
    const [successModal, setSuccess] = useState(false)

    // use useForm hook to collect form info

    const checkout = () => {
        if (confirmCheckout) {
            setSuccess(true)
        } else {
            setConfirm(true)
        }
    }


    return (
        <AppLayout active="products" title={(
            <div className='flex items-center divide-x-2 *:px-3'>
                <div className='text-gray-400'>Shop</div>
                <div>Products</div>
            </div>
        )}>


            <AppModal mode={successModal}>
                <div className="space-y-6 text-center">
                    <div className='text-8xl flex items-center justify-center text-amber-500'><FiStar /></div>
                    <div className='text-xl font-bold'>SuccessfullyPayment made successfully</div>
                    <button onClick={() => router.replace('/products')} className="flex-grow w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> Continue Shopping </button>
                </div>
            </AppModal>


            <div className='md:grid grid-cols-2'>
                <div className='p-3 py-4'>
                    <div onClick={() => router.back()} className='inline-flex cursor-pointer gap-2 items-center'><SlArrowLeft /> Go Back</div>
                </div>
                <div className="p-3">
                    <TimeComp title="Checkout" />
                </div>
            </div>

            <div className="md:grid grid-cols-2 p-3 gap-4">
                <div className="">
                    {
                        confirmCheckout ? (
                            <div className="space-y-4">
                                <div className="bg-white/30 rounded-lg p-5 pb-7 space-y-4">
                                    <div className="text-2xl font-bold">Contact Info</div>
                                    <div className="font-semibold">
                                        <div className="text-sm text-gray-500">First Name</div>
                                        <div className="">Victor</div>
                                    </div>
                                    <div className="font-semibold">
                                        <div className="text-sm text-gray-500">Last Name</div>
                                        <div className="">Diala</div>
                                    </div>
                                    <div className="font-semibold">
                                        <div className="text-sm text-gray-500">Phone Number</div>
                                        <div className="">0901827464</div>
                                    </div>
                                    <div className="font-semibold">
                                        <div className="text-sm text-gray-500">Email</div>
                                        <div className="">email@gmail.com</div>
                                    </div>
                                    <div className="sm:grid grid-cols-3 gap-3">
                                        <div className="font-semibold">
                                            <div className="text-sm text-gray-500">Country</div>
                                            <div className="">Nigeria</div>
                                        </div>
                                        <div className="font-semibold">
                                            <div className="text-sm text-gray-500">State</div>
                                            <div className="">Imo</div>
                                        </div>
                                        <div className="font-semibold">
                                            <div className="text-sm text-gray-500">City</div>
                                            <div className="">Owerri</div>
                                        </div>
                                    </div>
                                    <div className="font-semibold">
                                        <div className="text-sm text-gray-500">Address</div>
                                        <div className="">Programmers city, umuerim nekede</div>
                                    </div>
                                </div>
                                <div className="bg-white/30 rounded-lg p-5 pb-7 space-y-4">
                                    <div className="text-2xl font-bold">Payment Method</div>
                                    <div className="">
                                        <AppInput type='radio' label='Wallet' checked />
                                    </div>
                                    <div className="">
                                        <div className="p-3 border border-white rounded-lg">
                                            <div className="text-sm text-gray-300">Available Balance</div>
                                            <div className="font-extrabold text-2xl">₦225,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white/30 rounded-lg p-5 pb-7 space-y-4">
                                <div className="text-2xl font-bold">Contact Info</div>
                                <div className="sm:grid grid-cols-2 gap-4">
                                    <AppInput placeholder="e.g Chisomaga" name="fname" required icon={<HiUser />} label="First Name" />
                                    <AppInput placeholder="e.g Chisomaga" name="fname" required icon={<HiUser />} label="Last Name" />
                                </div>
                                <AppInput placeholder="090000000000" name="fname" required icon={<MdLocalPhone />} label="Phone Number" />
                                <AppInput placeholder="email@mail.com" name="fname" required icon={<IoMail />} label="Email" />
                                <div className="sm:grid grid-cols-2 gap-4">
                                    <AppInput placeholder="******" name="fname" required icon={<FaMap />} label="Country" />
                                    <AppInput placeholder="*******" name="fname" required icon={<IoMdCompass />} label="State" />
                                </div>
                                <AppInput placeholder="*******" name="fname" required icon={<PiCityFill />} label="City" />
                                <AppInput placeholder="********" name="fname" required icon={<PiCityFill />} label="Address" />
                            </div>
                        )
                    }

                </div>
                <div className="space-y-5">
                    <div className="space-y-3">
                        {
                            Array.from({ length: 5 }).map((_, i) => (
                                <CheckoutChip key={i} />
                            ))
                        }
                    </div>
                    <div className="border bg-gray-100 border-white rounded-lg p-3">
                        <div className="divide-y divide-gray-300">
                            <div className="flex items-center justify-between py-4">
                                <div className="">Subtotal</div>
                                <div className="font-bold text-2xl">₦25,000</div>
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
                        <div className="">
                            <div className="flex gap-3">
                                <button onClick={checkout} className="flex-grow w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {confirmCheckout ? 'Checkout' : 'Proceed'} </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AppLayout>
    )
}

export default checkout