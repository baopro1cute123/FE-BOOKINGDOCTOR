import MarkdownIt from 'markdown-it';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { connect } from 'react-redux';
import Select from 'react-select';
import { getDetailInforDoctor } from '../../../services/userService';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGE } from '../../../utils';
import './ManageDoctor.scss';

const mdParser = new MarkdownIt();


class ManageDoctor extends Component {

    constructor(props){
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML : '',
            selectedOption: '',
            description : '',
            allDoctorsRedux : [],
            hasOldData : false,


            //save to doctor_infor table
            listPrice : [],
            listPayment : [],
            listProvince: [],
            listClinic : [],
            listSpecialty: [],

            selectedPrice : '',
            selectedPayment : '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic : '',
            addressClinic : '',
            note : '',
            clinicId : '',
            specialtyId: '',

        }
    }
    componentDidMount () {
        this.props.fetchAllDoctor()
        this.props.getRequiredDoctorInfor()
    }

    componentDidUpdate( prevProps,prevState,snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')

            this.setState({
                allDoctorsRedux: dataSelect
            })
        }
        if(prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor){
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic} = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE');
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty,'SPECIALTY');
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC')

            this.setState({
                listPrice : dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }if(prevProps.language !== this.props.language){
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            let { resPrice, resPayment, resProvince} = this.props.allRequiredDoctorInfor
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectPayment = this.buildDataInputSelect(resPayment,'PAYMENT');
            let dataSelectProvince = this.buildDataInputSelect(resProvince,'PROVINCE');
            this.setState({
                allDoctorsRedux: dataSelect,
                listPrice : dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML : html,
        })
    }
    
    handleSaveContentMarkdown = () => {
        let {hasOldData}= this.state

        this.props.saveDetailDoctor({
            doctorId : this.state.selectedOption.value,
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            action : hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        
            selectedPrice : this.state.selectedPrice.value,
            selectedPayment : this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic : this.state.nameClinic,
            addressClinic : this.state.addressClinic,
            note : this.state.note,
            clinicId : this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '' ,
            specialtyId: this.state.selectedSpecialty.value,
        })
    }

    handleChangeSelect = async (selectedOption) => { // hàm này để lấy lại dữ liệu
        this.setState({ selectedOption });
        let {listPayment, listPrice ,listProvince, listSpecialty, listClinic} = this.state // sửa

        let res = await getDetailInforDoctor(selectedOption.value)
        if(res && res.errCode === 0 && res.data && res.data.Markdown){
            let markdown = res.data.Markdown ;

            let addressClinic = '', nameClinic = '', note ='',
            paymentId='', priceId = '', provinceId = '',selectedPayment = '',
            selectedPrice='', selectedProvince='', selectedSpecialty='' ,
            specialtyId='',clinicId = '', selectedClinic = ''

            if(res.data.Doctor_Infor) { 
                addressClinic = res.data.Doctor_Infor.addressClinic
                nameClinic = res.data.Doctor_Infor.nameClinic
                note = res.data.Doctor_Infor.note;

                paymentId = res.data.Doctor_Infor.paymentId
                priceId = res.data.Doctor_Infor.priceId
                provinceId = res.data.Doctor_Infor.provinceId
                specialtyId = res.data.Doctor_Infor.specialtyId
                clinicId = res.data.Doctor_Infor.clinicId

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                }) // sửa 
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })         
            }
            this.setState ({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData : true ,
                addressClinic: addressClinic,
                nameClinic : nameClinic ,
                note : note ,
                selectedPrice : selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty, //sửa
                selectedClinic: selectedClinic
            })
        }else{
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic : '' ,
                note : '' ,
                selectedPrice : '',
                selectedPayment: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: ''
            })
        }    };

    handleChangeSelectDoctorInfor = async(selectedOption, name) =>{
       let stateName = name.name;
       let stateCopy = {...this.state}
       stateCopy[stateName]= selectedOption

       this.setState({
        ...stateCopy
       })
    }

    handleOnChangText =(event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    buildDataInputSelect = (inputdata, type) => {
        let result = []
        let {language} = this.props;
        if(inputdata && inputdata.length > 0){

            if(type === 'USERS'){
                inputdata.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`
                    let labelEn = `${item.firstName} ${item.lastName}`
                    
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn
                    object.value = item.id 
                    result.push(object)
                })
            }if(type==='PRICE'){
                inputdata.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi} VNĐ`
                    let labelEn = `${item.valueEn} USD`
                    
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }if(type==='PAYMENT' || type === "PROVINCE"){
                inputdata.map((item, index) => {
                    let object = {};
                    let labelVi = `${item.valueVi}`
                    let labelEn = `${item.valueEn}`
                    
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn
                    object.value = item.keyMap
                    result.push(object)
                })
            }if(type==='SPECIALTY'){
                inputdata.map((item, index) => {
                    let object = {};
                    
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
            if(type==='CLINIC'){
                inputdata.map((item, index) => {
                    let object = {};
                    
                    object.label = item.name
                    object.value = item.id
                    result.push(object)
                })
            }
        } 
        return result
    }
    render() {
        let {hasOldData} = this.state
        return (
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>
                        <FormattedMessage id='admin.manage-doctor.title'/>
                    </div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.select-doctor'/></label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                options={this.state.allDoctorsRedux}
                                placeholder = {<FormattedMessage id='admin.manage-doctor.select-doctor'/>}
                            />
                        </div>
                        <div className='content-right'>
                            <label>
                            <FormattedMessage id='admin.manage-doctor.intro-doctor'/>
                            </label>
                            <textarea className='form-control'
                                onChange={(event)=> this.handleOnChangText(event, 'description')}
                                value={this.state.description}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.choose-price'/></label>
                            <Select
                                value={this.state.selectedPrice}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPrice}
                                placeholder = {<FormattedMessage id='admin.manage-doctor.choose-price'/>}
                                name='selectedPrice'
                            /></div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.choose-payment'/></label>
                            <Select
                                value={this.state.selectedPayment}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPayment}
                                placeholder = {<FormattedMessage id='admin.manage-doctor.choose-payment'/>}
                                name='selectedPayment'
                            /></div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.choose-province'/></label>
                            <Select
                                value={this.state.selectedProvince}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listProvince}
                                placeholder = {<FormattedMessage id='admin.manage-doctor.choose-province'/>}
                                name='selectedProvince'
                            /></div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.name-clinic'/></label>
                            <input className='form-control'
                            onChange={(event)=> this.handleOnChangText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.address-clinic'/></label>
                            <input className='form-control' 
                                onChange={(event)=> this.handleOnChangText(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.note'/></label>
                            <input className='form-control'
                                onChange={(event)=> this.handleOnChangText(event, 'note')}
                                value={this.state.note}
                            />
                        </div>

                    </div>
                    <div className='row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.specialty'/></label>
                            <Select
                                value={this.state.selectedSpecialty}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listSpecialty}
                                placeholder = {<FormattedMessage id='admin.manage-doctor.specialty'/>}
                                name='selectedSpecialty'
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id='admin.manage-doctor.clinic'/></label>
                            <Select
                                value={this.state.selectedClinic}
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listClinic}
                                placeholder = {<FormattedMessage id='admin.manage-doctor.specialty'/>}
                                name='selectedClinic'
                            />
                        </div>
                    </div>
                    <div className='manage-doctor-editor'>
                        <MdEditor style={{ height: '300px' }} renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    
                    <button className={hasOldData === true ? 'save-content-doctor': "create-content-doctor" }
                    onClick={()=>this.handleSaveContentMarkdown()}
                    >
                        {hasOldData === true ? 
                            <span><FormattedMessage id='admin.manage-doctor.save'/></span> :
                            <span><FormattedMessage id='admin.manage-doctor.add'/></span>
                        }
                    </button>
                </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors : state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
        fetchAllDoctor : () => dispatch(actions.fetchAllDoctor()) ,
        saveDetailDoctor: (data)=> dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
