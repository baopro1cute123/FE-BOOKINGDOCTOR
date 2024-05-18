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

const getPriceDoctorById = (doctorId) => {
    return axios.get(`/api/get-price-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppoinment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

const updateSpecialtyService = (data) => {
    return axios.put(`/api/update-specialty`, data)
}

const deleteSpecialtyService = (userId) => {
    return axios.delete(`api/delete-specialty`, {
        data: {
            id: userId
        }
    })
}


const getAllSpecialtyService = () => {
    return axios.get(`/api/get-all-specialty`)
}
const getDetailSpecialtyByIdService = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}

const updateClinicService = (data) => {
    return axios.put(`/api/update-clinic`, data)
}

const deleteClinicService = (userId) => {
    return axios.delete(`api/delete-clinic`, {
        data: {
            id: userId
        }
    })
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

const PostCancle = (data) => {
    return axios.post(`/api/cancle-booking`, data)
}

const getAllPatientServices = () => {
    return axios.get(`/api/get-all-patient`)

}
const getAllPatientByDoctorIdServices = (doctorId) => {
    return axios.get(`/api/get-all-patient-by-doctorId?doctorId=${doctorId}`)

}

const getAllPatientBookingServices = () => {
    return axios.get(`/api/get-all-patient-booking`)

}

const ChatBotServices = (message) => {
    return axios.post(`/api/message`, message)
}

const PaymentMoMoService = (price, token, doctorId) => {
    return axios.post(`/api/payment?price=${price}&token=${token}&doctorId=${doctorId}`)
}

const CheckPaymentMoMoService = (orderId) => {
    return axios.post(`/api/check-status-payment?orderId=${orderId}`)
}

const getAllRevenue = (startDate, endDate) => {
    return axios.get(`/api/get-all-revenue?startDate=${startDate}&endDate=${endDate}`)

}

const getAllRevenueByUserId = (startDate, endDate, userId) => {
    return axios.get(`/api/get-revenue-by-id?startDate=${startDate}&endDate=${endDate}&userId=${userId}`)

}

const getRevenueByUserId = (userId) => {
    return axios.get(`/api/get-all-revenue-by-id?userId=${userId}`)

}

export { ChatBotServices, CheckPaymentMoMoService, PaymentMoMoService, PostCancle, PostSendRemedy, createNewClinic, createNewSpecialty, createNewUserService, deleteClinicService, deleteSpecialtyService, deleteUserService, editUserService, getAllClinicService, getAllDoctorHomeService, getAllPatientBookingServices, getAllPatientByDoctorIdServices, getAllPatientForDoctor, getAllPatientServices, getAllRevenue, getAllRevenueByUserId, getAllSpecialtyService, getAllUsers, getAllcodeService, getDetailClinicByIdService, getDetailInforDoctor, getDetailSpecialtyByIdService, getExtraInforDoctorById, getPriceDoctorById, getProfileDoctorById, getRevenueByUserId, getScheduleDoctorByDate, getTopDoctorHomeService, handleLoginApi, postPatientBookAppoinment, postVerifyBookAppointment, saveBulkScheduleService, saveDetailDoctorService, updateClinicService, updateSpecialtyService };



