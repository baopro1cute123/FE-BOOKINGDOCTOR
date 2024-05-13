import moment from 'moment';
import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import LoadingOverlay from 'react-loading-overlay';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import DatePicker from '../../../components/Input/DatePicker';
import { PostCancle, PostSendRemedy, getAllPatientForDoctor } from '../../../services/userService';
import { LANGUAGE } from '../../../utils';
import './ManagePatient.scss';
import RemedyModal from './RemedyModal';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        }
    }
    async componentDidMount () {
        this.getDataPatient()
        
    }

    getDataPatient = async () => {

        let {user} = this.props
        let {currentDate} = this.state
        let formatedDate = new Date(currentDate).getTime()
        let res = await getAllPatientForDoctor({
            doctorId : user.id,
            date: formatedDate,
        })
        if(res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    async componentDidUpdate( prevProps,prevState,snapshot){
    if(this.props.language !== prevProps.language ){
        
        }
}
    handleOnChangeDatePicker = (date) =>{
        this.setState({
            currentDate: date[0]
        },async ()=>{
           
            await this.getDataPatient()
        })
    }
    handleConfirm = (item) => {
        let date = new Date(parseInt(item.date)).toLocaleDateString()

        let data = {
            doctorId : item.doctorId,
            patientId : item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName : item.patientData.firstName,
            patientDate : item.date,
            emailDate: date
        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })
    }
    handleCancle = async (item) => {
        let date = new Date(parseInt(item.date)).toLocaleDateString()

        let res = await PostCancle({
            email:item.patientData.email,
            doctorId : item.doctorId,
            patientId : item.patientId,
            timeType :item.timeType,
            language: this.props.language,
            patientName : item.patientData.firstName,
            patientDate: date
        })
        if(res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success("Send success!")
            this.closeRemedyModal()
            await this.getDataPatient()
        }else{
            this.setState({
                isShowLoading: true
            })
            toast.error("Error !")
        }

    }
    closeRemedyModal= () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async(dataFromModal) => {

        let {dataModal} = this.state
        this.setState({
            isShowLoading: true
        })
        let res = await PostSendRemedy({
            email: dataFromModal.email,
            imgBase64 : dataFromModal.imgBase64,
            reason : dataFromModal.reason,
            doctorId : dataModal.doctorId,
            patientId : dataModal.patientId,
            timeType :dataModal.timeType,
            language: this.props.language,
            patientName : dataModal.patientName,
            patientDate: dataModal.patientDate,
            emailDate : dataModal.emailDate
            // thêm vào đây
        })
        if(res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success("Send success!")
            this.closeRemedyModal()
            await this.getDataPatient()
        }else{
            this.setState({
                isShowLoading: true
            })
            toast.error("Error !")
        }
    }
    render() {
        let {dataPatient, isOpenRemedyModal, dataModal} = this.state
        let {language}= this.props
        
        return (
            <>  <LoadingOverlay
            active={this.state.isShowLoading}
            spinner
            text='Loading ...'
        >
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value = {this.state.currentDate}
                                // selected = {this.state.currentDate}
                                // minDate = {yesterday}
                            /></div>
                        {dataPatient && dataPatient.length > 0 ?
                        <div className='col-12 table-manage-patient'>
                        <table id="customers" >
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Thời gian khám</th>
                        <th>Họ và tên</th>
                        <th>Địa chỉ Email</th>
                        <th>Giới tính</th>
                        <th>Địa chỉ</th>
                        <th>Actions</th>

                    </tr>
                    {dataPatient && dataPatient.length > 0 &&
                        dataPatient.map((item, index)=>{

                            let timeType = language === LANGUAGE.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                            let gender = language === LANGUAGE.VI ? item.patientData.genderData.valueVi : item.patientData.genderData.valueEn

                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{timeType}</td>
                                    <td>{item.patientData.firstName}</td>
                                    <td>{item.patientData.email}</td>
                                    <td>{gender}</td>
                                    <td>{item.patientData.address}</td>
                                    <td>
                                        <button className='mp-btn-confirm'
                                        onClick={()=> this.handleConfirm(item)}
                                        >Xác nhận</button>
                                         <button className='mp-btn-delete'
                                        onClick={()=> this.handleCancle(item)}
                                        >Hủy lịch</button>
                                    </td>
                                </tr>
                            )
                        }) 
                    }
                    </tbody>
                    </table>
                        </div>

                        :
                        <div className='no-data'>Không có lịch hẹn khám bệnh!</div>
                        }
                    </div>

                </div>
                <RemedyModal
                    isOpenModal={isOpenRemedyModal}
                    dataModal = {dataModal}
                    closeRemedyModal = {this.closeRemedyModal}
                    sendRemedy = {this.sendRemedy}
                />

                
                </LoadingOverlay>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user : state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
