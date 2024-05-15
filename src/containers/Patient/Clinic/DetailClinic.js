import _ from 'lodash';
import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getDetailClinicByIdService } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorExtraifor from '../Doctor/DoctorExtraifor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import './DetailClinic.scss';
class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
           dataDetailClinic : {},
        }
    }
    async componentDidMount () {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id

            let res = await getDetailClinicByIdService({
                id : id,
            })

            if(res && res.errCode === 0 ) {
                let data = res.data
                let arrDoctorId = []
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length > 0 ){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

  
    async componentDidUpdate( prevProps,prevState,snapshot){
       if(this.props.language !== prevProps.language ){
        }
        }

    render() {
        let {arrDoctorId, dataDetailClinic} = this.state
        return (
            <div className='detail-specialty-container'>
            <HomeHeader/>
            <div className='detail-specialty-body'>
              
                <div className='description-specialty'>
                {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                        &&
                        <>
                        <div className='name-clinic'>
                            {dataDetailClinic.name}
                        </div>
                        <div dangerouslySetInnerHTML={{__html: dataDetailClinic.descriptionHTML}}></div>  
                        
                        </>
                }
                </div>
            
                {arrDoctorId && arrDoctorId.length > 0 && 
                    arrDoctorId.map((item, index) => {
                        return(
                                <>
                                <div className='each-doctor' key={index}>

                                    <div className='dt-content-left'  >
                                    <div className='profile-doctor'>
                                        <ProfileDoctor
                                            doctorId = {item}
                                            isShowDescriptionDoctor = {true}
                                            isShowLinkDetail={true}
                                            isShowPrice={false}

                                        // dataTime = {dataTime} 
                                        />
                                    </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                        detailIdFromParent={item}/>
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraifor
                                        detailIdFromParent={item}/>
                                        </div>

                                    </div>
                                </div>
                                </>
                                    
                                )
                                
                            })
                        }
                        
                    </div>

                        
            </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
