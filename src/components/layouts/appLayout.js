"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import appLogo from "@asset/images/logo.png"
// import SideNav from "../molecules/SideNav";
import { Session } from "@/hooks/Auth";
import { FaBell } from "react-icons/fa6";
import Image from "next/image";

function AppLayout({ children, title }) {
  const user = useSelector((state) => state.User);
  const isAuthenticated = Session(user);
  const [greetings, setGreetings] = useState("")
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowNav(false)
    })
    var today = new Date()
    var curHr = today.getHours()
    if (curHr < 12) {
      setGreetings('Morning')
    } else if (curHr < 18) {
      setGreetings('Afternoon')
    } else {
      setGreetings('Evening')
    }
  }, [])


  // if (isAuthenticated.status === "unauthenticated") {
  //   router.push("/auth/login");
  // } else {
  return (
    <div className="relative">
      <div className="w-96 fixed -top-36 -right-36 h-96 rounded-full bg-orange-400"></div>
      <div className="w-96 fixed  top-72 -left-36 h-96 rounded-full bg-orange-400"></div>
      <div className="w-[60vh] h-[60vh] fixed -bottom-52 right-12 rounded-full bg-orange-400"></div>
      <div className="min-h-screen bg-amber-50/70 z-30 relative backdrop-blur-3xl">
        <div className="p-6 z-0 sticky top-0 w-full">
          <div className="flex gap-52 items-center w-full bg-gray-200/40 border border-gray-200 p-5 rounded-xl">
            <div><Image alt="logo" src={appLogo} width={25} height={60} /></div>
            <div className="flex-grow flex items-center w-full">
              <div className="flex-grow font-bold">Welcome Diala 👋</div>
              <div className="flex items-center gap-3">
                <div className="text-xl text-gray-500"><FaBell /></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-200 rounded-full"></div>
                  <div className="font-bold text-sm">Diala Victor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen z-0 sticky top-0 w-64 bg-amber-400">
          {/* <SideNav user={user} /> */}
        </div>
        <div className="absolute z-10 overflow-auto top-0 h-screen w-full">
          <div className="h-screen bg-amber-600 ml-64 mt-32 ">asdrf</div>
        </div>
      </div>
      {/* <div className={`bg-gray-50 z-50 transition-all ${showNav ? "left-0" : "-left-64 md:left-0"} duration-300  relative`}>
        
      </div>
      <div className={`p-4 pb-8 md:ml-64 relative space-y-5 bg-gray-50 bg-opacity-10 transition-all duration-300 select-none min-h-screen`}>
        {title?.length > 0 && (<div className="">
            <div className="text-xl">Good {greetings} {user.value.user.name.split(" ")[0]}!</div>
            <div className="text-xs text-gray-400">{title}</div>
          </div>)}
          <div onClick={() => setShowNav(!showNav)} className="h-8 w-8 absolute top-4 right-5 bg-black md:hidden text-white rounded-md text-xl flex items-center justify-center cursor-pointer"><i className="ri-menu-line"></i></div>
          {children}
      </div> */}
    </div>
  );
  // }
}

export default AppLayout;
