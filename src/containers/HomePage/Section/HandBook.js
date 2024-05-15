import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

class HandBook extends Component {

 
    render() {

        return (
            <div className='section-handbook section-share'>
                <div className='section-container'>
                    <div className='speciatly-header'>
                        <span className='title-section'>
                        <FormattedMessage id="homePage.Handbook" />

                        </span>
                        <button className='btn-section'>
                            <FormattedMessage id="homePage.more-infor" />

                        </button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                        <div className='section-customize'>
                            <div className='bg-image section-handbook' />
                            <div className='title-handbook' >5 Bác sĩ Tai mũi họng Nhi giỏi tại Hà Nội</div>
                        </div>
                        <div className='section-customize'>
                        <div className='bg-image section-handbook' />
                            <div className='title-handbook'>6 Bác sĩ khám chữa viêm amidan giỏi tại TP.HCM</div>
                        </div>
                        <div className='section-customize'>
                        <div className='bg-image section-handbook' />
                            <div className='title-handbook'>6 Địa chỉ chữa khám Tai Mũi Họng tại Quận Tân Phú uy tín</div>
                        </div>
                        <div className='section-customize'>
                        <div className='bg-image section-handbook' />
                            <div className='title-handbook'>Review chi tiết 5 bệnh viện, phòng khám Tai mũi họng Thủ Đức</div>
                        </div>
                        <div className='section-customize'>
                        <div className='bg-image section-handbook' />
                            <div className='title-handbook'> Tổng hợp 8 phòng khám chuyên khoa Tai Mũi Họng tại Đà Nẵng</div>
                        </div>
                        <div className='section-customize'>
                        <div className='bg-image section-handbook' />
                            <div className='title-handbook'>Top 7 địa chỉ khám Tai Mũi Họng uy tín ở Hà Nội</div>
                        </div>
                        
                        </Slider>
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
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
