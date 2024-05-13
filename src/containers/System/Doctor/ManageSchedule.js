import _ from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import Select from 'react-select';
import { toast } from 'react-toastify';
import DatePicker from '../../../components/Input/DatePicker';
import { saveBulkScheduleService } from '../../../services/userService';
import * as actions from '../../../store/actions';
import { LANGUAGE } from '../../../utils';
import "./ManageSchedule.scss";

class ManageSchedule extends Component {
    constructor(props){
        super(props);

        // const currentDate = new Date();
        // currentDate.setHours(0, 0, 0, 0);

        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate : '',
            rangeTime : [],
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
    
        // Kiểm tra nếu đã đăng nhập và là bác sĩ
        const { isLoggedIn, userInfo } = this.props;
        if (isLoggedIn && userInfo.roleId === "R2") {
            // Tìm bác sĩ trong danh sách và cập nhật state nếu tìm thấy
            const { allDoctors } = this.props;
            const doctor = allDoctors.find(doc => doc.id === userInfo.id);
            if (doctor) {
                this.setState({ selectedDoctor: { label: `${doctor.lastName} ${doctor.firstName}`, value: doctor.id } });
            }
        }
    }
    componentDidUpdate( prevProps,prevState,snapshot){
        
        if(prevProps.allDoctors !== this.props.allDoctors){
            
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)

            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            
            let data = this.props.allScheduleTime ;
            if(data & data.length > 0 ){
               data = data.map(item => ({ ...item, isSelected: false}))
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    buildDataInputSelect = (inputdata) => {
        let result = []
        let {language} = this.props;
        if(inputdata && inputdata.length > 0){
            inputdata.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                
                object.label = language === LANGUAGE.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
           
        } 
        return result
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
        
    };

    handleOnChangeDatePicker = (date) =>{
        this.setState({
            currentDate: date[0]
        })
    }

    handleClickBtnTime = (time) => {
        let {rangeTime} = this.state;
        if(rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if(item.id === time.id) item.isSelected = !item.isSelected;
                return item
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule =  async() =>{
        let {rangeTime , selectedDoctor , currentDate} = this.state ;
        let result = [];
        if(!currentDate){
            toast.error("Invalid date!")
            return
        }
        if(selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error("Invalid SelectedDoctor!")
            return
        }
        // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // let formatedDate = moment(currentDate).unix()
        let formatedDate = new Date(currentDate).getTime();
        if(rangeTime && rangeTime.length > 0){
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map((schedule, index ) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value
                    object.date = formatedDate
                    object.timeType = schedule.keyMap
                    result.push(object)
                })
            }else{
                toast.error("Invalid Selected Time!")
                return
            }
        }
        let res = await saveBulkScheduleService({
            arrSchedule: result,
            doctorId : selectedDoctor.value,
            date : formatedDate,
        })
        if(res && res.errCode === 0) {
            toast.success("Save infor success!")
        }else{
            toast.error("error!")

        }

        this.setState({
            currentDate : '',
        })

    }
    render() {
        let {rangeTime} = this.state
        let {language} = this.props
        let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
        return (
            <>
            <div className='manage-schedule-container'>
                <div className='m-s-title'>
                    <FormattedMessage id= "manage-schedule.title"/>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <lable>
                                <FormattedMessage id="manage-schedule.choose-doctor" />
                            </lable>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6 form-group' >
                            <lable>
                            <FormattedMessage id="manage-schedule.choose-date" />

                            </lable>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value = {this.state.currentDate}
                                // selected = {this.state.currentDate}
                                minDate = {yesterday}
                            />
                            </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 && 
                                rangeTime.map((item, index)=>{
                                    return(
                                        <button className={item.isSelected === true ? 'btn btn-schedule active': 'btn btn-schedule'} key={index}
                                        onClick={()=> this.handleClickBtnTime(item)}
                                        >
                                        {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                }
                                )
                            }
                        </div>
                        <div className='col-12'>
                            <button className='btn btn-primary btn-save-schedule'
                                onClick={()=> this.handleSaveSchedule()}
                            >
                            <FormattedMessage id="manage-schedule.save" />
                            </button>

                        </div>
                    </div>
                    
                </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors : state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor : () => dispatch(actions.fetchAllDoctor()) ,
        fetchAllScheduleTime : ()=> dispatch(actions.fetchAllScheduleTime())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
