import AppLayout from '@/components/layouts/appLayout'
import RatingChip from '@/components/organisms/RatingChip';
import TimeComp from '@/components/organisms/TimeComp'
import { numberFormat } from '@/hooks/utils';
import { fetchProductBySlug } from '@/services/authService';
import { addToCart } from '@/Store/reducers/Cart';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CgShoppingCart } from 'react-icons/cg';
import { FiMinus } from 'react-icons/fi';
import { GoPlus, GoStarFill } from "react-icons/go";
import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from 'react-redux';

function index() {
    const carts = useSelector((state) => state?.Cart?.items)
    const router = useRouter()
    const { slug } = router.query;
    const dispatch = useDispatch()
    const [result, setResult] = useState()
    const [product, setProduct] = useState({})
    const [cur, setCur] = useState(0)


    const fetchBySlug = async () => {
        const { status, data } = await fetchProductBySlug({ slug })
        status && setProduct(data?.data)
        setResult(carts.filter(productx => productx.id === data?.data?.id)[0])
    }


    console.log(useSelector((state) => state?.Cart?.items), product?.id);



    const addToCartFN = () => {
        if (result) {
            const payload = { ...result, qty: result.qty + 1 }
            dispatch(addToCart(payload));
            setResult(payload)
        } else {
            const payload = { ...product, qty: 1 }
            dispatch(addToCart(payload));
            setResult(payload)
        }
    };

    const deductQty = (e) => {
        const payload = { ...result, qty: e }
        dispatch(addToCart({ ...result, qty: e }));
        setResult(payload)
    }




    useEffect(() => {
        fetchBySlug()
    }, [])



    return (
        <AppLayout active="products" title={(
            <div className='flex items-center divide-x-2 *:px-3'>
                <div className='text-gray-400'>Shop</div>
                <div>Products</div>
            </div>
        )}>

            <div className='md:grid grid-cols-2'>
                <div className='p-3 py-4'>
                    <div onClick={() => router.back()} className='inline-flex cursor-pointer gap-2 items-center'><SlArrowLeft /> Go Back</div>
                </div>
                <div className="p-3">
                    <TimeComp title="Products" />
                </div>
            </div>
            <div className="flex justify-end p-3">
                <Link href='/products/cart'>
                    <div className="flex py-2 px-3 rounded-lg text-white bg-amber-500 gap-2 items-center">
                        <CgShoppingCart /> View Cart
                    </div>
                </Link>
            </div>
            <div className='px-3 space-y-4'>
                <div className='md:grid grid-cols-3 gap-4 space-y-4 border border-white rounded-xl md:space-y-0 bg-gray-100 p-3'>
                    <div>
                        <div className="h-96 w-full rounded-xl overflow-hidden bg-amber-50">
                            {
                                product?.images?.length > 0 && (<Image width={10} height={10} alt='#' className='w-full h-full' src={product?.images[cur]} />)
                            }
                        </div>
                        <div className="flex flex-wrap pt-4 gap-2">
                            {
                                product?.images?.length > 0 && product?.images.map((im, ix) => (
                                    <div onClick={() => setCur(ix)} key={ix} className="h-16 w-16 rounded-xl overflow-hidden bg-amber-50">
                                        <Image alt='ProductIMG' src={im} width={100} height={100} className='w-full h-full' />
                                    </div>
                                ))
                            }
                        </div>
                        {/* product?.images?.length > 0  */}
                    </div>
                    <div className='col-span-2 space-y-5'>
                        <div className='font-bold'>
                            <div className='text-sm'>Product Name:</div>
                            <div className='text-4xl'>{product?.name}</div>
                        </div>
                        <div className='font-bold'>
                            <div className='text-sm'>Price:</div>
                            <div className='text-4xl'>₦{numberFormat(product?.price)}</div>
                        </div>
                        <div>
                            <div className='text-sm font-bold'>Product Description:</div>
                            <div>{product?.description}</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-7">
                                {
                                    result ? (
                                        <div>
                                            <button disabled className="px-5 w-full md:w-auto cursor-pointer text-xs disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-2">In cart</button>
                                            {/* <div className='flex items-center gap-2'>
                                                <div className={`cursor-pointer p-2 rounded-lg ${result.qty > 1 && 'bg-white'}`} onClick={() => deductQty(result.qty > 1 ? result.qty - 1 : 1)}><FiMinus /></div>
                                                <div className='border border-gray-200 rounded-lg px-3 py-1 select-none'>{result.qty}</div>
                                                <div className='cursor-pointer bg-white rounded-lg p-2' onClick={addToCartFN}><GoPlus /></div>
                                            </div> */}
                                        </div>
                                    ) : (
                                        <button onClick={addToCartFN} className="px-5 cursor-pointer text-xs disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-2">Add To Cart</button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='md:grid grid-cols-3 gap-4 space-y-4 p-3'>
                    <div className="">
                        <div className='border p-3 border-white rounded-xl md:space-y-0 bg-gray-100'>
                            <div className="font-bold text-xl">Customer Reviews</div>
                            <div className="flex items-center gap-1">
                                <RatingChip rate={product?.average_rating} />
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2 space-y-6'>
                        {
                            product?.ratings?.map((_, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex gap-1 items-center">
                                        <div className="">
                                            <div className="w-12 h-12 overflow-hidden rounded-full bg-amber-50">
                                                <Image src={_?.user?.avatar} alt='#' width={10} height={10} className='w-full h-full' />
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="font-bold">{_?.user?.fname} {_?.user?.lname}</div>
                                            <div className="flex items-center gap-1"> <RatingChip rate={_?.rating} /></div>
                                        </div>
                                    </div>
                                    <div className="text-sm italic">{_?.comment}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </AppLayout>
    )
}

export default index