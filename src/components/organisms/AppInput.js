'use client'
import React, { useState } from "react";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

function AppInput({ label, error, maxLength, checked, type, disabled, required, placeholder, name, max, icon, value, defaultValue, display, onChange }) {
  const [inputType, setInputType] = useState(type);

  const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const Fid = makeid(7)

  return (
    <div className="space-y-2 select-none">
      <div>
        {
          type !== "checkbox" && type !== "radio" && (
            <label className="font-semibold text-gray-600 text-sm">
              {label}
            </label>
          )
        }
      </div>
      <div>
        <div className="text-[16px] relative rounded-lg">

          {
            type !== "checkbox" && type !== "radio" && (
              <div className="absolute w-9 h-full flex top-4 justify-center pl-1.5 text-gray-500">{icon}</div>
            )
          }


          {type === "checkbox" || type === "radio" ? (
            <div className="flex text-sm">
              <div
                className={`space-x-2 relative -left-2 flex select-none items-center justify-center ${display === "col" && "flex-col pb-6"
                  }`}
              >
                <input
                  type={type}
                  id={name + Fid}
                  className="peer group opacity-0 appearance-none"
                  name={name}
                  required={required}
                  maxLength={maxLength}
                  value={value}
                  checked={checked && checked}
                  defaultValue={defaultValue}
                  onChange={(e) => onChange && onChange(e)}
                />
                <div className="relative top-[1px] bg-white w-4 h-4 rounded-md dark:bg-gray-700 dark:border-gray-500 border peer-hover:hidden peer-checked:hidden " />
                <div className="relative top-[1px] text-xs bg-white dark:bg-gray-700 dark:border-gray-500 w-4 h-4 rounded-md peer-checked:bg-black hidden peer-checked:flex peer-hover:border peer-hover:flex items-center justify-center text-gray-300 peer-checked:text-white ">
                  <i className="ri-check-line"></i>
                </div>
                <label
                  htmlFor={name + Fid}
                  className={`cursor-pointer ${(label === undefined) && "w-1 h-6"} flex gap-1 ${display === "col"
                    ? "pt-8 px-2 -top-0 absolute"
                    : "pl-9 right-9 relative top-0.5"
                    }`}
                >
                  <span className="first-letter:capitalize text-tertiary-base2 leading-[20px]">
                    {label}
                  </span>
                </label>
              </div>
            </div>
          ) : type === "textarea" ? (
            <textarea
              name={name}
              required={required}
              value={value}
              disabled={disabled}
              placeholder={placeholder}
              onChange={(e) => onChange && onChange(e)}
              defaultValue={defaultValue}
              maxLength={maxLength}
              className="w-full border appearance-none focus:border-black disabled:border-gray-100 disabled:cursor-default border-black p-3 pl-9 peer outline-none rounded-lg"
            ></textarea>
          ) : (
            <input
              name={name}
              required={required}
              type={type}
              value={value}
              disabled={disabled}
              placeholder={placeholder}
              onChange={(e) => onChange && onChange(e)}
              defaultValue={defaultValue}
              className={`w-full border appearance-none focus:border-black disabled:border-gray-100 disabled:cursor-default ${error ? 'border-red-500' : 'border-black'} p-3 pl-9 peer outline-none rounded-lg`}
              // className="w-full border appearance-none focus:border-black disabled:border-gray-100 disabled:cursor-default border-black p-3 pl-9 peer outline-none rounded-lg"
              maxLength={maxLength}
              {...(maxLength ? { maxLength } : {})}
              {...(max ? { max } : {})}
            />
          )}

          {type === "password" && (
            <div
              className="absolute cursor-pointer text-black peer-focus:text-black peer-placeholder-shown:text-gray-300 right-3 top-4"
              onClick={() =>
                setInputType(inputType === "password" ? "text" : "password")
              }
            >
              {inputType !== "password" ? (
                <VscEye />
              ) : (
                <VscEyeClosed />
              )}
            </div>
          )}
        </div>
        {error && <div className="text-xs text-red-500">{error}</div>}
      </div>
    </div>

  );
}

export default AppInput;