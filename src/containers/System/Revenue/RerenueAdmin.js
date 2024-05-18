import moment from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

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
import { getAllRevenueByUserId, getRevenueByUserId } from '../../../services/userService';
import './Revenue.scss';

class RevenueAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            revenueData: [],
            revenue: ''
        };
    }

    async componentDidMount() {
        await this.fetchRevenueData();
        
    }

    async componentDidUpdate(prevProps, prevState) {
        const { endDate: prevEndDate } = prevState;
        const { endDate } = this.state;

        if (endDate !== prevEndDate) {
            await this.fetchRevenueData();
        }
    }
    
    async fetchRevenueData() {
        const { startDate, endDate } = this.state;
        const formatedStartDate = new Date(startDate).getTime();
        const formatedEndDate = new Date(endDate).getTime();
        const { userInfo } = this.props;

        const res = await getAllRevenueByUserId(formatedStartDate, formatedEndDate, userInfo.id);

        const data = await getRevenueByUserId(userInfo.id)
        if (res.errCode === 0 && data.errCode === 0) {
            const formattedData = Object.entries(res.data).map(([timestamp, amount]) => ({
                date: this.formatDate(timestamp),
                revenue: amount,
            }));
            this.setState({
                revenueData: formattedData,
                revenue: data.data
            });
        }
    }

    handleStartDateChange = (date) => {
        this.setState({ startDate: date[0] });
    };

    handleEndDateChange = (date) => {
        this.setState({ endDate: date[0] });
    };

    formatDate(timestamp) {
        return moment(parseInt(timestamp)).format('MM/DD/YYYY');
    }

    render() {
        const { startDate, endDate, revenueData, revenue } = this.state;

        return (
            <div className='manage-revenue-container'>
                <div className='manage-revenue-title'>
                <FormattedMessage id="admin.manage-doctor.admin-revenue"/>
                </div>
                <div className='manage-revenue-price'>
                    <FormattedMessage id="doctor.my-w"/> : {revenue} VNĐ
                </div>
                <div className='date-picker-container'>
                    <div className='date-picker'>
                        <label><FormattedMessage id="doctor.start-date"/></label>
                        <DatePicker
                            selected={startDate}
                            onChange={this.handleStartDateChange}
                        />
                    </div>
                    <div className='date-picker'>
                        <label><FormattedMessage id="doctor.end-date"/></label>
                        <DatePicker
                            selected={endDate}
                            onChange={this.handleEndDateChange}
                        />
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
    userInfo: state.user.userInfo
});

const mapDispatchToProps = dispatch => ({
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RevenueAdmin);
