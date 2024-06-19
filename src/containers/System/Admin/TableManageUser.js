import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUser.scss';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            searchQuery: '',
            currentPage: 1,
            usersPerPage: 10
        };
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.arrUsers !== this.props.arrUsers) {
            this.setState({
                usersRedux: this.props.arrUsers
            });
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);
    }

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value, currentPage: 1 });
    }

    handlePageChange = (event, pageNumber) => {
        event.preventDefault();
        this.setState({ currentPage: pageNumber });
    }

    getFilteredUsers = () => {
        const { searchQuery, usersRedux } = this.state;
        const query = searchQuery.toLowerCase();
    
        return usersRedux.filter(user => {
            const email = user.email ? user.email.toLowerCase() : '';
            const firstName = user.firstName ? user.firstName.toLowerCase() : '';
            const lastName = user.lastName ? user.lastName.toLowerCase() : '';
    
            return email.includes(query) || firstName.includes(query) || lastName.includes(query);
        });
    }
    

    renderPagination = (totalUsers) => {
        let { currentPage, usersPerPage } = this.state;
        let totalPages = Math.ceil(totalUsers / usersPerPage);
        let pages = [];

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
        let { currentPage, usersPerPage } = this.state;
        let filteredUsers = this.getFilteredUsers();
        let indexOfLastUser = currentPage * usersPerPage;
        let indexOfFirstUser = indexOfLastUser - usersPerPage;
        let currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

        return (
            <>
                <input
                    className='search'
                    type='text'
                    placeholder="Search..."
                    value={this.state.searchQuery}
                    onChange={this.handleSearchChange}
                />
                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th><FormattedMessage id="table.firstName" /></th>
                            <th><FormattedMessage id="table.lastName" /></th>
                            <th><FormattedMessage id="table.role" /></th>
                            <th><FormattedMessage id="table.address" /></th>
                            <th><FormattedMessage id="table.action" /></th>
                        </tr>
                        {currentUsers && currentUsers.length > 0 && currentUsers.map((user, index) => (
                            <tr key={user.id}>
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.roleId === 'R1' ? 'ADMIN' : user.roleId === 'R2' ? 'DOCTOR' : user.roleId === 'R3' ? 'Patient' : null}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button className='btn-edit' onClick={() => this.handleEditUser(user)}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button className='btn-delete' onClick={() => this.handleDeleteUser(user)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='Pagination'>{this.renderPagination(filteredUsers.length)}</div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        arrUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
