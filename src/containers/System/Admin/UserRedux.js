import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, CommonUtils, LANGUAGE } from "../../../utils";
import TableManageUser from './TableManageUser';
import './UserRedux.scss';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr : [],
            positionArr : [],
            roleArr : [],
            previewImgURL: "",
            isOpen : false,
            

            email : '',
            password : '',
            firstName : '',
            lastName : '',
            phonenumber : '',
            address : '',
            gender : '',
            position : '',
            role : '',
            avatar : '',

            action: '',
            userEditId: '',


        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositonStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMapMap : ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRole = this.props.roleRedux;

            this.setState({
                roleArr: this.props.roleRedux,
                
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ""
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPosition = this.props.positionRedux;
            
            this.setState({
                positionArr: this.props.positionRedux,
                position : arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
            })
        }
        if(prevProps.arrUsers !== this.props.arrUsers){
            let arrPosition = this.props.positionRedux;
            let arrRole = this.props.roleRedux;
            let arrGender = this.props.genderRedux;

            this.setState({
                email : '',
                password : '',
                firstName : '',
                lastName : '',
                phonenumber : '',
                address : '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
                position : arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
                avatar : '',

                action : CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar : base64
            })
        }
    }
    openPreviewImg = () => {
        if(!this.state.previewImgURL){
            return
        }
        this.setState({
            isOpen : true
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkVailidateInput()
        if( isValid === false) return ;

        let {action} = this.state ;

        if(action === CRUD_ACTIONS.CREATE) {
            console.log(this.state.avatar)
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName : this.state.lastName,
                address : this.state.address,
                phonenumber : this.state.phonenumber,
                gender : this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
        }if(action === CRUD_ACTIONS.EDIT) {
            this.props.editAUserRedux({
                id : this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName : this.state.lastName,
                address : this.state.address,
                phonenumber : this.state.phonenumber,
                gender : this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
        

        
    }

    checkVailidateInput = () =>{
        let isValid = true
        let arrCheck = [ 'email', 'password', 'firstName', 'lastName', 'phonenumber', 'address',];
        for (let i = 0;i< arrCheck.length ; i++){
            if(!this.state[arrCheck[i]]){
                isValid = false;
                alert("This input is required: "+arrCheck[i])
                break
            }
        }
        return isValid  
    }

    onChangeInput = (event, id) => {
        let copyState = {...this.state}
        
        copyState[id] = event.target.value ;
        this.setState({
            ...copyState
        })
        
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''
        if(user.image){
           imageBase64 = new Buffer (user.image, 'base64').toString('binary')
        }
    

        this.setState({
            email : user.email,
            password : "HARDCODE",
            firstName : user.firstName,
            lastName : user.lastName,
            phonenumber : user.phonenumber,
            address : user.address,
            gender: user.gender,
            role: user.roleId,
            position : user.positionId,
            avatar : '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id
        })
    }
    render() {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender
        let positions = this.state.positionArr;
        let roles = this.state.roleArr

        let {avatar, role,position, email, password, firstName,lastName,phonenumber ,address,gender } = this.state

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    QUẢN LÝ NGƯỜI DÙNG
                </div>
                
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='row'>
                        <div className='col-12 my-3'>
                            <FormattedMessage id="manage-user.add"/>
                        </div>
                        <div className='col12 my-3'>
                    {isLoadingGender === true ? "Loading genders": ""}
                        </div>
                            <div className='col-3'>
                                <label>
                                <FormattedMessage id="manage-user.email"/>
                                </label>
                                <input className='form-control' type='email'
                                    value={email} onChange={(event)=>{this.onChangeInput(event, 'email')}}
                                    disabled={this.state.action=== CRUD_ACTIONS.EDIT}
                                />
                            </div>
                            <div className='col-3'>
                                <label>
                                <FormattedMessage id="manage-user.password"/>
                                </label>
                                <input className='form-control' type='password'
                                    value={password} onChange={(event)=>{this.onChangeInput(event, 'password')}}
                                disabled={this.state.action=== CRUD_ACTIONS.EDIT}

                                />
                            </div>
                            <div className='col-3'>
                                <label>
                                <FormattedMessage id="manage-user.firstName"/>
                                </label>
                                <input className='form-control' type='text'
                                     value={firstName} onChange={(event)=>{this.onChangeInput(event, 'firstName')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label>
                                <FormattedMessage id="manage-user.lastName"/>

                                </label>
                                <input className='form-control' type='text'
                                     value={lastName} onChange={(event)=>{this.onChangeInput(event, 'lastName')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label>
                                <FormattedMessage id="manage-user.phonenumber"/>
                                </label>
                                <input className='form-control' type='text'
                                     value={phonenumber} onChange={(event)=>{this.onChangeInput(event, 'phonenumber')}}
                                />
                            </div>
                            <div className='col-9'>
                                <label>
                                <FormattedMessage id="manage-user.address"/>
                                </label>
                                <input className='form-control' type='text'
                                     value={address} onChange={(event)=>{this.onChangeInput(event, 'address')}}
                                />
                            </div>
                            <div className='col-3'>
                                <label>
                                <FormattedMessage id="manage-user.gender"/>
                                </label>
                                <select className='form-control'
                                onChange={(event)=>{this.onChangeInput(event, 'gender')}}
                                value={gender}
                                >
                                {genders && genders.length > 0 &&
                                    genders.map((item, index)=> {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                            {language === LANGUAGE.VI ? item.valueVi: item.valueEn}</option>
                                        )
                                    })
                                }
                                    
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>
                                <FormattedMessage id="manage-user.position"/>
                                </label>
                                <select className='form-control'
                                onChange={(event)=>{this.onChangeInput(event, 'position')}}
                                value={position}
                                >
                                {positions && positions.length > 0 &&
                                    positions.map((item, index)=> {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                            {language === LANGUAGE.VI ? item.valueVi: item.valueEn}</option>
                                        )
                                    })
                                }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>
                                <FormattedMessage id="manage-user.role"/>
                                </label>
                                <select className='form-control'
                                onChange={(event)=>{this.onChangeInput(event, 'role')}}
                                value={role}
                                >
                                {roles && roles.length > 0 &&
                                    roles.map((item, index)=> {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                            {language === LANGUAGE.VI ? item.valueVi: item.valueEn}</option>
                                        )
                                    })
                                }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>
                                <FormattedMessage id="manage-user.image"/>
                                </label>
                                <div className='preview-img-container'>
                                    <input type='file' id='previewImg' hidden 
                                        onChange={(event)=> this.handleOnchangeImg(event)}
                                    />
                                    <label className="label-upload" htmlFor='previewImg'>Tải ảnh
                                    <i className="fas fa-cloud-upload-alt"></i>
                                    </label>
                                    <div className='preview-image'
                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick={()=>this.openPreviewImg()}
                                    >
                                        
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                            <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : 'btn btn-primary' }
                            onClick={()=> this.handleSaveUser()}
                            >
                            {this.state.action === CRUD_ACTIONS.EDIT ? 
                                <FormattedMessage id="manage-user.edit"/> : 
                                <FormattedMessage id="manage-user.save"/>

                            
                            }
                            </button>

                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                handleEditUserFromParentKey= {this.handleEditUserFromParent}
                                action = {this.state.action}

                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                
                {this.state.isOpen === true && 
                <Lightbox
                    mainSrc={this.state.previewImgURL}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                    }
            </div>
        )   
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux : state.admin.genders,
        positionRedux : state.admin.positions,
        roleRedux : state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        arrUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        // changeLanguageAppRedux:(language) => dispatch(actions.changeLanguageApp(language)),
        // processLogout: () => dispatch(actions.processLogout()),
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositonStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux : () => dispatch(actions.fetchAllUserStart()) ,
        editAUserRedux : (data) => dispatch(actions.editAUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
