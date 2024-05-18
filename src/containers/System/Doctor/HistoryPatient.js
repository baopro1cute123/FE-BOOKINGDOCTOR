import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { getAllPatientByDoctorIdServices } from '../../../services/userService';
import './HistoryPatient.scss';

class ManageHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHistory: [],
            selectedPatient: null,
            isModalOpen: false
        };
    }
  
    async componentDidMount() {
        let user = this.props.userInfo
        try {
            const res = await getAllPatientByDoctorIdServices(user.id);
            if (res && res.errCode === 0) {
                this.setState({
                    dataHistory: res.data ? res.data : []
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
  
    toggleModal = (patient) => {
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen,
            selectedPatient: patient
        }));
    }

    closeModal = () => {
        this.setState({
            isModalOpen: false,
            selectedPatient: null
        });
    }

 

    render() {
        const { dataHistory, isModalOpen, selectedPatient } = this.state;
     
        let imageBase64 = '';

        if (selectedPatient && selectedPatient.files) {
            imageBase64 = Buffer.from(selectedPatient.files, 'base64').toString('binary');
        }


        return (
            <>
                <div className='manage-history-container'>
                    <div className='manage-history-title'>
                    <FormattedMessage id="doctor.manage-history"/>
                    </div>
                    {dataHistory && dataHistory.length > 0 ?
                    <div className='manage-history-table'>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên bệnh nhân</th>
                                    <th>Email</th>
                                    <th>Địa chỉ</th>
                                    <th>Bệnh lý</th>
                                    <th>Ngày khám</th>
                                    <th>Actions</th>
                                </tr>
                                {dataHistory && dataHistory.length > 0 &&
                                    dataHistory.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{item.patientDataHistory && item.patientDataHistory.firstName}</td>
                                            <td>{item.patientDataHistory && item.patientDataHistory.email}</td>
                                            <td>{item.patientDataHistory && item.patientDataHistory.address}</td>
                                            <td>{item.description}</td>
                                            <td>{new Date(parseInt(item.date)).toLocaleDateString()}</td>
                                            <td>
                                                <button className='btn-view' onClick={() => this.toggleModal(item)}>Xem chi tiết</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                                :
                                <div className='history-no-data'>
                                <FormattedMessage id="doctor.no-patient"/>
                                </div>
                }
                </div>
                <Modal
                        isOpen={isModalOpen} 
                        className='history-modal-container'
                        size='md'
                        centered
                    >
                        <div className='modal-header'>
                            <h5 className='modal-title'>CHI TIẾT LỊCH SỬ KHÁM BỆNH</h5>
                            <button className='close' type='button' aria-label='Close' onClick={this.closeModal}>
                                <span aria-hidden='true'>x</span>
                            </button>
                        </div>
                        <ModalBody>
                        {selectedPatient && (
                            <div className='body-modal-history'>
                                <p> <span>Tên bệnh nhân:</span> {selectedPatient.patientDataHistory.firstName}</p>
                                <p> <span>Email:</span> {selectedPatient.patientDataHistory.email}</p>
                                <p> <span>Địa chỉ:</span> {selectedPatient.patientDataHistory.address}</p>
                                <p> <span>Ngày khám:</span> {new Date(parseInt(selectedPatient.date)).toLocaleDateString()}</p>
                                <p><span>Bệnh lý:</span> {selectedPatient.description}</p>
                                <p> <span>Toa thuốc:</span></p>
                                <div className='bg-image section-history' style={{backgroundImage: `url(${imageBase64})`}}>
                                
                                </div>
                            </div>
                        )}
                        </ModalBody>
                        <ModalFooter>
                        
                            <Button color="secondary" onClick={this.closeModal}>
                                Đóng
                            </Button>
                        </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    language: state.app.language,
    userInfo: state.user.userInfo

});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ManageHistory);
