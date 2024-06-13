import { toast } from "react-toastify";
import { PaymentMoMoService, createNewUserService, deleteUserService, editUserService, getAllClinicService, getAllDoctorHomeService, getAllSpecialtyService, getAllUsers, getAllcodeService, getTopDoctorHomeService, saveDetailDoctorService } from "../../services/userService";
import actionTypes from './actionTypes';

export const fetchGenderStart =() => {
    
    return async(dispatch, getState) => {
        try {
            dispatch(
                {type : actionTypes.FETCH_GENDER_START}
            )
            let res = await getAllcodeService("GENDER");
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data));
            }
            else{
                dispatch(fetchGenderFailed());
            }
            
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderStart", e)
        }
    }
    
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data : genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchPositionStart =() => {
    
    return async(dispatch, getState) => {
        try {
            let res = await getAllcodeService("POSITION");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data));
            }
            else{
                dispatch(fetchPositionFailed());
            }
            
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log("fetchGenderStart", e)
        }
    }
    
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data : positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleStart =() => {
    
    return async(dispatch, getState) => {
        try {
            let res = await getAllcodeService("ROLE");


            if(res && res.errCode === 0){
                dispatch(fetchRoleSuccess(res.data));
            }
            else{
                dispatch(fetchRoleFailed());
            }
            
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log("fetchGenderStart", e)
        }
    }
    
}


export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data : roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewUser = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                toast.success("Tạo mới người dùng thành công !")
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart()) ;
            }
            else{
                dispatch(saveUserFailed());
            }
            
        } catch (e) {
            dispatch(saveUserFailed());
            console.log("saveUserFailed", e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUserStart =() => {
    
    return async(dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");


            if(res && res.errCode === 0){
                dispatch(fetchAllUserSuccess(res.users.reverse()));
            }
            else{
                dispatch(fetchAllUserFailed());
            }
            
        } catch (e) {
            dispatch(fetchAllUserFailed());
            console.log("fetchGenderStart", e)
        }
    }
    
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users : data ,
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})


export const deleteAUser = (userId) => {
    return async(dispatch, getState) => {
        try {
            let res = await deleteUserService(userId.id);
            if(res && res.errCode === 0){
                toast.success("Xóa người dùng thành công !")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart()) ;
            }
            else{
                toast.error("Xóa người dùng thất bại !")
                dispatch(deleteUserFailed());
            }
            
        } catch (e) {
            toast.error("Danh sách người dùng thất bại")

            dispatch(deleteUserFailed());
            console.log("saveUserFailed", e)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const editAUser = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if(res && res.errCode === 0){
                toast.success("Cập nhật người dùng thành công !")
                dispatch(EditUserSuccess());
                dispatch(fetchAllUserStart()) ;
            }
            else{
                toast.error("Cập nhật người dùng thất bại!")
                dispatch(EditUserFailed());
            }
            
        } catch (e) {
            toast.error("Cập nhật tất cả người dùng thất bại!")

            dispatch(EditUserFailed());
            console.log("saveUserFailed", e)
        }
    }
}
export const EditUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const EditUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService("7")
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    data : res.data
                });
            }
            else{
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
                });
            }
            
        } catch (e) {

            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED
            });
            console.log("saveUserFailed", e)
        }
    }
}

export const fetchAllDoctor = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllDoctorHomeService()
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    data : res.data
                });
            }
            else{
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                });
            }
            
        } catch (e) {

            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            });
            console.log("DoctorsFailed", e)
        }
    }
}
export const saveDetailDoctor = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            if(res && res.errCode === 0){
                toast.success("Lưu thành công !")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                    data : res.data
                });
            }
            else{
                toast.error("Lưu thất bại !")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                });
            }
            
        } catch (e) {
            toast.error("Thất bại")
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            });
            console.log("DoctorsFailed", e)
        }
    }
}


export const fetchAllScheduleTime = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllcodeService('TIME')
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS,
                    data : res.data
                });
            }
            else{
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILED
                });
            }
            
        } catch (e) {

            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILED
            });
            console.log("DoctorsFailed", e)
        }
    }
}

export const fetchPayMoMo = (price, doctorId, token) => {
    return async(dispatch, getState) => {
        try {
            let res = await PaymentMoMoService(price, doctorId, token)
            if(res && res.errCode === 0){
                dispatch({
                    type: actionTypes.FETCH_PAYMOMO_SUCCESS,
                    data : res.data
                });
            }
            else{
                dispatch({
                    type: actionTypes.FETCH_PAYMOMO_FAILED
                });
            }
            
        } catch (e) {

            dispatch({
                type: actionTypes.FETCH_PAYMOMO_FAILED
            });
            console.log("DoctorsFailed", e)
        }
    }
}


export const getRequiredDoctorInfor =() => {
    
    return async(dispatch, getState) => {
        try {
            dispatch(
                {type : actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START}
            )
            let resPrice = await getAllcodeService("PRICE");
            let resPayment = await getAllcodeService("PAYMENT");
            let resProvince = await getAllcodeService("PROVINCE");
            let resSpecialty = await getAllSpecialtyService()
            let resClinic = await getAllClinicService()

            if(resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0

            ){  
                let data = {
                    resPrice : resPrice.data,
                    resPayment: resPayment.data,
                    resProvince : resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            }
            else{
                dispatch(fetchRequiredDoctorInforFailed());
            }
            
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log("fetchDoctorPriceFailed", e)
        }
    }
    
}

export const fetchRequiredDoctorInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data : data
})

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIED
})


