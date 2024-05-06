import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
const editUserService = (data) => {
    return axios.put('/api/edit-user',data )
}

const getAllcodeService = (inputdtype) => {
    return axios.get(`/api/allcode?type=${inputdtype}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)

}

const getAllDoctorHomeService = () => {
    return axios.get(`/api/get-all-doctors`)

}
const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-infor-doctors`, data)

}

const getDetailInforDoctor =  (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
    
}

const saveBulkScheduleService = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)

}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppoinment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}
const creteNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}
const getAllSpecialtyService = () => {
    return axios.get(`/api/get-all-specialty`)
}
const getDetailSpecialtyByIdService = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const creteNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}
const getAllClinicService = () => {
    return axios.get(`/api/get-all-clinic`)
}
const getDetailClinicByIdService = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const PostSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}

export {PostSendRemedy, getAllPatientForDoctor,createNewUserService, creteNewClinic, creteNewSpecialty, deleteUserService, editUserService, getAllClinicService, getAllDoctorHomeService, getAllSpecialtyService, getAllUsers, getAllcodeService, getDetailClinicByIdService, getDetailInforDoctor, getDetailSpecialtyByIdService, getExtraInforDoctorById, getProfileDoctorById, getScheduleDoctorByDate, getTopDoctorHomeService, handleLoginApi, postPatientBookAppoinment, postVerifyBookAppointment, saveBulkScheduleService, saveDetailDoctorService };



