import React, { Component } from 'react';
import { connect } from "react-redux";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGE } from '../../../utils/constant';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import DoctorExtraifor from './DoctorExtraifor';
import DoctorSchedule from './DoctorSchedule';
import Comment from './SocialPlugin/Comment';
import LikeandShare from './SocialPlugin/LikeandShare';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId : -1,
        }
    }
    async componentDidMount () {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id

            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInforDoctor(id)
            if(res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                })
            }
        }
    }

    componentDidUpdate( prevProps,prevState,snapshot){
    
    }
    render() {
        let {detailDoctor} = this.state;
        let {language} = this.props
        let nameVi = '';
        let nameEn = '';
        if (detailDoctor && detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;

        }
        let currentURL = +(process.env.REACT_APP_IS_LOCALHOST) === 1 ? "https://chatbox-bookingdoctor.onrender.com/" : window.location.href;
        console.log(currentURL)
        return (
            <>
                <HomeHeader isShowBanner ={false}/>
            <div className='doctor-detail-container'>
                <div className='intro-doctor'>
                    <div className='content-left'
                    style={{backgroundImage: `url(${ detailDoctor && detailDoctor.image ? detailDoctor.image : ''})`}}
                    >

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                        {language === LANGUAGE.VI ? nameVi : nameEn}
                        
                        </div>
                        <div className='down'>
                            {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description
                            && 
                                <>
                                <h6 style={{textTransform: "uppercase", fontWeight: "600"}}>
                            {detailDoctor.Doctor_Infor.SpecialtyData.name}

                            </h6>
                                <span>
                                {detailDoctor.Markdown.description}
                            </span>
                           
                            </>
                            }
                            <div className='like-share-plugin'>
                                <LikeandShare
                                    dataHref = {currentURL}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='schedule-doctor'>
                        <div className='content-left'>
                            <DoctorSchedule
                            detailIdFromParent={this.state.currentDoctorId}/>
                        </div>
                        <div className='content-right'>
                            <DoctorExtraifor
                            detailIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                </div>
                <div className='detail-info-doctor'>
                    {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                    && 
                        <div>
                        <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML}}></div>  
                        </div>
                    }
                </div>
                <div className='comment-doctor'>
                    <Comment
                            dataHref = {currentURL}
                            width = {"100%"}
                    />
                </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
