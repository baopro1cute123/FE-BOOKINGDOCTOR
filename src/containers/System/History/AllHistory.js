import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPatientBookingServices } from '../../../services/userService';
import { LANGUAGE } from "../../../utils/constant";
import './AllHistory.scss';

class AllHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHistory: [],
        };
    }
  
    async componentDidMount() {
        try {
            const res = await getAllPatientBookingServices();
            if (res && res.errCode === 0) {
                this.setState({
                    dataHistory: res.data ? res.data : []
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    render() {
        const { dataHistory } = this.state;
        let {language} = this.props
        
        
        return (
            <>
                <div className='manage-history-container'>
                    <div className='manage-history-title'>
                        QUẢN LÝ TẤT CẢ LỊCH HẸN
                    </div>
                    <div className='manage-history-table'>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên bệnh nhân</th>
                                    <th>Email</th>
                                    <th>Bác sĩ khám</th>
                                    <th>Khung giờ</th>
                                    <th>Ngày khám</th>
                                    <th>Trạng thái</th>
                                </tr>
                                {dataHistory && dataHistory.length > 0 &&
                                    dataHistory.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            
                                            <td>{item.patientData && item.patientData.firstName}</td>
                                            
                                            <td>{item.patientData && item.patientData.email}</td>
                                            <td>{item.doctorIdData && `${item.doctorIdData.lastName} ${item.doctorIdData.firstName}`}</td>

                                            <td>{language === LANGUAGE.VI ?   item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn}</td>
                                            <td>{new Date(parseInt(item.date)).toLocaleDateString()}</td>
                                            <td>{language === LANGUAGE.VI ?   item.statusData.valueVi : item.statusData.valueEn}</td>

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>   
                </div>
                
            </>
        );
    }
}

const mapStateToProps = state => ({
    language: state.app.language
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AllHistory);
