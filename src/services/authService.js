import { apiWithAuth, apiWithOutAuth, getApiResponse, getErrorResponse } from "./httpService";


export const fetchUsers = (formData) => apiWithOutAuth.post("/fetch-user/").then(getApiResponse).catch(getErrorResponse);

// 
export const updateProfile = (formData) => apiWithOutAuth.post("/update-profile/", formData).then(getApiResponse).catch(getErrorResponse);
export const sendOtp = (formData) => apiWithOutAuth.post("/send-otp/", formData).then(getApiResponse).catch(getErrorResponse);
export const verifyOTPAPI = (formData) => apiWithOutAuth.post("/login-otp/", formData).then(getApiResponse).catch(getErrorResponse);
export const fetchExams = (params = {}) => apiWithAuth.get(`/api/v1/question_repo/exams/`, { params }).then(getApiResponse).catch(getErrorResponse);
export const fetchAnExam = (examId) => apiWithAuth.get(`/api/v1/question_repo/exams/${examId}/`).then(getApiResponse).catch(getErrorResponse);
export const takeAnExam = (examId) => apiWithAuth.get(`/api/v1/question_repo/take-mock/${examId}/`).then(getApiResponse).catch(getErrorResponse);
export const submitAnExam = (formData) => apiWithAuth.post(`/api/v1/question_repo/take-mock/${formData.id}/submit/`, formData.payload).then(getApiResponse).catch(getErrorResponse);
export const getReview = (examId) => apiWithAuth.get(`/api/v1/question_repo/review-mock/${examId}/`).then(getApiResponse).catch(getErrorResponse);


export const fetchMockExams = (params = {}) => apiWithAuth.get(`/api/v1/question_repo/take-mock`, { params }).then(getApiResponse).catch(getErrorResponse);