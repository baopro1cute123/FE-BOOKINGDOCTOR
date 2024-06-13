import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import { connect } from "react-redux";
import { CheckPaymentMoMoService, postVerifyBookAppointment } from '../../services/userService';
import * as actions from '../../store/actions';
import HomeHeader from '../HomePage/HomeHeader';
import './verifyEmail.scss';

class verifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
           statusVerify: false,
           errorCode : 0
        }
    }
    async componentDidMount () {
        
        if(this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId')
            let orderId = urlParams.get('orderId')


            let resStatus = await CheckPaymentMoMoService(orderId);

            if(resStatus.data.resultCode === 0) {
                let res = await postVerifyBookAppointment({
                    token: token,
                    doctorId: doctorId
                })
                if(res && res.errCode === 0) {
                    this.setState({
                        statusVerify: true,
                        errorCode : res.errCode
                    })
                }else{
                    this.setState({
                        statusVerify : true,
                        errorCode: res.errCode ? res.errCode : -1
                    })
                }
            }
            
        }
        
    }


  
    async componentDidUpdate( prevProps,prevState,snapshot){
       if(this.props.language !== prevProps.language ){
        
        }
        
}
    render() {
        let {statusVerify, errorCode} = this.state
        return (
            <>
            <HomeHeader/>
            <div className='verify-container'>
            {statusVerify === false ?
                <div>
                    Loading data...
                </div> :
                <div >
                    {+errorCode === 0 ?
                        <div className='infor-booking'>XÁC NHẬN LỊCH HẸN THÀNH CÔNG !</div> : 
                        <div className='infor-booking'>LỊCH HẸN KHÔNG TỒN TẠI HOẶC ĐÃ ĐƯỢC XÁC NHẬN </div>
                    }
                </div>
            }
            </div>
            </>
                    
                        
                
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        payMoMo: state.admin.payMoMo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchPayMoMo: (price, doctorId, token)=> dispatch(actions.fetchPayMoMo(price, doctorId, token))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);