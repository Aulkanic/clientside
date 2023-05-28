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
export const DeleteSub = {
    DELETE_SUB: (data) => axiosInstance.delete(Endpoints.DELETE_SUBMITTED,data)
}
