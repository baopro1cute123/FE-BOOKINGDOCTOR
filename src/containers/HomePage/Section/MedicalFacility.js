import { Component, default as React } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getAllClinicService } from '../../../services/userService';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic : []
        
        }
    }
    async componentDidMount () {
        let res = await getAllClinicService()
        if(res && res.errCode === 0){
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }

    }
    handleViewDetailClinic = (item) => {
        if(this.props.history){
            this.props.history.push(`/detail-clinic/${item.id}`)

        }
    }
 
    render() {

        let {dataClinic} = this.state
        return (
            <div className='section-medical-facility section-share'>
            <div className='section-container'>
                <div className='speciatly-header'>
                    <span className='title-section'>Cơ sở y tế nổi bật</span>
                    <button className='btn-section'>Xem thêm</button>
                </div>
                <div className='section-body'>
                <Slider {...this.props.settings}>
                {dataClinic && dataClinic.length > 0 &&
                    dataClinic.map((item, index) => {
                        return (
                            <div className='section-customize' key={index}
                                onClick={()=> this.handleViewDetailClinic(item)}
                            >
                                <div className='bg-image section-medical-facility' 
                                    style={{backgroundImage: `url(${item.image})`}}
                                />
                                <div className='clinic-name'>{item.name}</div>
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
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
