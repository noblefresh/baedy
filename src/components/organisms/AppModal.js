import React from 'react'
import { IoMdClose } from "react-icons/io";

function AppModal({ children, withClose, mode }) {
    return (
        mode &&
        <div className='bg-black/20 flex items-center backdrop-blur-sm z-50 h-screen w-screen fixed top-0 right-0'>
            <div className='w-screen p-3'>
                <div className={`max-w-md mx-auto relative border backdrop-blur-lg bg-gray-50/50 space-y-5 border-gray-50 px-3 py-4 rounded-xl`}>
                    {
                        withClose && <div onClick={withClose} className='w-6 h-6 rounded-full border-gray-500 text-gray-500 flex items-center justify-center cursor-pointer border absolute top-3 right-3'><IoMdClose /></div>
                    }
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AppModal
