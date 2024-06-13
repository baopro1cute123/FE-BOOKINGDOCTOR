import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
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
                    <FormattedMessage id="admin.manage-doctor.all-schedule"/>
                    </div>
                    <div className='manage-history-table'>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th><FormattedMessage id="table.name-patient"/></th>
                                    <th>Email</th>
                                    <th><FormattedMessage id="table.doctor"/></th>
                                    <th><FormattedMessage id="table.time"/></th>
                                    <th><FormattedMessage id="table.day"/></th>
                                    <th><FormattedMessage id="table.action"/></th>
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
