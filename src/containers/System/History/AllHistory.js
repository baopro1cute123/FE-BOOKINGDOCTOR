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
            searchQuery: '',
            currentPage: 1,
            itemsPerPage: 8
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
            const patientName = item.patientData && item.patientData.firstName ? item.patientData.firstName.toLowerCase() : '';
            const doctorName = item.doctorIdData ? `${item.doctorIdData.lastName} ${item.doctorIdData.firstName}`.toLowerCase() : '';
            const email = item.patientData && item.patientData.email ? item.patientData.email.toLowerCase() : '';

            return patientName.includes(query) || doctorName.includes(query) || email.includes(query);
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

    render() {
        const { currentPage, itemsPerPage } = this.state;
        const { language } = this.props;
        const filteredData = this.getFilteredData();
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

        return (
            <>
                <div className='manage-history-container'>
                    <div className='manage-history-title'>
                        <FormattedMessage id="admin.manage-doctor.all-schedule" />
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
                                    <th>Email</th>
                                    <th><FormattedMessage id="table.doctor" /></th>
                                    <th><FormattedMessage id="table.time" /></th>
                                    <th><FormattedMessage id="table.day" /></th>
                                    <th><FormattedMessage id="table.action" /></th>
                                </tr>
                                {currentItems && currentItems.length > 0 &&
                                    currentItems.map((item, index) => (
                                        <tr key={index}>
                                            <td>{indexOfFirstItem + index + 1}</td>
                                            <td>{item.patientData && item.patientData.firstName}</td>
                                            <td>{item.patientData && item.patientData.email}</td>
                                            <td>{item.doctorIdData && `${item.doctorIdData.lastName} ${item.doctorIdData.firstName}`}</td>
                                            <td>{language === LANGUAGE.VI ? item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn}</td>
                                            <td>{new Date(parseInt(item.date)).toLocaleDateString()}</td>
                                            <td>{language === LANGUAGE.VI ? item.statusData.valueVi : item.statusData.valueEn}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='Pagination'>{this.renderPagination(filteredData.length)}</div>
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
