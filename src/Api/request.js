import axiosInstance from "./axios";
import Endpoints from "./endpoint";

export const ScholarCategory = {

    ScholarshipProgram: () => axiosInstance.get(Endpoints.FETCH_SCHOCATEGORY)

}

export const Change_Password = {

    CHANGE_PASSWORD: (data) => axiosInstance.patch(Endpoints.CHANGE_PASSWORD,data)
}

export const ScholarsRequest = {

    ALL_SCHOLARS: () => axiosInstance.get(Endpoints.FETCH_SCHOLARS)
}

export const loginUserAcc = {
    USER_LOGIN: (data) => axiosInstance.post(Endpoints.LOGIN_USER,data)
}
export const ChangingProfile = {
    CHANGE_PROFILE: (value) => axiosInstance.patch(Endpoints.CHANGE_PROFILE,value)
}
export const FetchingAnnouncement = {
    FETCH_ANNOUNCEMENT: () => axiosInstance.get(Endpoints.FETCH_ANNOUNCEMENTS)
}
export const FetchingPersonal = {
    FETCH_PERSONA: (data) => axiosInstance.get(Endpoints.FETCH_PERSONALINFO+data)
}
export const FetchingProfileUser = {
    FETCH_PROFILEUSER: (data) => axiosInstance.get(Endpoints.FETCH_PROFILEBYUSER+data)
}
export const FetchingNews = {
    FETCH_NEWS: () => axiosInstance.get(Endpoints.FETCH_NEWS)
}
export const CreatingRegistry = {
    CREATE_REGISTRY: (data) => axiosInstance.post(Endpoints.CREATE_REGISTRY,data)
}
export const FetchingTrivia = {
    FETCH_TRIVIA: () => axiosInstance.get(Endpoints.FETCH_TRIVIA)
}
export const FetchingUser = {
    FETCH_USER: () => axiosInstance.get(Endpoints.FETCH_USER)
}
export const UploadingDocs = {
    UPLOAD_DOCS: (data) => axiosInstance.post(Endpoints.UPLOAD_REQUIREMENTS,data)
}
export const ListofReq = {
    FETCH_REQUIREMENTS: () => axiosInstance.get(Endpoints.LIST_REQUIREMENTS)
}
export const ListofSub = {
    FETCH_SUB: (data) => axiosInstance.get(Endpoints.FETCH_SUBMITTED+data)
}
export const EditSub = {
    EDIT_SUB: (data) => axiosInstance.patch(Endpoints.EDIT_SUBMITTED,data)
}
export const EditUserinfo = {
    EDIT_USERINFO: (data) => axiosInstance.patch(Endpoints.UPDATE_USERINFO,data)
}
export const DeleteSub = {
    DELETE_SUB: (data) => axiosInstance.post(Endpoints.DELETE_SUBMITTED,data)
}
export const ApplyForm = {
    CREATE_APPINFO: (data) => axiosInstance.post(Endpoints.CREATE_APPFORM,data)
}
export const FetchingFamily = {
    FETCH_FAM: () => axiosInstance.get(Endpoints.FETCH_FAMLIST)
}
export const FetchingApplicantsInfo = {
    FETCH_INFO: (data) => axiosInstance.get(Endpoints.FETCH_APPLICANTSINFO+data)
}
export const RegistryOtp = {
    REGISTRY_OTP: (data) => axiosInstance.post(Endpoints.REGSITRY_OTP,data)
}
export const ResendOtp = {
    RESEND_OTP: (data) => axiosInstance.post(Endpoints.RESEND_OTP,data)
}
export const ValidateOtp = {
    VALIDATE_OTP: (data) => axiosInstance.post(Endpoints.VALIDATE_OTP,data)
}
export const ValidateUserOtp = {
    VALIDATE_USEROTP: (data) => axiosInstance.post(Endpoints.VALIDATE_USEROTP,data)
}
export const GetUserAcc = {
    FETCH_USERACCS: (data) => axiosInstance.get(Endpoints.FETCH_USERACCS,data)
}
export const GenerateOtp = {
    GENERATE_OTP: (data) => axiosInstance.post(Endpoints.GENERATE_OTP,data)
}
export const ChangePassbyOtp = {
    CHANGEPASSWORD_BYOTP: (data) => axiosInstance.post(Endpoints.CHANGE_PASSWORDBYOTP,data)
}
export const FetchingBmccSchoinfo = {
    FETCH_SCHOLARSINFO: (data) => axiosInstance.get(Endpoints.FETCH_BMCCSCHOLARINFO+data)
}
export const FetchingUserappoint = {
    FETCH_USERAPPOINTMENT: (data) => axiosInstance.get(Endpoints.FETCH_USERAPPOINTMENT+data)
}
export const Logoutuser = {
    USER_LOGOUT: (data) => axiosInstance.post(Endpoints.USER_LOGOUT,data)
}
export const APK = {
    APKSEND: (data) => axiosInstance.post(Endpoints.APKEmail,data)
}
export const Colorlist = {
    FETCH_COLOR: () => axiosInstance.get(Endpoints.FFETCH_COLOR)
}
export const WebImg = {
    FETCH_WEB: () => axiosInstance.get(Endpoints.FETCH_WEBSITE)
}
export const Logos = {
    LOGOS: (data) => axiosInstance.patch(Endpoints.LOGOS,data)
}
export const UserCango = {
    Cango: (data) => axiosInstance.post(Endpoints.CANGO,data)
}
export const FetchFaqs = {
    FETCH_FAQS: () => axiosInstance.get(Endpoints.FETCH_FAQS)
}
export const Rulelist = {
    FETCH_RULE: () => axiosInstance.get(Endpoints.FETCH_RULE)
}
export const UserProflist = {
    FETCH_USER: () => axiosInstance.get(Endpoints.FETCH_ACCOUNTS)
}