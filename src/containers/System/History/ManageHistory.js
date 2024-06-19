import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { getAllPatientServices } from '../../../services/userService';
import './ManageHistory.scss';

class ManageHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataHistory: [],
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 7,
            selectedPatient: null,
            isModalOpen: false
        };
    }

    async componentDidMount() {
        try {
            const res = await getAllPatientServices();
            if (res && res.errCode === 0) {
                this.setState({
                    dataHistory: res.data ? res.data : []
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value, currentPage: 1 });
    }

    handlePageChange = (event, pageNumber) => {
        event.preventDefault();
        this.setState({ currentPage: pageNumber });
    }

    getFilteredData = () => {
        const { searchQuery, dataHistory } = this.state;
        const query = searchQuery.toLowerCase();

        return dataHistory.filter(item => {
            const patientName = item.patientDataHistory && item.patientDataHistory.firstName ? item.patientDataHistory.firstName.toLowerCase() : '';
            const doctorName = item.doctorDataHistory ? `${item.doctorDataHistory.firstName} ${item.doctorDataHistory.lastName}`.toLowerCase() : '';
            const email = item.patientDataHistory && item.patientDataHistory.email ? item.patientDataHistory.email.toLowerCase() : '';
            const address = item.patientDataHistory && item.patientDataHistory.address ? item.patientDataHistory.address.toLowerCase() : '';
            const description = item.description ? item.description.toLowerCase() : '';

            return patientName.includes(query) || doctorName.includes(query) || email.includes(query) || address.includes(query) || description.includes(query);
        });
    }

    renderPagination = (totalItems) => {
        const { currentPage, itemsPerPage } = this.state;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const pages = [];

        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <a href="#" className="page-link" onClick={(event) => this.handlePageChange(event, i)}>{i}</a>
                </li>
            );
        }

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pages}
                </ul>
            </nav>
        );
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
        const { isModalOpen, selectedPatient, currentPage, itemsPerPage } = this.state;
        const filteredData = this.getFilteredData();
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

        let imageBase64 = '';

        if (selectedPatient && selectedPatient.files) {
            imageBase64 = Buffer.from(selectedPatient.files, 'base64').toString('binary');
        }

        return (
            <>
                <div className='manage-history-container'>
                    <div className='manage-history-title'>
                        <FormattedMessage id="admin.manage-doctor.history" />
                    </div>
                    <input
                        className='search'
                        type='text'
                        placeholder="Search..."
                        value={this.state.searchQuery}
                        onChange={this.handleSearchChange}
                    />
                    <div className='manage-history-table'>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th><FormattedMessage id="table.name-patient" /></th>
                                    <th><FormattedMessage id="table.doctor" /></th>
                                    <th>Email</th>
                                    <th><FormattedMessage id="table.address" /></th>
                                    <th><FormattedMessage id="table.pathological" /></th>
                                    <th><FormattedMessage id="table.day" /></th>
                                    <th><FormattedMessage id="table.action" /></th>
                                </tr>
                                {currentItems && currentItems.length > 0 &&
                                    currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{indexOfFirstItem + index + 1}</td>
                                            <td>{item.patientDataHistory && item.patientDataHistory.firstName}</td>
                                            <td>{item.doctorDataHistory && `${item.doctorDataHistory.firstName} ${item.doctorDataHistory.lastName}`}</td>
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
                    <div className='Pagination'>{this.renderPagination(filteredData.length)}</div>
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
                                <p><span>Tên bệnh nhân:</span> {selectedPatient.patientDataHistory.firstName}</p>
                                <p><span>Email:</span> {selectedPatient.patientDataHistory.email}</p>
                                <p><span>Bác sĩ khám:</span> {`${selectedPatient.doctorDataHistory.firstName} ${selectedPatient.doctorDataHistory.lastName}`}</p>
                                <p><span>Địa chỉ:</span> {selectedPatient.patientDataHistory.address}</p>
                                <p><span>Ngày khám:</span> {new Date(parseInt(selectedPatient.date)).toLocaleDateString()}</p>
                                <p><span>Bệnh lý:</span> {selectedPatient.description}</p>
                                <p><span>Toa thuốc:</span></p>
                                <div className='bg-image section-history' style={{ backgroundImage: `url(${imageBase64})` }}>
                                </div>
                            </div>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.closeModal}>Đóng</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    language: state.app.language
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ManageHistory);
