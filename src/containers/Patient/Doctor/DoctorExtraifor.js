import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import { connect } from "react-redux";
import { getExtraInforDoctorById } from '../../../services/userService';
import { LANGUAGE } from '../../../utils';
import './DoctorExtraifor.scss';
class DoctorExtraifor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetaiInfor : false,
            extraInfor : {},
        }
    }
    async componentDidMount () {
        if(this.props.detailIdFromParent){

        let res = await getExtraInforDoctorById(this.props.detailIdFromParent)
        if(res && res.errCode === 0 ){
            this.setState({
                extraInfor: res.data
            })
        }
    }

    }


    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetaiInfor: status
        })
    }
    async componentDidUpdate( prevProps,prevState,snapshot){
       if(this.props.language !== prevProps.language ){
        
        }
        if(this.props.detailIdFromParent !== prevProps.detailIdFromParent){
        
            let res = await getExtraInforDoctorById(this.props.detailIdFromParent)
            if(res && res.errCode === 0 ){
                this.setState({
                    extraInfor: res.data
                })
            }
        
        }
}
    render() {
        let {isShowDetaiInfor, extraInfor} = this.state
        let {language} = this.props
        return (
            <>
                <div className='doctor-extra-infor-container'>
                    <div className='content-up'>
                        <div className='text-address'>
                            <FormattedMessage id='patient.extra-infor-doctor.text-address'/>
                        </div>
                        <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
                        </div>
                        <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ""}
                        </div>
                    </div>
                    <div className='content-down'>
                    
                    { isShowDetaiInfor === false &&
                        <div className='short-infor'>
                        <FormattedMessage id='patient.extra-infor-doctor.text-money'/>

                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGE.VI 
                            && 
                            <NumberFormat
                                className='currency'
                                value={extraInfor.priceTypeData.valueVi} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={'VNĐ'} 
                                /> 
                            }
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGE.EN 
                            &&
                            <NumberFormat
                                                            className='currency'

                                value={extraInfor.priceTypeData.valueEn} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={'$'} 
                                />
                            }
                            <span className='detail' onClick={()=>this.showHideDetailInfor(true)}><FormattedMessage id='patient.extra-infor-doctor.show'/></span>
                        </div>
                    }
                    { isShowDetaiInfor === true &&
                        <>
                            <div className='title-price'><FormattedMessage id='patient.extra-infor-doctor.text-money'/></div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>
                                    <FormattedMessage id='patient.extra-infor-doctor.text-money'/>
                                    </span>
                                    <span className='right'>
                                    {extraInfor && extraInfor.priceTypeData && language === LANGUAGE.VI 
                            && 
                            <NumberFormat
                                className='currency'
                                value={extraInfor.priceTypeData.valueVi} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={'VNĐ'} 
                                /> 
                            }
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGE.EN 
                            &&
                            <NumberFormat
                                className='currency'
                                value={extraInfor.priceTypeData.valueEn} 
                                displayType={'text'} 
                                thousandSeparator={true} 
                                suffix={'$'} 
                                />
                            }
                                </span>
                                </div>
                                <div className='note'>
                                {extraInfor && extraInfor.note ? extraInfor.note : ""}
                                </div>
                            </div>
                            <div className='payment'>
                            <FormattedMessage id='patient.extra-infor-doctor.payment'/>
                            {extraInfor && extraInfor.paymentTypeData && language === LANGUAGE.VI ? extraInfor.paymentTypeData.valueVi : ""}
                            {extraInfor && extraInfor.paymentTypeData && language === LANGUAGE.EN ? extraInfor.paymentTypeData.valueEn : ""}

                            </div>
                            <div className='hide-price'><span onClick={()=>this.showHideDetailInfor(false)}>
                            <FormattedMessage id='patient.extra-infor-doctor.hide'/></span></div>
                        </>
                    }
                        
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraifor);
