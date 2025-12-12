import React, { useEffect, useState } from "react";
import img from "@asset/Images/sideimg.png";
import Image from "next/image";
import AppLink from "../organisms/AppLink";
import { FaCalendarAlt, FaUserAlt, FaCog } from "react-icons/fa";
import { PiWalletFill } from "react-icons/pi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BsFillGridFill } from "react-icons/bs";
import { IoIosCard } from "react-icons/io";
import { ImExit } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { clearSharedProfile } from "@/Store/reducers/SharedProfile";
import { useRouter } from "next/router";
import { SignOut } from "@/hooks/Auth";
import { GiShoppingBag } from "react-icons/gi";
import { IoStorefrontOutline } from "react-icons/io5";
import AppModal from "../organisms/AppModal";
import { FiStar } from "react-icons/fi";
import serialize from "@/hooks/Serialize";
import giftimg from "@asset/Images/giftimg.png";
import { giftUser, shareProfile } from "@/services/authService";
import { toast } from "sonner";

function SideNav({ active }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const sharedProfile = useSelector((state) => state.SharedProfile?.referralId);
  const [userInfo, setUserInfo] = useState(null);
  const [proccessingFund, setProccessingFund] = useState(false);
  const [giftModal, setGiftModal] = useState(false);
  const [showAmount, setAmount] = useState(false);

  const siOut = () => {
    SignOut(dispatch);
    router.push("/");
  };

  const getUserInfo = async () => {
    if (!sharedProfile) return;
    const { status, data: res } = await shareProfile({
      referral_id: sharedProfile,
    });
    if (status) {
      setUserInfo(res.data);
    }
  };

  const prefix = (data) => {
    switch (data?.dob?.split(" ")[0].split("-")[2].split("")[1]) {
      case "1":
        if (data?.dob.split(" ")[0].split("-")[2].split("")[0] === "1") {
          return "th";
        } else {
          return "st";
        }
        break;

      case "2":
        if (data?.dob.split(" ")[0].split("-")[2].split("")[0] === "1") {
          return "th";
        } else {
          return "nd";
        }
        break;
      case "3":
        if (data?.dob.split(" ")[0].split("-")[2].split("")[0] === "1") {
          return "th";
        } else {
          return "rd";
        }
        break;

      default:
        return "th";
        break;
    }
  };
  const monthName = (data) => {
    switch (data) {
      case "01":
        return "January";
        break;
      case "02":
        return "February";
        break;
      case "03":
        return "March";
        break;
      case "04":
        return "April";
        break;
      case "05":
        return "May";
        break;
      case "06":
        return "June";
        break;
      case "07":
        return "July";
        break;
      case "08":
        return "August";
        break;
      case "09":
        return "September";
        break;
      case "10":
        return "October";
        break;
      case "11":
        return "November";
        break;
      case "12":
        return "December";
        break;
      default:
        return "";
        break;
    }
  };

  useEffect(() => {
    if (sharedProfile) {
      setGiftModal(true);
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharedProfile]);

  const submit = async (e) => {
    e.preventDefault();
    setProccessingFund(true);
    let payload = serialize(e.target);
    payload.user_id = userInfo?.id;
    const { status, data: res } = await giftUser(payload);
    if (status) {
      setAmount(true);
      setAmount(true);
      setGiftModal(false);
      dispatch(clearSharedProfile());
    } else {
      toast.error(res.message);
    }
    setProccessingFund(false);
  };

  return (
    <>
      <div className="fixed z-50">
        {showAmount ? (
          <AppModal mode={showAmount}>
            <div className="space-y-6 text-center">
              <div className="text-8xl flex items-center justify-center text-amber-500">
                <FiStar />
              </div>
              <div className="text-xl font-bold">Gift sent successfully</div>
              <div className="text-gray-400 text-sm">Thank You</div>
              <button
                onClick={() => {
                  setGiftModal(false);
                  setAmount(false);
                }}
                className="flex-grow w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"
              >
                {" "}
                Done{" "}
              </button>
            </div>
          </AppModal>
        ) : (
          <AppModal
            mode={giftModal}
            withClose={() => {
              setGiftModal(false);
              setAmount(false);
              dispatch(clearSharedProfile());
            }}
          >
            <form onSubmit={submit}>
              <div className="space-y-6 text-center">
                <div>
                  <Image
                    alt="Thank"
                    src={giftimg}
                    width={100}
                    height={100}
                    className="w-2/4 mx-auto pointer-events-none"
                  />
                </div>
                <div>Please enter the amount to send</div>
                <div>
                  <div className="w-40 items-center justify-center border border-white/50 flex gap-1 rounded-lg p-2 mx-auto font-extrabold text-4xl">
                    &#8358;{" "}
                    <input
                      name="amount"
                      required
                      className="w-full outline-0 ring-0 focus-within:outline-0"
                      placeholder="50,000"
                      type="tel"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-center items-center gap-2">
                    {/* Receiver: */}
                    <div className="flex items-center gap-2">
                      <Image
                        src={userInfo?.avatar}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="text-sm font-bold">
                        {userInfo?.fname} {userInfo?.lname}
                      </div>
                    </div>
                  </div>
                  <div className="flex pt-2 justify-center text-xs items-center gap-2">
                    Birthday Date:
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-bold">
                      {monthName(userInfo?.dob.split(" ")[0].split("-")[1])}{" "}
                        {userInfo?.dob.split(" ")[0].split("-")[2]}
                        <span className="text-xs relative bottom-1">
                          {prefix(userInfo)}
                        </span>
                       
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex gap-3">
                    <button
                      disabled={proccessingFund}
                      className="flex-grow cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"
                    >
                      {" "}
                      {proccessingFund ? "Proccessing..." : "Send Gift"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </AppModal>
        )}
      </div>

      <div className="md:px-5 md:py-2 h-full">
        <div className="flex flex-col h-full bg-gray-50/80 border backdrop-blur-lg border-gray-200 overflow-hidden rounded-xl">
          <div className="flex-grow">
            <div className="space-y-4">
              <div>
                <AppLink
                  active={active}
                  text={"Home"}
                  icon={<BsFillGridFill />}
                />
                <AppLink
                  active={active}
                  text={"Birthday Event"}
                  icon={<FaCalendarAlt />}
                />
                <AppLink
                  active={active}
                  text={"Wallet"}
                  icon={<PiWalletFill />}
                />
                <AppLink
                  active={active}
                  text={"Subscriptions"}
                  icon={<IoIosCard />}
                />
                <AppLink
                  active={active}
                  text={"Referral"}
                  icon={<HiMiniUserGroup />}
                />
                <AppLink
                  active={active}
                  text={"Profile"}
                  icon={<FaUserAlt />}
                />
              </div>
              <div className="divition"></div>
              <div>
                <div className="p-3">Shop</div>
                <div>
                  <AppLink
                    active={active}
                    text={"Products"}
                    icon={<IoStorefrontOutline />}
                  />
                  <AppLink
                    active={active}
                    text={"Orders"}
                    icon={<GiShoppingBag />}
                  />
                </div>
              </div>
              <div className="divition"></div>
              <div>
                <AppLink active={active} text={"Settings"} icon={<FaCog />} />
                <div
                  onClick={siOut}
                  className="flex cursor-pointer px-3 py-2 text-gray-500 items-center gap-1"
                >
                  <ImExit />
                  <div>Log Out</div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <Image alt="img" src={img} className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}

export default SideNav;
