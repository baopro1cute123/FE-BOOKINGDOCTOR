import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
class HomeFooter extends Component {
    render() {
        return (
            <div className='footer'>
                    <div className='home-footer-up'>
                        <p className='home-footer-p' style={{color: "white", fontSize: '20px', padding: "15px 0px"}}>BOOKING DOCTOR 2024</p>
                    </div>
                <div className='home-footer'>
                    
                    <div className='home-footer-content'>
                        <span className="icon">&#128197;</span> {/* Biểu tượng Unicode */}
                        <span>HỆ THỐNG BOOKING DOCTOR</span>
                        <p> 54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</p>
                        <p> 0399 23 52 54</p>
                        <p> bookingdoctor@gmail.com</p>
                    </div>
                    <div className='home-footer-content'>
                        <span className="icon">&#128196;</span> {/* Biểu tượng Unicode */}
                        <span>CHÍNH SÁCH BOOKING DOCTOR</span>
                        <p>Tuyển dụng</p>
                        <p>Chính sách bảo mật</p>
                        <p>Cơ chế hoạt động</p>
                    </div>
                    <div className='home-footer-content'>
                        <span className="icon">&#128221;</span> {/* Biểu tượng Unicode */}
                        <span>LIÊN HỆ HỢP TÁC</span>
                        <p>Nguyễn Dương Gia Bảo</p>
                        <p>Hành Trung, Nghĩa Hành, Quảng Ngãi</p>
                        <p>Đại học Bách Khoa - Đại học Đà Nẵng</p>
                    </div>
                </div>
                <div className='home-footer-up'>
                <p className='home-footer-p'> <a target='_blank' rel='noopener noreferrer' href='https://www.facebook.com/giabao.nguyenduong.35/' style={{color: "white", fontSize: '20px'}}>&copy; Chào mừng bạn đến với Booking Doctor.</a></p>
                    <div className='home-footer-container' style={{color: "white", fontSize: '20px'}} >
                        <i className="fab fa-facebook-square"></i>
                        <i className="fab fa-instagram"></i>
                        <i className="fab fa-youtube"></i>                 
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
