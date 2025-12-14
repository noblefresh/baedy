import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

function AppLink({ text, icon, active,extraText }) {

    return (
        <Link href={text.toLowerCase() !== "home" ? `/` + text.replaceAll(" ", "_").toLowerCase() : "/"}>
            <div className={` ${text.replaceAll(" ", "_").toLowerCase() === active ? "bg-amber-300/10 text-amber-600" : "bg-cream hover:border-amber-300 hover:bg-amber-200/10 border-transparent text-gray-500"} border-l-3 flex px-3 py-3 items-center gap-1 rounded-lg cursor-pointer`}>
                {icon} {text} {extraText}
            </div>
        </Link>
    )
}

export default AppLink