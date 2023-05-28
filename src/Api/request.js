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
    CHANGE_PROFILE: (data) => axiosInstance.post(Endpoints.CHANGE_PROFILE+data)
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
    CREATE_REGISTRY: (data) => axiosInstance.post(Endpoints.CREATE_REGISTRY)
}

