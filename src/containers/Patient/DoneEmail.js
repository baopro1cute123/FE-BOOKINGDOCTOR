import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getCheckToken, getPriceDoctorById } from '../../services/userService';
import * as actions from '../../store/actions';
import HomeHeader from '../HomePage/HomeHeader';
import './verifyEmail.scss';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
        };
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            let res = await getCheckToken(token)

            if(res && res.errCode === 0){
                this.setState({
                    statusVerify: true,
                })
            }else{
                let priceResponse = await getPriceDoctorById(doctorId);
                let price = priceResponse.data;
                this.props.fetchPayMoMo(price, doctorId, token);
            }
            
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.paymentResponse !== prevProps.paymentResponse) {
            const paymentResponse = this.props.paymentResponse;
            
            if (paymentResponse && paymentResponse.payUrl && this.props.location.search) {
                let urlParams = new URLSearchParams(this.props.location.search);
                let token = urlParams.get('token');
                let doctorId = urlParams.get('doctorId');
    
                // Kiểm tra nếu cả token và doctorId đều có giá trị
                if (token && doctorId) {
                    window.location.href = paymentResponse.payUrl;
                } else {
                    // Xử lý trường hợp khi token hoặc doctorId không có giá trị
                    console.error("Token or doctorId is undefined!");
                }
            }
        }
    }

    render() {
        let {statusVerify} = this.state
        return (
            <>
                <HomeHeader/>
                
                <div className='verify-container'>
            {statusVerify === true ?
                <div className='infor-booking'>LỊCH HẸN KHÔNG TỒN TẠI HOẶC ĐÃ ĐƯỢC XÁC NHẬN </div>:
                <div className='infor-booking'>TIẾN HÀNH THANH TOÁN</div>
                    
            }
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        paymentResponse: state.admin.payMoMo // Lấy paymentResponse từ Redux state
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // Action creator fetchPayMoMo được sử dụng để gửi request lấy thông tin thanh toán MoMo từ server
        fetchPayMoMo: (price, doctorId, token)=> dispatch(actions.fetchPayMoMo(price, doctorId, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
