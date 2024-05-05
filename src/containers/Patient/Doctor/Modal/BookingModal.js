import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Modal } from 'reactstrap'; // Assuming you're using Reactstrap for modal components
import DatePicker from '../../../../components/Input/DatePicker';
import { postPatientBookAppoinment } from '../../../../services/userService';
import * as actions from '../../../../store/actions';
import { LANGUAGE } from '../../../../utils';
import ProfileDoctor from '../ProfileDoctor';
import './BookingModal.scss';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
           fullName : '',
           phonenumber: '',
           email: '',
           address: '',
           reason: '',
           birthday: '',
           doctorId: '',
           selectedGender : '',
           timeType: '',
           genders : '',

        }
    }
    componentDidMount () {
        this.props.getGenders()

    }

    handleOnChangInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = {...this.state}
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })

    }
    buildDataGender = (data) => {
        let result = []
        let language = this.props.language;

        if(data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                object.label = language === LANGUAGE.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }
  
    async componentDidUpdate( prevProps,prevState,snapshot){
        if(this.props.language !== prevProps.language ){
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if(this.props.genders !== prevProps.genders ){
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if(this.props.dataTime !== prevProps.dataTime){
            if(this.props.dataTime && !_.isEmpty(this.props.dataTime)){
                let doctorId = this.props.dataTime.doctorId
                let timeType = this.props.dataTime.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });

    }
    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime()
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)
        let res = await postPatientBookAppoinment({
            fullName : this.state.fullName,
            phonenumber: this.state.phonenumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            doctorId: this.state.doctorId,
            selectedGender : this.state.selectedGender.value,
            timeType : this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName,
        })
        if(res && res.errCode === 0) {
            toast.success('Booking a new appointment success')
            this.props.closeBookingModal()
        }else{
            toast.error('Booking error!')
        }
    }
    
    buildTimeBooking = (dataTime) => {
        let {language} = this.props;
        
        if(dataTime && !_.isEmpty(dataTime)){
            let time = language === LANGUAGE.VI ?
            dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            let date = language === LANGUAGE.VI ? moment.unix(+dataTime.date /1000).format('dddd - DD/MM/YYYY')
            : moment.unix(+dataTime.date /1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`
        }
        return ``
        
    }
    buildDoctorName = (dataTime) => {
        let {language} = this.props;
        
        if(dataTime && !_.isEmpty(dataTime)){
            let name = language === LANGUAGE.VI ?
            `${dataTime.doctorData.lastName} : ${dataTime.doctorData.firstName}`
            : `${dataTime.doctorData.firstName} : ${dataTime.doctorData.lastName}`
            
            return name
        }
        return ``
        
    }
    render() {
            let {isOpenModal, closeBookingModal, dataTime} = this.props
            let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ''
            return (
            <>
                <Modal 
                    isOpen={isOpenModal} 
                    className={'booking-modal-container'}
                    size='lg'
                    centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'>
                                <FormattedMessage id='patient.booking-modal.title' />
                            </span>
                            <span className='right'
                                onClick={closeBookingModal}
                            ><i className="fas fa-times"></i></span>

                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(dataTime)} */}
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorId = {doctorId}
                                    isShowDescriptionDoctor = {false}
                                    dataTime = {dataTime}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>
                                    <FormattedMessage id='patient.booking-modal.fullname' />

                                    </label>
                                    <input className='form-control' 
                                        value={this.state.fullName}
                                        onChange={(event)=> this.handleOnChangInput(event, 'fullName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                    <FormattedMessage id='patient.booking-modal.phonenumber' />

                                    </label>
                                    <input className='form-control' 
                                        value={this.state.phonenumber}
                                        onChange={(event)=> this.handleOnChangInput(event, 'phonenumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                    <FormattedMessage id='patient.booking-modal.email' />
                                    </label>
                                    <input className='form-control' 
                                        value={this.state.email}
                                        onChange={(event)=> this.handleOnChangInput(event, 'email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                    <FormattedMessage id='patient.booking-modal.address' />
                                    </label>
                                    <input className='form-control' 
                                        value={this.state.address}
                                        onChange={(event)=> this.handleOnChangInput(event, 'address')}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label>
                                    <FormattedMessage id='patient.booking-modal.reason' />
                                    </label>
                                    <input className='form-control' 
                                        value={this.state.reason}
                                        onChange={(event)=> this.handleOnChangInput(event, 'reason')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                    <FormattedMessage id='patient.booking-modal.date' />
                                    </label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleOnChangeDatePicker}
                                        value = {this.state.birthday}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                    <FormattedMessage id='patient.booking-modal.gender' />
                                    </label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}/>
                            </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <button className='btn-booking-confirm'
                            onClick={()=>this.handleConfirmBooking()}>
                            <FormattedMessage id='patient.booking-modal.save' />
                            </button>
                            <button 
                            onClick={closeBookingModal}
                            className='btn-booking-cancle'>
                            <FormattedMessage id='patient.booking-modal.cancel' />
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
   
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders : state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
