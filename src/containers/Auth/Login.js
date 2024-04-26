import { push } from "connected-react-router";
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import * as actions from "../store/actions";
import * as actions from "../../store/actions";

import { handleLoginApi } from "../../services/userService";

import './Login.scss';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handleOnChangeUser = (event) => {
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassWord = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {

            let data = await handleLoginApi(this.state.username, this.state.password);
            console.log("data", data)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
                console.log('loging success');
            }

        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
            console.log('error message', e.response);
        }
    }

    handleShowHidePassword = ()=> {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    handleKeyDown = (event) => {
        if(event.key === 'Enter' || event.keyCode === 13){
            this.handleLogin()
        }
    }
    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">ĐĂNG NHẬP</div>
                        <div className="col-12 form-group login-input">
                            <label>Tài khoản hoặc email:</label>
                            <input type="text" 
                            value={this.state.username}
                            onChange={(event)=> this.handleOnChangeUser(event)}
                            className="form-control" placeholder="Username"/>
                        </div>
                        <div className="col-12 form-group login-input">
                            <label>Mật khẩu:</label>
                            <div className="custom-input-password">
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                value={this.state.password} 
                                onChange={(event)=> this.handleOnChangePassWord(event)}
                                className="form-control" placeholder="Password"
                                onKeyDown={(event)=>this.handleKeyDown(event)}    
                                />
                                <span
                                onClick={()=> {this.handleShowHidePassword()}}>
                                <i className={this.state.isShowPassword ? "fas fa-eye" : 'far fa-eye-slash'}></i></span>
                            </div>
                            
                        </div>
                        <div className="col-12" style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12">
                        <button className="btn-login"
                        onClick={()=>{this.handleLogin()}}
                        >Login</button>

                        </div>
                        <div className="col-12">
                            <span className="forgot-password">Quên mật khẩu?</span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="text-other-login">Đăng nhập bằng:</span>
                        </div>
                        <div className="col-12 social-login">
                        <i className="fab fa-google-plus-g google"></i>
                        <i className="fab fa-facebook facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo)=> dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
