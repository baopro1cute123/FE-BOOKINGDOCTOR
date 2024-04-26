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
export { createNewUserService, deleteUserService, editUserService, getAllDoctorHomeService, getAllUsers, getAllcodeService, getDetailInforDoctor, getExtraInforDoctorById, getProfileDoctorById, getScheduleDoctorByDate, getTopDoctorHomeService, handleLoginApi, postPatientBookAppoinment, saveBulkScheduleService, saveDetailDoctorService };



