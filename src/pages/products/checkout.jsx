import AppLayout from '@/components/layouts/appLayout'
import AppInput from '@/components/organisms/AppInput'
import AppModal from '@/components/organisms/AppModal'
import AppSelect from '@/components/organisms/AppSelect'
import CartSum from '@/components/organisms/CartSum'
import CheckoutChip from '@/components/organisms/CheckoutChip'
import TimeComp from '@/components/organisms/TimeComp'
import UseFormHandler from '@/hooks/useFormHandler'
import { numberFormat } from '@/hooks/utils'
import { processOrder } from '@/services/authService'
import { clearCart } from '@/Store/reducers/Cart'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaMap } from 'react-icons/fa'
import { FiStar } from 'react-icons/fi'
import { HiUser } from 'react-icons/hi2'
import { IoMdCompass } from 'react-icons/io'
import { IoMail } from 'react-icons/io5'
import { MdLocalPhone } from 'react-icons/md'
import { PiCityFill } from 'react-icons/pi'
import { SlArrowLeft } from 'react-icons/sl'
import { useDispatch, useSelector } from 'react-redux'

function checkout() {

    const router = useRouter()
    const [confirmCheckout, setConfirm] = useState(false)
    const [successModal, setSuccess] = useState(false)
    const cart = useSelector((state) => state?.Cart?.items)
    const [options, setOptions] = useState([])
    const dispatch = useDispatch()

    const fetchCountries = async () => {
        await axios.get('https://restcountries.com/v3.1/all?fields=name').then(res => {

            const arr = []

            if (res.status === 200) {
                res?.data?.forEach(element => {
                    arr.push({ label: element.name.common, value: element.name.common })
                });
            }
            setOptions(arr)
        })
    }

    const formHook = UseFormHandler({
        required: {
            firstName: 'Please Enter First Name',
            lastName: 'Please Enter Last Name',
            delivery_phone: 'Please Enter Phone Number',
            delivery_country: 'Please Select a Country',
            delivery_state: 'Pleast Enter State',
            delivery_city: 'Please Enter City Name',
            delivery_address: 'Please Enter Address',
            email: 'Please Enter Email'
        },
        initialValues: {
            firstName: '',
            lastName: '',
            delivery_phone: '',
            delivery_country: '',
            delivery_state: '',
            delivery_city: '',
            delivery_address: '',
            email: ''
        },
        onSubmit: async (value) => {
            value.cart = cart
            if (confirmCheckout) {
                const { status, data } = await processOrder(value)
                dispatch(clearCart())
                status && setSuccess(true)
            } else {
                setConfirm(true)
            }
        }
    })

    useEffect(() => {
        fetchCountries()
    }, [])


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
                    <div className='text-xl font-bold'>Payment made successfully</div>
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

            {
                cart.length > 0 ? (
                    <div className="md:grid grid-cols-2 p-3 gap-4">
                        <div className="">
                            {
                                confirmCheckout ? (
                                    <div className="space-y-4">
                                        <div className="bg-white/30 rounded-lg p-5 pb-7 space-y-4">
                                            <div className="text-2xl font-bold">Contact Info</div>
                                            <div className="font-semibold">
                                                <div className="text-sm text-gray-500">First Name</div>
                                                <div className="">{formHook?.value?.firstName}</div>
                                            </div>
                                            <div className="font-semibold">
                                                <div className="text-sm text-gray-500">Last Name</div>
                                                <div className="">{formHook?.value?.lastName}</div>
                                            </div>
                                            <div className="font-semibold">
                                                <div className="text-sm text-gray-500">Phone Number</div>
                                                <div className="">{formHook?.value?.delivery_phone}</div>
                                            </div>
                                            <div className="font-semibold">
                                                <div className="text-sm text-gray-500">Email</div>
                                                <div className="">{formHook?.value?.email}</div>
                                            </div>
                                            <div className="sm:grid grid-cols-3 gap-3">
                                                <div className="font-semibold">
                                                    <div className="text-sm text-gray-500">Country</div>
                                                    <div className="">{formHook?.value?.delivery_country}</div>
                                                </div>
                                                <div className="font-semibold">
                                                    <div className="text-sm text-gray-500">State</div>
                                                    <div className="">{formHook?.value?.delivery_state}</div>
                                                </div>
                                                <div className="font-semibold">
                                                    <div className="text-sm text-gray-500">City</div>
                                                    <div className="">{formHook?.value?.delivery_city}</div>
                                                </div>
                                            </div>
                                            <div className="font-semibold">
                                                <div className="text-sm text-gray-500">Address</div>
                                                <div className="">{formHook?.value?.delivery_address}</div>
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
                                            <AppInput onChange={(e) => { formHook.value.firstName = e.target.value }} error={formHook?.error?.firstName && formHook?.error?.firstName} placeholder="e.g Chisomaga" required icon={<HiUser />} label="First Name" />
                                            <AppInput onChange={(e) => { formHook.value.lastName = e.target.value }} error={formHook?.error?.lastName && formHook?.error?.lastName} placeholder="e.g Chisomaga" required icon={<HiUser />} label="Last Name" />
                                        </div>
                                        <AppInput onChange={(e) => { formHook.value.delivery_phone = e.target.value }} error={formHook?.error?.delivery_phone && formHook?.error?.delivery_phone} placeholder="090000000000" required icon={<MdLocalPhone />} label="Phone Number" />
                                        <AppInput onChange={(e) => { formHook.value.email = e.target.value }} error={formHook?.error?.email && formHook?.error?.email} placeholder="email@mail.com" required icon={<IoMail />} label="Email" />
                                        <div className="sm:grid grid-cols-2 gap-4">
                                            <AppSelect onChange={(e) => { formHook.value.delivery_country = e.target.value }} error={formHook?.error?.delivery_country && formHook?.error?.delivery_country} placeholder="Select Country" name="country" icon={<FaMap />} required label="Country" options={options} defaultValue='Nigeria' />
                                            <AppInput onChange={(e) => { formHook.value.delivery_state = e.target.value }} error={formHook?.error?.delivery_state && formHook?.error?.delivery_state} placeholder="*******" required icon={<IoMdCompass />} label="State" />
                                        </div>
                                        <AppInput onChange={(e) => { formHook.value.delivery_city = e.target.value }} placeholder="*******" error={formHook?.error?.delivery_city && formHook?.error?.delivery_city} required icon={<PiCityFill />} label="City" />
                                        <AppInput onChange={(e) => { formHook.value.delivery_address = e.target.value }} placeholder="********" error={formHook?.error?.delivery_address && formHook?.error?.delivery_address} required icon={<PiCityFill />} label="Address" />
                                    </div>
                                )
                            }

                        </div>
                        <div className="space-y-5">
                            <div className="space-y-3">
                                {
                                    cart.map((_, i) => (
                                        <CheckoutChip data={_} key={i} />
                                    ))
                                }
                            </div>
                            <div className="border bg-gray-100 border-white rounded-lg p-3">
                                <CartSum />
                                <div className="">
                                    <div className="flex gap-3">
                                        <button onClick={() => formHook.submit()} className="flex-grow w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> {confirmCheckout ? 'Checkout' : 'Proceed'} </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center max-w-sm mx-auto py-24 space-y-5">
                        <div className="text-lg">Your Cart is Empty</div>
                        <button onClick={() => router.replace('/products')} className="flex-grow w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"> Start Shopping </button>
                    </div>
                )
            }


        </AppLayout>
    )
}

export default checkout