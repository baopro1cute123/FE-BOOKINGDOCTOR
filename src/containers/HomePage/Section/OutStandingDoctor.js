import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils/constant";
class OutStandingDoctor extends Component {
    constructor(props){
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux)
        {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    componentDidMount(){
        this.props.loadTopDoctors()
    }
    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }
    render() {
        let arrDoctors = this.state.arrDoctors
        let {language} = this.props;
         return (
            <div className='section-outstanding-doctor section-share'>
            <div className='section-container'>
                <div className='speciatly-header'>
                    <span className='title-section'>
                        <FormattedMessage id="homePage.out-standing-doctor" />
                    </span>
                    <button className='btn-section'>
                        <FormattedMessage id="homePage.more-infor" />
                    </button>
                </div>
                <div className='section-body'>
                    <Slider {...this.props.settings}>
                   
                    {arrDoctors && arrDoctors.length > 0 &&

                     arrDoctors.map((item, index)=>{
                        let imageBase64 = ''
                        if(item.image){
                            imageBase64 = new Buffer (item.image, 'base64').toString('binary')}
                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;

                        return(
                            <div className='section-customize' key={index}
                            onClick={()=> this.handleViewDetailDoctor(item)}
                            >
                        <div className='customize-border'>
                            <div className='outder-bg'>
                                <div className='bg-image section-outstanding-doctor'
                                style={{backgroundImage: `url(${imageBase64})`}}
                                
                                />
                            </div>
                            <div className='position text-center'>
                                <div>
                                    {language === LANGUAGE.VI ? nameVi : nameEn }
                                </div>
                                <div>Cơ xương khớp1</div>
                            </div>
                        </div>
                    </div>
                        )
                     })
                    }
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
        topDoctorsRedux : state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors : ()=> dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
