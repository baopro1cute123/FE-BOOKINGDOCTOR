import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

import { FormattedMessage } from 'react-intl';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllRevenueByUserId } from '../../../services/userService';
import { LANGUAGE } from '../../../utils';
import './Revenue.scss';

class Revenue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            revenueData: [],
            selectedDoctor: null,
            listDoctors: []
        };
    }

    async componentDidMount() {
        this.props.fetchAllDoctor();
        this.fetchRevenueData();
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
    async componentDidUpdate(prevProps, prevState) {

        if(prevProps.allDoctors !== this.props.allDoctors){
            
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            let {userInfo} = this.props
            this.setState({
                listDoctors: dataSelect
            })
        }
        const { endDate: prevEndDate, selectedDoctor: prevSelectedDoctor } = prevState;
        const { endDate, selectedDoctor } = this.state;

        if (endDate !== prevEndDate || selectedDoctor !== prevSelectedDoctor) {
            await this.fetchRevenueData();
        }
    }
    

    async fetchRevenueData() {
        const { startDate, endDate, selectedDoctor } = this.state;
        let formatedstartDate = new Date(startDate).getTime();
        let formatedendDate = new Date(endDate).getTime();

        console.log(selectedDoctor)
        // Thực hiện lấy doanh thu cho bác sĩ đã chọn
        const res = await getAllRevenueByUserId(formatedstartDate, formatedendDate, selectedDoctor);
        if (res.errCode === 0) {
            const formattedData = Object.entries(res.data).map(([timestamp, amount]) => ({
                date: this.formatDate(timestamp),
                revenue: amount,
            }));
            this.setState({ revenueData: formattedData });
        }
    }

    handleStartDateChange = (date) => {
        this.setState({ startDate: date[0] });
    };

    handleEndDateChange = (date) => {
        this.setState({ endDate: date[0] });
    };

    handleDoctorChange = (event) => {
        this.setState({ selectedDoctor: event.target.value });
    };

    formatDate(timestamp) {
        return moment(parseInt(timestamp)).format('MM/DD/YYYY');
    }

    render() {
        const { startDate, endDate, revenueData } = this.state;
        const { allDoctors } = this.props;

        return (
            <div className='manage-revenue-container'>
                <div className='manage-revenue-title'>
                <FormattedMessage id="admin.manage-doctor.doctor-revenue"/>
                </div>
                <div className='date-picker-container'>
                    <div className='date-picker'>
                        <label><FormattedMessage id="doctor.start-date"/>:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={this.handleStartDateChange}
                        />
                    </div>
                    <div className='date-picker'>
                        <label><FormattedMessage id="doctor.end-date"/>:</label>
                        <DatePicker
                            selected={endDate}
                            onChange={this.handleEndDateChange}
                        />
                    </div>
                    <div className='doctor-select'>
                            <label><FormattedMessage id="admin.manage-doctor.select-doctor"/>:</label>
                            <select onChange={this.handleDoctorChange}>
                                <option value="">Tất cả</option>
                                {this.state.listDoctors.map(doctor => (
                                    <option key={doctor.value} value={doctor.value}>{doctor.label}</option>
                                ))}
                            </select>
                        </div>

                </div>
                <div className='revenue-chart'>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={revenueData}>
                            <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
                            <XAxis dataKey="date" label={{ value: 'Thời gian', position: 'insideBottomRight', offset: 0, fill: '#666' }} tick={{ fill: '#666' }} />
                            <YAxis label={{ value: 'Tiền (VNĐ)', angle: 0, position: 'insideLeft', fill: '#666', offset: 120 }} tick={{ fill: '#666' }} />
                            <Tooltip labelStyle={{ color: '#333' }} itemStyle={{ color: '#333' }} wrapperStyle={{ backgroundColor: '#f0f0f0', border: '1px solid #ccc' }} />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#ff6f61" strokeWidth={2} activeDot={{ r: 8, stroke: '#ff6f61', strokeWidth: 2, fill: '#fff' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    language: state.app.language,
    allDoctors : state.admin.allDoctors,
    userInfo: state.user.userInfo
});

const mapDispatchToProps = dispatch => ({
    fetchAllDoctor : () => dispatch(actions.fetchAllDoctor()) ,
});

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);
