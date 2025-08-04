'use client'
import React from 'react'

function AppSelect({ label, required, value, name, error, options, defaultValue, onChange, placeholder, icon }) {

    return (
        <div className='space-y-2 cursor-pointer text-green'>

            <div>
                <label className="font-semibold text-gray-600 text-sm">{label}</label>
            </div>
            <div>
                <div className='relative'>
                    <div className="absolute w-9 h-full flex items-center justify-center pl-1.5 text-gray-500">{icon}</div>
                    <select
                        name={name}
                        onChange={(e) => onChange && onChange(e)}
                        required={required}
                        value={value}
                        className={`w-full border appearance-none focus:border-black disabled:border-gray-100 disabled:cursor-default ${error ? 'border-red-500' : 'border-black'} p-3 pl-9 peer outline-none rounded-lg`}
                    >
                        <option value="" disabled selected hidden>
                            {placeholder}
                        </option>
                        {options?.map((option) => (
                            <option key={option.value} defaultValue={typeof (defaultValue) === "string" ? defaultValue === option.value : defaultValue === option.label} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <div className="text-xs text-red-500">{error}</div>}
            </div>

        </div>
    )
}

export default AppSelect