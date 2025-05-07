import Link from 'next/link'
import React from 'react'

function AppLink({ text, icon, active }) {
    return (
        <Link href={text.toLowerCase() !== "home" ? `/`+text.replaceAll(" ", "_").toLowerCase() : "/"}>
            <div className={` ${active?.toLowerCase() === text?.toLowerCase() ? "bg-amber-500/30 text-amber-600" : "bg-cream text-gray-500"}  flex px-3 py-3 items-center gap-1 rounded-lg cursor-pointer`}>
                {icon} {text}
            </div>
        </Link>
    )
}

export default AppLink