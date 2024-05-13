import _ from 'lodash';
import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAllcodeService, getDetailSpecialtyByIdService } from '../../../services/userService';
import { LANGUAGE } from '../../../utils';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorExtraifor from '../Doctor/DoctorExtraifor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import './DetailSpecialty.scss';
class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
           dataDetailSpecialty : {},
           listProvince: []
        }
    }
    async componentDidMount () {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id

            let res = await getDetailSpecialtyByIdService({
                id : id,
                location: 'ALL'
            })

            let resProvince = await getAllcodeService('PROVINCE')

            if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0 ){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }

                let dataProvince = resProvince.data
                if (dataProvince && dataProvince.length > 0){
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type : "PROVINCE",
                        valueEn: 'ALL',
                        valueVi: "Toàn quốc",
                    })
                }

                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                })
            }
        }
    }

  
    async componentDidUpdate( prevProps,prevState,snapshot){
       if(this.props.language !== prevProps.language ){
        }
        }

  
    handleOnChange = async (event) =>{ //hàm sort : dựa vào đây để viết hàm search
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id
            let location = event.target.value

            let res = await getDetailSpecialtyByIdService({
                id : id,
                location: location
            })

            if(res && res.errCode === 0) {
                let data = res.data
                let arrDoctorId = []
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0 ){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    
                })
        
        }
    }
}
    render() {
        let {arrDoctorId, dataDetailSpecialty,listProvince} = this.state
        let {language}  = this.props
        return (
            <div className='detail-specialty-container'>
            <HomeHeader/>
            <div className='detail-specialty-body'>
              
                <div className='description-specialty'>
                {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                        && 
                        <div dangerouslySetInnerHTML={{__html: dataDetailSpecialty.descriptionHTML}}></div>  
                }
                </div>
            
            <div className='search-sp-doctor'>
                <select onChange={(event)=> this.handleOnChange(event)}>
                    {listProvince && listProvince.length > 0 &&
                        
                        listProvince.map((item,index)=>{
                            return(
                                <option key={index} value={item.keyMap}>
                                    {language === LANGUAGE.VI ? item.valueVi : item.valueEn}
                                </option>

                            )
                        })
                    }

                </select>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
