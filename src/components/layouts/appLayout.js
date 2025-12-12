"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import moment from 'moment'
import { useSelector, useDispatch } from "react-redux";
import { setSharedProfile } from "@/Store/reducers/SharedProfile";
import thanks from "@asset/Images/thankshand.png"
import { Session } from "@/hooks/Auth";
import Image from "next/image";
import SideNav from "../molecules/SideNav";
import Link from "next/link";
import TopBar from "../organisms/TopBar";
import { Toaster } from "sonner";



// TODO: add page mata title

// export const metadata = {
//   title: 'Home Page',
//   description: 'Welcome to the home page',
// };


function AppLayout({ children, title, active }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User);
  const isAuthenticated = Session(user);
  const [greetings, setTime] = useState(false)
  const [showNav, setShowNav] = useState(false);
  const router = useRouter();


  const getTime = (date) => {
    const now = moment();
    const inputTime = moment(date);
    const minutes = now.diff(inputTime, 'minutes');
    if (minutes < 1) {
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
  }, [user?.value?.user?.created_at])

  useEffect(() => {
    // Handle shared profile query parameter
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const sharedBigdaymiProfile = searchParams.get('shared_profile');
      if (sharedBigdaymiProfile && sharedBigdaymiProfile.length > 0) {
        dispatch(setSharedProfile(sharedBigdaymiProfile));
      }
    }
  }, [dispatch])

  if (isAuthenticated.status === "unauthenticated") {
    router.push("/auth/login");
  } else {
    if (user?.value?.user?.email_verified_at === null) {
      router.push('/auth/accountverification')
    } else {
      return (
        <div className="relative">
          <Toaster />
          <div className="w-96 fixed -top-36 -right-36 h-96 rounded-full bg-orange-400"></div>
          <div className="w-96 fixed  top-72 -left-36 h-96 rounded-full bg-orange-400"></div>
          <div className="w-[60vh] h-[60vh] fixed -bottom-52 right-12 rounded-full bg-orange-400"></div>
          <div className="min-h-screen bg-amber-50/70 z-10 relative backdrop-blur-3xl">
            <div className="p-2 md:p-6 z-20 sticky top-0 w-full">
              <TopBar toggleNaav={() => setShowNav(!showNav)} title={title} />
            </div>
            <div className="absolute px-2 md:p-4 overflow-auto top-0 h-screen w-full">
              <div className="min-h-screen md:ml-64 mt-20 md:mt-32 bg-gray-200/40 border border-gray-200 rounded-xl ">
                {children}
              </div>
              <div className={`h-screen z-30 fixed md:pt-32 transition-all duration-500 top-0 ${showNav ? "" : "-ml-72 md:m-0"} w-64`}>
                <SideNav active={active} />
              </div>
            </div>
          </div>

          {
            greetings && (
              <div className="fixed z-50 top-0 left-0 right-0 flex items-center justify-center bottom-0 bg-black/30 h-screen w-screen">
                <div className="w-full">
                  <div className="max-w-md space-y-6 p-8 mx-auto rounded-lg border bg-white/50 border-gray-50/40 backdrop-blur-lg">
                    <div>
                      <Image alt="Thank" src={thanks} width={100} height={100} className="w-3/5 mx-auto pointer-events-none" />
                    </div>
                    <div className="text-center text-sm space-y-5 px-5">
                      <div>Imagine a world where your birthday isn&apos;t just a day it&apos;s a month-long celebration.</div>
                      <div>A chance to connect with people who share your birth month, make new friends, find love, and party like never before both online and offline.</div>
                    </div>
                    <div>
                      <Link href="subscription_details" className="">
                        <div className="bg-amber-400 cursor-pointer rounded-lg w-full py-3 text-center text-white font-bold text-sm">Thank You</div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      );
    }

  }
}

export default AppLayout;
