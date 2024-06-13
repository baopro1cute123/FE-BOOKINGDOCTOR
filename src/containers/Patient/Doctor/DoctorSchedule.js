import moment from 'moment';
import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { LANGUAGE } from '../../../utils/constant';
import './DoctorSchedule.scss';
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays : [],
            allAvalableTime : [],
            isOpenModalBooking: false,
            dataScheduleTimeModal : {}
        }
    }
    async componentDidMount () {
        let {language } = this.props
        let allDays = this.getArrDays(language)

        if(this.props.detailIdFromParent){
            let res = await getScheduleDoctorByDate(this.props.detailIdFromParent, allDays[0].value)
            this.setState({
                allAvalableTime : res.data ? res.data : []
            })
        }
    
            this.setState ({
                allDays: allDays,
            })

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    getArrDays = (language) => {
        moment.locale('vi'); 
        let allDays = []
        for (let i = 0; i<7 ;i++){
            let object = {};
            if(language === LANGUAGE.VI){
                if(i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today
                }else{

                    let lableVi = moment(new Date()).add(i, 'days').format('dddd-DD/MM')
                    object.label = this.capitalizeFirstLetter(lableVi)
                } 
            }else{
                if(i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM')
                    let today = `Today - ${ddMM}`
                    object.label = today
                }
                else{
                    object.label = moment(new Date()).add(i, 'days').locale('en').format("ddd-DD/MM");
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(object)
        }

        return allDays ;
      
    }

    async componentDidUpdate( prevProps,prevState,snapshot){
       if(this.props.language !== prevProps.language ){
        let {language } = this.props
        let allDays = this.getArrDays(language)
        this.setState({
            allDays: allDays
        })}
        if(this.props.detailIdFromParent !== prevProps.detailIdFromParent){
            let {language } = this.props
            let allDays = this.getArrDays(language)
            let res = await getScheduleDoctorByDate(this.props.detailIdFromParent, allDays[0].value)
            this.setState({
                allAvalableTime : res.data ? res.data : []
            })
        }
}
    handleOnChangeSelect = async(event) => {
        if(this.props.detailIdFromParent && this.props.detailIdFromParent != -1){
            let doctorId = this.props.detailIdFromParent
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)

            if(res && res.errCode === 0){
                this.setState({
                    allAvalableTime: res.data ? res.data : []
                })
            }
        }
    }

    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

     closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false
        })
     }

    render() {
       let {allDays, allAvalableTime, isOpenModalBooking, dataScheduleTimeModal} = this.state
       let {language} = this.props
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event)=>this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length > 0 && 
                            allDays.map((item, index) => {
                                return (
                                    <option value={item.value} 
                                    key={index}>
                                    {item.label}
                                    </option>
                                )
                            })
                        }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className="far fa-calendar-alt"><span>
                                <FormattedMessage id="patient.detail-doctor.schedule" />
                            </span></i>
                        </div>
                        <div className='time-content'>
                        {allAvalableTime && allAvalableTime.length > 0 ?
                            <>
                            <div className='time-content-btns'>
                            {allAvalableTime.map((item,index)=>{
                                let timeDisplay = language === LANGUAGE.VI ?
                                item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                return (
                                    <button key={index}
                                        onClick={()=>this.handleClickScheduleTime(item)}
                                    >{timeDisplay}</button>
                                )
                            })}
                            </div>
                            <div className='book-free'>
                                <span>
                                <FormattedMessage id='patient.detail-doctor.choose'/>
                                <i className="fas fa-hand-pointer"></i> 
                                <FormattedMessage id='patient.detail-doctor.and-order-free'/>

                                </span>
                            </div>
                            </>
                            :
                            <div className='no-schedule'>
                                <FormattedMessage id="patient.detail-doctor.no-schedule"/>
                            </div>
                        }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModal = {isOpenModalBooking}
                    closeBookingModal = {this.closeBookingModal}
                    dataTime = {dataScheduleTimeModal}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
