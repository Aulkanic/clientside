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
    FETCH_USERACCS: (data) => axiosInstance.post(Endpoints.FETCH_USERACCS,data)
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
export const FetchingBmccSchocODE = {
    FETCH_SCHOLARSCODE: (data) => axiosInstance.get(Endpoints.FETCH_BMCCSCHOLARCODE+data)
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
export const ApplicationForm = {
    FETCH_FORM: () => axiosInstance.get(Endpoints.APPLICATION_FORM)
}
export const FindRegisteredUser = {
    FETCH_USERREG: (data) => axiosInstance.get(Endpoints.FIND_REGISTEREDACC+data)
}
export const FetchNotif = {
    FETCH_NOTIF: (data) => axiosInstance.get(Endpoints.FETCH_NOTIF+data)
}
export const FetchUnreadNotif = {
    FETCH_UNREADNOTIF: (data) => axiosInstance.get(Endpoints.FETCH_UNREADNOTIF+data)
}
export const ReadNotifi = {
    READ_NOTIFICATION: (data) => axiosInstance.post(Endpoints.READ,data)
}
export const UserActivity = {
    USER_LOG: (data) => axiosInstance.post(Endpoints.USER_ACTIVITY,data)
}
export const FillRenewal = {
    SET_RENEW: (data) => axiosInstance.post(Endpoints.SET_RENEW,data)
}
export const FillRenewal1 = {
    SET_RENEW1: (data) => axiosInstance.post(Endpoints.SET_RENEW1,data)
}
export const FetchRenewal = {
    FETCH_RENEW: () => axiosInstance.get(Endpoints.FETCH_RENEW)
}
export const CheckFamily = {
    CHECK_FAM: (data) => axiosInstance.post(Endpoints.CHECK_FAM,data)
}
export const NewsAndAnnouncement = {
    NEWS_ANNOUNCE: () => axiosInstance.get(Endpoints.NEWS_ANNOUNCE)
}
export const FetchingReceiver = {
    GET_RECEIVER: (data) => axiosInstance.post(Endpoints.FETCH_RECEIVER,data)
}
export const SetupReceiver = {
    SET_RECEIVER: (data) => axiosInstance.post(Endpoints.SET_RECEIVER,data)
}
export const ScanningQr = {
    QR_CODE: (data) => axiosInstance.post(Endpoints.SCANQR,data)
}
export const AcadmicyearListofScho ={
    LIST:(data) => axiosInstance.get(Endpoints.ACADEMICYEARSCHO+data)
}
export const SetPayeeReceiver = {
    SET:(data) => axiosInstance.post(Endpoints.SET_PAYRECEIVER,data)
}