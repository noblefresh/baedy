"use client";
import React from "react";
import Image from "next/image";
import authImage from "./../../../public/images/authImage.png"
import appLogo from "./../../../public/images/logo.png"
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Session } from "@/hooks/Auth";

function AuthLayoutX({ title, children, subText, formTitle, formDes, onSubmit, errMsg }) {
  const user = useSelector((state) => state.User);
  const isAuthenticated = Session(user);
  const router = useRouter();
  const serialize = (form) => {
    var result = [];
    if (typeof form === "object" && form.nodeName === "FORM")
      Array.prototype.slice.call(form.elements).forEach(function (control) {
        if (
          control.name &&
          !control.disabled &&
          ["file", "reset", "submit", "button"].indexOf(control.type) === -1
        )
          if (control.type === "select-multiple")
            Array.prototype.slice
              .call(control.options)
              .forEach(function (option) {
                if (option.selected)
                  result.push(control.name + "=" + option.value);
              });
          else if (
            ["checkbox", "radio"].indexOf(control.type) === -1 ||
            control.checked
          )
            result.push(control.name + "=" + control.value);
      });
    var data = result.join("&").replace(/%20/g, "+");

    const serializeToJSON = (str) =>
      str
        .split("&")
        .map((x) => x.split("="))
        .reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: isNaN(value) ? value : Number(value),
          }),
          {}
        );

    return serializeToJSON(data);
  };



  if (isAuthenticated.status === "unauthenticated") {
    router.push("/auth/login");
  } else {
    return (
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className='relative overflow-hidden hidden lg:block top-0'>
          <Image src={authImage} alt="#" className="h-screen w-[100%] z-0 absolute top-0 left-0" />
          <div className="h-screen lg:flex p-20 bg-black/65 relative z-10 w-[100%] text-4xl bottom-0 hidden">
            <div className="w-[100vh] absolute left-[84%] top-0 -bottom-0 -rotate-[90deg]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,160L80,176C160,192,320,224,480,208C640,192,800,128,960,122.7C1120,117,1280,171,1360,197.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            </div>
            <div className="space-y-40">
              <div>
                <Image src={appLogo} alt="LOGO" />
              </div>
              <div className="text-white space-y-4 max-w-md">
                <div className="font-bold text-7xl">{title}</div>
                <div className="text-xs">{subText}</div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full mx-auto relative'>
          <div class="[clip-path:_polygon(25%_0%,_75%_0%,_100%_49%,_75%_100%,_25%_100%,_0_50%)] fixed top-0 -right-12 bg-amber-50 w-48 h-36"></div>
          <div class="[clip-path:_polygon(25%_0%,_75%_0%,_100%_49%,_75%_100%,_25%_100%,_0_50%)] absolute z-20 bottom-5 -left-4 bg-amber-50 w-64 h-52"></div>
          <div className="h-screen w-full overflow-y-auto flex flex-col bg-white">
            <div className="relative z-40 h-full flex items-center justify-center">
              <div className="w-full max-h-[90%]">
                <div className="py-28 px-4 relative">
                  <div className="max-w-lg space-y-8 md:space-y-12 rounded-xl mx-auto bg-white border p-6 border-amber-200 relative">
                    <div className="space-y-1 md:space-y-3">
                      <div className="text-2xl md:text-[40px] font-bold capitalize">{formTitle}</div>
                      <div className="text-xs md:text-lg">{formDes}</div>
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault(), onSubmit(serialize(e.target));
                      }} >
                      <div className="space-y-4">
                        <div className="text-red-500 text-xs">{errMsg}</div>
                        <div className="space-y-5">{children}</div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default AuthLayoutX;
