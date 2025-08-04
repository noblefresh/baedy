import { apiWithAuth, apiWithOutAuth, getApiResponse, getErrorResponse } from "./httpService";


export const pagination = (formData) => apiWithAuth.post(formData).then(getApiResponse).catch(getErrorResponse);
export const registerAPI = (formData) => apiWithOutAuth.post("/register", formData).then(getApiResponse).catch(getErrorResponse);
export const Applogin = (formData) => apiWithOutAuth.post("/login", formData).then(getApiResponse).catch(getErrorResponse);
export const sendOTP = (formData) => apiWithOutAuth.post("/recover/send_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const resendOTP = (formData) => apiWithOutAuth.post("/recover/resend_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const verifyOTP = (formData) => apiWithOutAuth.post("/recover/verify_otp", formData).then(getApiResponse).catch(getErrorResponse);
export const setNewPassword = (formData) => apiWithOutAuth.post("/recover/create_new_password", formData).then(getApiResponse).catch(getErrorResponse);


export const fetchDashBoardData = () => apiWithAuth.post("/app/dashboard/fetch").then(getApiResponse).catch(getErrorResponse);
export const payment = (payload) => apiWithAuth.post("/app/wallet/initialize-paystack", payload).then(getApiResponse).catch(getErrorResponse)
export const fetchWallet = () => apiWithAuth.get("/app/wallet/fetch").then(getApiResponse).catch(getErrorResponse)
export const addBank = (payload) => apiWithAuth.post("/app/wallet/add_bank_account", payload).then(getApiResponse).catch(getErrorResponse)
export const fetchBank = () => apiWithAuth.post("/app/wallet/fetch_bank").then(getApiResponse).catch(getErrorResponse)
export const withdrawal = (payload) => apiWithAuth.post("/app/wallet/withdraw", payload).then(getApiResponse).catch(getErrorResponse)
export const fetchpayStack = () => apiWithAuth.post("/app/wallet/paystack_banks").then(getApiResponse).catch(getErrorResponse)
export const fetchAccountName = (payload) => apiWithAuth.post("/app/wallet/fetch_account_name", payload).then(getApiResponse).catch(getErrorResponse)

export const giftUser = (payload) => apiWithAuth.post("/app/wallet/gift_user", payload).then(getApiResponse).catch(getErrorResponse)


export const subscribeUser = (payload) => apiWithAuth.post("/app/subscription/subscribe", payload).then(getApiResponse).catch(getErrorResponse)
export const fetchSubscribtions = () => apiWithAuth.post("/app/subscription/fetch").then(getApiResponse).catch(getErrorResponse)


export const fetchReferral = () => apiWithAuth.post("/app/referral/fetch").then(getApiResponse).catch(getErrorResponse)

export const fetchBirthdays = () => apiWithAuth.post("/app/birthday/fetch_birthdays").then(getApiResponse).catch(getErrorResponse)


export const fetchProfile = () => apiWithAuth.post("/app/profile/fetch").then(getApiResponse).catch(getErrorResponse)
export const updateProfile = (payload) => apiWithAuth.post("/app/profile/update", payload).then(getApiResponse).catch(getErrorResponse)
export const changeAvatar = () => apiWithAuth.post("/app/profile/change_avatar").then(getApiResponse).catch(getErrorResponse)
export const updatePassword = (payload) => apiWithAuth.post("/app/profile/update_password", payload).then(getApiResponse).catch(getErrorResponse)

export const deleteAccount = () => apiWithAuth.post("/app/profile/delete_account").then(getApiResponse).catch(getErrorResponse)




export const fetchActiveProducts = () => apiWithAuth.post("/app/shop/fetch_active_products").then(getApiResponse).catch(getErrorResponse)
export const fetchAllProducts = () => apiWithAuth.post("/app/shop/fetch_product").then(getApiResponse).catch(getErrorResponse)
export const fetchOrders = () => apiWithAuth.post("app/shop/fetch_orders").then(getApiResponse).catch(getErrorResponse)
export const rateOrder = (formData) => apiWithAuth.post("app/shop/rate_order", formData).then(getApiResponse).catch(getErrorResponse)
export const processOrder = (formData) => apiWithAuth.post("/app/shop/process_order", formData).then(getApiResponse).catch(getErrorResponse)


// 