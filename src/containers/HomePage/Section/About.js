import React, { Component } from 'react';
import { connect } from 'react-redux';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

class About extends Component {

 
    render() {

        return (
            <div className='section-about section-share'>
                <div className='section-about-header'>
                    BÀI HÁT SỨC KHỎE GIA ĐÌNH
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/F-NYKjyUoMk"
                        title="BÀI HÁT SỨC KHỎE GIA ĐÌNH"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                    </div>
                    <div className='content-right'>
                        <div>
                            <p>“Yêu lắm, thương lắm, vui lắm, mà lo lắm</p>
                            <p>Gia đình, gia đình, sức khỏe gia đình</p>
                            <p> Không khó, đừng lo, rất dễ để chăm sóc</p>
                            <p> Mẹ cười, ba cười, ông cười, bà cười..”</p>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
