import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/Admin/ManageDoctor';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManageClinic from '../containers/System/Clinic/ManageClinic';
import AllHistory from '../containers/System/History/AllHistory';
import ManageHistory from '../containers/System/History/ManageHistory';
import RerenueAdmin from '../containers/System/Revenue/RerenueAdmin';
import Revenue from '../containers/System/Revenue/Revenue';
import RevenueId from '../containers/System/Revenue/RevenueId';
import ManageSpecialty from '../containers/System/Specialty/ManageSpecialty';
import UserManage from '../containers/System/UserManage';

class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <>
            {isLoggedIn && <Header />}

            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/user-manage" component={UserManage} />
                        <Route path="/system/user-redux" component={UserRedux} />
                        <Route path="/system/manage-doctor" component={ManageDoctor} />
                        <Route path="/system/manage-specialty" component={ManageSpecialty} />
                        <Route path="/system/manage-clinic" component={ManageClinic} />
                        <Route path="/system/manage-history" component={ManageHistory} />
                        <Route path="/system/manage-all-history" component={AllHistory} />
                        <Route path="/system/revenue" component={Revenue} />
                        <Route path="/system/revenue-id" component={RevenueId} />
                        <Route path="/system/revenue-admin" component={RerenueAdmin} />

                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
