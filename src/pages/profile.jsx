import AppLayout from "@/components/layouts/appLayout";
import AppInput from "@/components/organisms/AppInput";
import AppModal from "@/components/organisms/AppModal";
import React, { useState, useEffect } from "react";
import { MdMail, MdExplore } from "react-icons/md";
import { HiUser } from "react-icons/hi2";
import { ImPhone, ImSpinner } from "react-icons/im";
import {
  FaMap,
  FaCalendarAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaLink,
} from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { TfiAngleLeft } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import serialize from "@/hooks/Serialize";
import { fetchDashBoardData, updateProfile } from "@/services/authService";

import { SignInAuth } from "@/hooks/Auth";
import Image from "next/image";
import { API_BASE_URL, TOKEN } from "@/services/httpService";
import { BsCamera } from "react-icons/bs";
import axios from "axios";

function Profile() {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [proccessing, setProccessing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const uzer = useSelector((state) => state.User.value);
  const user = uzer?.user;
  const [dashboardData, setDashboardData] = useState({});
  const [selectedUpdateImage, setSelectedUpdateImage] = useState(user?.avatar);
  const [savingImg, setSavingImg] = useState(false);
  const [changed, setChanged] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const headers = { Authorization: TOKEN };

  const uploadUpdateImg = async (e) => {
    setChanged(true);
    if (e.target.files && e.target.files.length > 0) {
      setSelectedUpdateImage(e.target.files[0]);
      updateAvatar(e);
    }
  };

  const fetchData = async () => {
    const { status, data } = await fetchDashBoardData();
    status && setDashboardData(data?.data);
  };

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && navigator.share);
    fetchData();
  }, []);

  const updateAvatar = async (e) => {
    console.log(e.target.files[0]);

    const images = e.target.files[0];
    const formdata = new FormData();
    formdata.append(`avatar`, images);
    setSavingImg(true);
    await axios
      .post(`${API_BASE_URL}app/profile/change_avatar`, formdata, { headers })
      .then((res) => {
        const data = {
          bearer_token: uzer?.bearer_token,
          user: res?.data?.data[0],
        };

        res?.status && SignInAuth({ data }, dispatch);
      });
    setSavingImg(false);
  };

  const update = async (e) => {
    e.preventDefault();
    const payload = serialize(e.target);
    setProccessing(true);
    const { status, data: res } = await updateProfile(payload);

    const data = {
      bearer_token: uzer?.bearer_token,
      user: res?.data[0],
    };

    status && SignInAuth({ data }, dispatch);

    setProccessing(false);
  };

  const shareProfile = () => {
    setShowShareModal(true);
  };

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}?shared_profile=${
        user?.referral_id || user?.email
      }`;
    }
    return "";
  };

  const getShareText = () => {
    return `Hey friends & family! 🎂 It's my birthday! Send love and gift money via my Bigdaymi profile: ${getShareUrl()}. Check out my pic—it's easy, secure, and means so much! Thanks for celebrating! 🥳 #BigdaymiBirthday #GiftMe`;
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      getShareUrl()
    )}&quote=${encodeURIComponent(getShareText())}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      getShareText()
    )}&url=${encodeURIComponent(getShareUrl())}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      getShareUrl()
    )}&summary=${encodeURIComponent(getShareText())}`;
    window.open(url, "_blank", "width=600,height=400");
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(getShareText())}`;
    window.open(url, "_blank");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = getShareText();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user?.fname} ${user?.lname}'s Profile`,
          text: getShareText(),
          url: getShareUrl(),
        });
        setShowShareModal(false);
      } catch (err) {
        // User cancelled or error occurred
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback to copy if Web Share API is not available
      copyToClipboard();
    }
  };
  // console.log(user);

  return (
    <AppLayout active="profile" title="Profile">
      <div className="p-3 space-y-4">
        <div className="">
          {editMode && (
            <div
              onClick={() => setEditMode(false)}
              className="flex items-center gap-2 pb-3 cursor-pointer"
            >
              <TfiAngleLeft /> Go Back
            </div>
          )}
          <div className="">
            <div className="h-56 profilebg rounded-lg relative">
              <div className="w-8 h-8 cursor-pointer bg-amber-500 rounded-full absolute bottom-4 right-4"></div>
            </div>

            <div className="py-6 space-y-7 lg:space-y-0 lg:flex pl-4 md:pl-16">
              <div className="flex-grow flex items-center">
                <div className="relative w-48">
                  <div className="sm:absolute w-32 h-32 md:w-44 md:h-44 rounded-full -bottom-3 sm:-bottom-9">
                    <div className="relative h-full w-full">
                      <div className="w-full h-full overflow-hidden rounded-full bg-amber-200">
                        <Image
                          src={
                            changed
                              ? URL.createObjectURL(selectedUpdateImage)
                              : selectedUpdateImage === "avatar.png" ||
                                selectedUpdateImage === null
                              ? logo
                              : selectedUpdateImage
                          }
                          alt={user?.fname}
                          draggable={false}
                          className="pointer-events-none w-full h-full rounded-full"
                          width={"150"}
                          height={"150"}
                        />
                      </div>
                      {!savingImg && (
                        <div
                          onClick={() =>
                            document.querySelector("#imgTwo").click()
                          }
                          className="absolute flex items-center justify-center w-8 h-8 bg-amber-500 rounded-full sm:bottom-3 sm:right-3 bottom-0 right-0 cursor-pointer text-white"
                        >
                          <BsCamera />
                        </div>
                      )}
                      <input
                        name="image"
                        id="imgTwo"
                        onChange={(e) => uploadUpdateImg(e)}
                        type="file"
                        className="opacity-0 absolute"
                        accept="image/png, image/gif, image/jpeg"
                      />
                      {savingImg && (
                        <div className="bg-white flex items-center justify-center text-white text-2xl absolute h-full rounded-full w-full top-0 right-0 bg-opacity-5 backdrop-blur-md">
                          <ImSpinner className="animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="font-semibold border-l-2  border-amber-400 text-xs px-5">
                  <div className="font-bold">
                    {user?.fname} {user?.lname}
                  </div>
                  <div className="">+234 901827464</div>
                  <div className="">{user?.email}</div>
                </div>
              </div>
              {!editMode && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-7 cursor-pointer text-xs disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"
                  >
                    Edit Profile
                  </button>

                  {dashboardData?.count_active_subscriptions > 0 && (
                    <div
                      onClick={shareProfile}
                      className="px-7 cursor-pointer text-xs disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"
                    >
                      Share birthday link
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-3 bg-white/60 border border-gray-200 p-5 rounded-xl">
          <div className="font-bold">Personal Info</div>
          <form onSubmit={update}>
            <div className="grid sm:grid-cols-2 gap-4">
              <AppInput
                disabled={!editMode}
                defaultValue={user?.fname}
                placeholder="e.g Chisomaga"
                name="fname"
                required
                icon={<HiUser />}
                label="First Name"
              />
              <AppInput
                disabled={!editMode}
                defaultValue={user?.lname}
                placeholder="e.g Diala"
                name="lname"
                required
                icon={<HiUser />}
                label="Last Name"
              />
              <AppInput
                disabled={!editMode}
                defaultValue={user?.phone}
                placeholder="e.g 0901827464"
                name="phone"
                required
                icon={<ImPhone />}
                label="Phone"
              />
              <AppInput
                placeholder="e.g email@gmail.com"
                defaultValue={user?.email}
                name="email"
                disabled
                type="mail"
                icon={<MdMail />}
                required
                label="Email"
              />
              <AppInput
                disabled
                placeholder="Country"
                defaultValue={user?.country}
                name="country"
                icon={<FaMap />}
                required
                label="Country"
              />
              <AppInput
                disabled={!editMode}
                placeholder="State"
                defaultValue={user?.state}
                name="state"
                icon={<MdExplore />}
                required
                label="State"
              />
              <AppInput
                disabled={!editMode}
                placeholder="City"
                name="city"
                defaultValue={user?.city}
                icon={<FaMapLocation />}
                required
                label="City"
              />
              <AppInput
                disabled
                name="dob"
                defaultValue={user?.dob.split(" ")[0]}
                icon={<FaCalendarAlt />}
                required
                label="Date of Birth"
              />
              {editMode && (
                <div className="grid col-span-1 sm:col-span-2 lg:col-span-1 sm:grid-cols-2 gap-4">
                  <div className="">
                    <div className="flex">
                      <div
                        onClick={() => setEditMode(false)}
                        className="px-4 cursor-pointer w-full text-center border border-amber-500 text-amber-500 rounded-lg py-3"
                      >
                        Cancel
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <button
                        disabled={proccessing}
                        className="px-7 w-full cursor-pointer disabled:cursor-none disabled:bg-amber-500/35 shadow-md bg-amber-500 text-white rounded-lg py-3"
                      >
                        {" "}
                        {proccessing ? "Proccessing..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <AppModal
        mode={showShareModal}
        withClose={() => setShowShareModal(false)}
      >
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold">Share birthday link</h3>
            <p className="text-sm text-gray-600 mt-1">
              Share {user?.fname}'s profile with others
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {canShare && (
              <button
                onClick={shareNative}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                <FaLink className="text-2xl" />
                <span className="text-xs font-medium">Share</span>
              </button>
            )}

            <button
              onClick={shareToFacebook}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaFacebook className="text-2xl" />
              <span className="text-xs font-medium">Facebook</span>
            </button>

            <button
              onClick={shareToTwitter}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
            >
              <FaTwitter className="text-2xl" />
              <span className="text-xs font-medium">Twitter</span>
            </button>

            <button
              onClick={shareToLinkedIn}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <FaLinkedin className="text-2xl" />
              <span className="text-xs font-medium">LinkedIn</span>
            </button>

            <button
              onClick={shareToWhatsApp}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaWhatsapp className="text-2xl" />
              <span className="text-xs font-medium">WhatsApp</span>
            </button>

            <button
              onClick={copyToClipboard}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <FaLink className="text-2xl" />
              <span className="text-xs font-medium">
                {linkCopied ? "Copied!" : "Copy Link"}
              </span>
            </button>
          </div>
        </div>
      </AppModal>
    </AppLayout>
  );
}

export default Profile;
