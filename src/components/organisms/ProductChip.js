import { numberFormat } from '@/hooks/utils';
import { addToCart } from '@/Store/reducers/Cart';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

function ProductChip({ data }) {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state?.Cart?.items || {});
    const isInCart = Boolean(cartItems[data.id]);

    const handleAddToCart = () => {
        dispatch(addToCart({
            ...data,
            qty: 1
        }));
    };

    return (
        <div className='rounded-lg overflow-hidden bg-gray-50 border border-white'>
            <Link href={`products/${data?.slug}`}>
                <div className="h-32 md:h-56 rounded-lg relative">
                    <Image 
                        src={data?.images[0]} 
                        alt={data?.name || 'Product image'}
                        fill
                        className='object-cover'
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
                <div className='font-bold space-y-2 p-3'>
                    <div>{data?.name}</div>
                    <div>₦{numberFormat(data?.price)}</div>
                </div>
            </Link>
            <div className="px-3 pb-3">
                <button 
                    onClick={isInCart ? undefined : handleAddToCart}
                    disabled={isInCart}
                    className={`px-5 w-full cursor-pointer text-xs shadow-md text-white rounded-lg py-2 ${
                        isInCart ? 'bg-amber-500/35 cursor-default' : 'bg-amber-500 hover:bg-amber-600'
                    } transition-colors`}
                >
                    {isInCart ? 'In Cart' : 'Add To Cart'}
                </button>
            </div>
        </div>
    );
}

export default ProductChip;