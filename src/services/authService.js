import { apiWithAuth, apiWithOutAuth, getApiResponse, getErrorResponse } from "./httpService";


export const pagination = (formData) => apiWithAuth.post(formData).then(getApiResponse).catch(getErrorResponse);
export const registerAPI = (formData) => apiWithOutAuth.post("/register", formData).then(getApiResponse).catch(getErrorResponse);
export const Applogin = (formData) => apiWithOutAuth.post("/login", formData).then(getApiResponse).catch(getErrorResponse);
export const sendOTP = (formData) => apiWithOutAuth.post("/recover/send_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const resendOTP = (formData) => apiWithOutAuth.post("/recover/resend_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const verifyOTP = (formData) => apiWithOutAuth.post("/recover/verify_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const setNewPassword = (formData) => apiWithOutAuth.post("/recover/create_new_password", formData).then(getApiResponse).catch(getErrorResponse);


export const fetchDashBoardData = () => apiWithAuth.post("/app/dashboard/fetch").then(getApiResponse).catch(getErrorResponse);



export const payment = () => apiWithAuth.post("/app/wallet/initialize-paystack").then(getApiResponse).catch(getErrorResponse)
export const fetchWallet = () => apiWithAuth.get("/app/wallet/fetch").then(getApiResponse).catch(getErrorResponse)
export const addBank = () => apiWithAuth.post("/app/wallet/add_bank_account").then(getApiResponse).catch(getErrorResponse)
export const fetchBank = () => apiWithAuth.post("/app/wallet/fetch_bank").then(getApiResponse).catch(getErrorResponse)
export const withdrawal = () => apiWithAuth.post("/app/wallet/withdraw").then(getApiResponse).catch(getErrorResponse)
export const giftUser = () => apiWithAuth.post("/app/wallet/gift_user").then(getApiResponse).catch(getErrorResponse)


export const subscribeUser = () => apiWithAuth.post("/app/subscription/subscribe").then(getApiResponse).catch(getErrorResponse)
export const fetchSubscribtions = () => apiWithAuth.post("/app/subscription/fetch").then(getApiResponse).catch(getErrorResponse)



export const fetchReferral = () => apiWithAuth.post("/app/referral/fetch").then(getApiResponse).catch(getErrorResponse)


export const fetchBirthdays = () => apiWithAuth.post("/app/birthday/fetch_birthdays").then(getApiResponse).catch(getErrorResponse)



export const fetchProfile = () => apiWithAuth.post("/app/profile/fetch").then(getApiResponse).catch(getErrorResponse)
export const updateProfile = () => apiWithAuth.post("/app/profile/update").then(getApiResponse).catch(getErrorResponse)
export const changeAvatar = () => apiWithAuth.post("/app/profile/change_avatar").then(getApiResponse).catch(getErrorResponse)
export const updatePassword = () => apiWithAuth.post("/app/profile/update_password").then(getApiResponse).catch(getErrorResponse)

export const deleteAccount = () => apiWithAuth.post("/app/profile/delete_account").then(getApiResponse).catch(getErrorResponse)