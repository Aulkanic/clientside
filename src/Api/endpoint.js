const Endpoints = {
    FETCH_SCHOCATEGORY:"scholar/schoCat1",
    CHANGE_PASSWORD:"userProf/ChangePassword",
    FETCH_USER_BY_ID:"userProf/UserAccounts",
    FETCH_ACCOUNTS:"userProf/UserAccounts",
    FETCH_SCHOLAR_CATEGORY:"scholar/schoCat1",
    CREATE_SCHOLAR:"scholar/createScho",
    FETCH_NEWS:"news/newsinfo",
    FETCH_NOTIF:"news/Notification/",
    FETCH_UNREADNOTIF:"news/UnreadNotification/",
    READ:"news/ReadNotif",
    FETCH_ADMIN:"admin/login",
    LOGIN_USER:"user/login",
    CHANGE_PROFILE:'userProf/profile',
    FIND_REGISTEREDACC:'userProf/Acclisted/',
    FETCH_ANNOUNCEMENTS:'announce/Announced',
    CREATE_APPFORM:'personalinfo/create',
    FETCH_PERSONALINFO:'personalinfo/PA/',
    FETCH_PROFILEBYUSER: 'userProf/getPROFILE/',
    CREATE_REGISTRY: 'user/create',
    FETCH_USER:'user/',
    FETCH_TRIVIA: 'trivia/TriviaoftheDay',
    UPLOAD_REQUIREMENTS: 'requirements/uploadRequirement',
    LIST_REQUIREMENTS: 'documents/Requirements',
    FETCH_SUBMITTED: 'requirements/',
    EDIT_SUBMITTED: 'requirements/Edit',
    DELETE_SUBMITTED: 'requirements/Delete',
    FETCH_FAMLIST: 'personalinfo/',
    UPDATE_USERINFO: 'personalinfo/update',
    CHECK_FAM: 'personalinfo/FamilyCode',
    FETCH_APPLICANTSINFO: 'personalinfo/ApplicantFdetails/',
    REGSITRY_OTP: 'OTP/RegistryOtp',
    RESEND_OTP: 'OTP/ResendOtp',
    VALIDATE_OTP: 'OTP/ValidateOtp',
    VALIDATE_USEROTP: 'OTP/ValidateUserOtp',
    FETCH_USERACCS: 'OTP/ForgotPassword',
    GENERATE_OTP: 'OTP/GenerateOtp',
    APKEmail: 'OTP/EmailAPK',
    CHANGE_PASSWORDBYOTP: 'OTP/ChangePassword',
    FETCH_BMCCSCHOLARINFO: 'BMCCScholar/SchoInfo/',
    FETCH_BMCCSCHOLARCODE: 'BMCCScholar/Renew/',
    FETCH_RECEIVER: 'BMCCScholar/ReceiverInfo',
    SET_RECEIVER: 'BMCCScholar/GuardianReceiver',
    FETCH_USERAPPOINTMENT: 'Appointment/appointmentSched/',
    USER_LOGOUT:'user/Logout',
    FFETCH_COLOR:'Dynamic/Colorslist',
    FETCH_WEBSITE:"admin/WebImg",
    LOGOS:'Dynamic/Logo',
    CANGO:'Appointment/Cango',
    FETCH_FAQS:'Faqs/Fetch',
    FETCH_RULE:'Dynamic/Rulelist',
    APPLICATION_FORM:'ApplicationForm/Form',
    USER_ACTIVITY: 'admin/Userlog',
    SET_RENEW:'RenewalForm/FillRenewal',
    SET_RENEW1:'RenewalForm/FillRenewal1',
    FETCH_RENEW:'RenewalForm/YearlyRenew',
    SUBMITRENEWALACAD:'RenewalForm/Submit/Renewal/Update',
    SUBMITRENEWALREQ:'RenewalForm/Submit/Renewal/Requirement',
    NEWS_ANNOUNCE:'announce/NewsAndAnnouncement',
    SCANQR:'personalinfo/QRcode',
    ACADEMICYEARSCHO: 'payout/',
    SET_PAYRECEIVER:'payout/set/receiver',
    REMOVE_PAYRECEIVER:'payout/delete/receiverOf',
    RENEWALACADEMIC:'RenewalForm/All'

}

export default Endpoints