import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUser.scss';





class TableManageUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            usersRedux: []
        }
    }
    componentDidMount () {
        this.props.fetchUserRedux()
    }

    componentDidUpdate( prevProps,prevState,snapshot){
        if(prevProps.arrUsers !== this.props.arrUsers){
            this.setState({
                usersRedux: this.props.arrUsers
            })
        }
    }
    handleDeleteUser = (user) =>{
        this.props.deleteAUserRedux(user)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }
    render() {
        let arrUsers = this.state.usersRedux
        return (
                <>
                <table id="customers">
                <tbody>

                    <tr>
                        <th>Email</th>
                        <th><FormattedMessage id="table.firstName"/></th>
                        <th><FormattedMessage id="table.lastName"/></th>
                        <th><FormattedMessage id="table.role"/></th>
                        <th><FormattedMessage id="table.address"/></th>
                        <th><FormattedMessage id="table.action"/></th>

                    </tr>
                    {arrUsers && arrUsers.length &&
                        arrUsers.map((user, index)=>{
                            return (
                                <tr key={user.id}>
                                    <td>{user.email}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.roleId === 'R1' ? 'ADMIN' : user.roleId === 'R2' ? 'DOCTOR' : user.roleId === 'R3' ? 'Patient' : null}</td>
                                    <td>{user.address}</td>
                                    <td>
                                        <button className='btn-edit'
                                        onClick={()=> this.handleEditUser(user)}
                                        ><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'
                                        onClick={()=> this.handleDeleteUser(user)}
                                        ><i className="fas fa-trash"></i></button>
                                    </td> 
                                </tr>
                            )
                        })
                    }
                    </tbody>
                    </table>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}
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
        fetchUserRedux : () => dispatch(actions.fetchAllUserStart()) ,
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
