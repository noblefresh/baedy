"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from 'moment'
import { useSelector } from "react-redux";
import appLogo from "@asset/Images/cardSlide.png"
import { Session } from "@/hooks/Auth";
import { FaBell } from "react-icons/fa6";
import Image from "next/image";
import SideNav from "../molecules/SideNav";

function AppLayout({ children, title }) {
  const user = useSelector((state) => state.User);
  const isAuthenticated = Session(user);
  const [greetings, setTime] = useState(false)
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();

  const getTime = (date) => {
    const now = moment();
    const inputTime = moment(date);
    const minutes = now.diff(inputTime, 'minutes');
    if (minutes < 10) {
      setTime(true);
    } else {
      setTime(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowNav(false)
    })
    getTime(user?.value?.user?.created_at)
  }, [])


  if (isAuthenticated.status === "unauthenticated") {
    router.push("/auth/login");
  } else {
    return (
      <div className="relative">
        <div className="w-96 fixed -top-36 -right-36 h-96 rounded-full bg-orange-400"></div>
        <div className="w-96 fixed  top-72 -left-36 h-96 rounded-full bg-orange-400"></div>
        <div className="w-[60vh] h-[60vh] fixed -bottom-52 right-12 rounded-full bg-orange-400"></div>
        <div className="min-h-screen bg-amber-50/70 z-30 relative backdrop-blur-3xl">
          <div className="p-6 z-20 sticky top-0 w-full">
            <div className="flex gap-52 items-center w-full backdrop-blur-3xl bg-gray-200/40 border border-gray-200 p-5 rounded-xl">
              <div><Image alt="logo" src={appLogo} width={35} height={60} /></div>
              <div className="flex-grow flex items-center w-full">
                <div className="flex-grow font-bold">{title}</div>
                <div className="flex items-center gap-3">
                  <div className="text-xl text-gray-500"><FaBell /></div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-200 rounded-full">
                      <Image alt={user?.value?.user?.fname.split("")[0]} src={user?.value?.user?.avatar} />
                    </div>
                    <div className="font-bold text-sm">{user?.value?.user?.fname} {user?.value?.user?.lname}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-screen z-20 fixed pt-32 top-0 w-64">
            <SideNav />
          </div>
          <div className="absolute p-4 z-10 overflow-auto top-0 h-screen w-full">
            <div className="min-h-screen ml-64 mt-32 bg-gray-200/40 border border-gray-200 rounded-xl ">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AppLayout;
