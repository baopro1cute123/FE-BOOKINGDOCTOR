import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom/cjs/react-router-dom';
import logo from '../../assets/logo.jpeg';
import { changeLanguageApp } from '../../store/actions/appActions';
import { LANGUAGE } from '../../utils/constant';
import './HomeHeader.scss';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    returntoHome = () => {
        if(this.props.history) {
            this.props.history.push('/home')
        }
    }
    render() {
        let language = this.props.language
        
        return (
            <React.Fragment>
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className="fas fa-bars"></i>
                        <div className='header-logo'>
                        <img className='logo' src={logo} 
                        alt='Logo'
                        onClick={()=>this.returntoHome()}
                        ></img>
                        </div>
                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.speciality"/></b></div>
                                <div className='subs-title'>
                                    <FormattedMessage id="homeheader.search-doctor"/>
                                </div>
                        </div>
                        <div className='child-content'>
                                <div><b><FormattedMessage id ="homeheader.health-facility"/></b></div>
                                <div className='subs-title'>
                                    <FormattedMessage id="homeheader.select-room" />
                                    </div>
                        </div>
                        <div className='child-content'>
                                <div><b>
                                    <FormattedMessage id="homeheader.doctor"/>
                                </b></div>
                                <div className='subs-title'>
                                    <FormattedMessage id= "homeheader.select-doctor"/>
                                </div>
                        </div>
                        <div className='child-content'>
                                <div><b>
                                    <FormattedMessage id="homeheader.fee"/>
                                </b></div>
                                <div className='subs-title'>
                                    <FormattedMessage id ="homeheader.check-health"/>
                                </div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='support'>
                        <i className="fas fa-question-circle"></i>
                        <span style={{fontSize: "14px", textTransform: "uppercase"}}><Link to='/chat'><FormattedMessage id="homeheader.support"/></Link></span>
                        </div>
                        <div className={language=== LANGUAGE.VI ? 'language-vi active': 'language-vi'}>
                        <span 
                        onClick={()=> this.changeLanguage(LANGUAGE.VI)}>VN</span>
                        </div>
                        <div className={language=== LANGUAGE.EN ? 'language-en active': 'language-en'}>
                        <span 
                        onClick={()=> this.changeLanguage(LANGUAGE.EN)}>EN</span>
                        </div>
                    </div>
                </div>
            </div>
            {this.props.isShowBanner === true &&
                <div className='home-header-banner'>
                <div className='content-up'>
                    <div className='title1'>
                       <FormattedMessage id="banner.title1" />
                    </div>
                    <div className='title2'>
                    <FormattedMessage id="banner.title2" />
                    </div>
                    <div className='search'>
                    <i className="fas fa-search"></i>
                        <Link to='/search'><input type='text' placeholder='Tìm kiếm trên BookingDoctor' /></Link> 
                    </div>
                </div>
                <div className='content-down'>
                    <div className='options'>
                        <div className='option-child'>
                            <div className='icon-child'>
                            <i className="far fa-hospital"></i>
                            </div>
                            <div className='text-child'>
                            <FormattedMessage id="banner.child1" />

                            </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                            <i className="fas fa-mobile-alt"></i>
                            </div>
                            <div className='text-child'>
                            <FormattedMessage id="banner.child2" />
                                </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                            <i className="fas fa-hospital-alt"></i>
                            </div>
                            <div className='text-child'>
                            <FormattedMessage id="banner.child3" />

                           </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                            <i className="fas fa-vial"></i>
                            </div>
                            <div className='text-child'>
                            <FormattedMessage id="banner.child4" />

                            </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                            <i className="fas fa-user-plus"></i>
                            </div>
                            <div className='text-child'>
                            <FormattedMessage id="banner.child5" />

                           </div>
                        </div>
                        <div className='option-child'>
                            <div className='icon-child'>
                            <i className="fas fa-user-md"></i>
                            </div>
                            <div className='text-child'>
                            <FormattedMessage id="banner.child6" />

                           </div>
                        </div>
                    </div>
                </div>
                
            </div>
            }
           
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
        

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux:(language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
