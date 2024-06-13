import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'; // Import withRouter
import { getAllClinicService, getAllDoctorHomeService, getAllSpecialtyService } from '../../../services/userService';
import * as actions from "../../../store/actions";
import HomeHeader from '../../HomePage/HomeHeader';
import './Search.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
            dataDoctor: [],
            dataClinic: [],
            searchKeyword: ''
        };
    }

    async componentDidMount() {
        this.props.loadTopDoctors()

        let resSpecialty = await getAllSpecialtyService();
        let resDoctor = await getAllDoctorHomeService();
        let resClinic = await getAllClinicService();
        
        if (resSpecialty && resDoctor && resClinic && resSpecialty.errCode === 0 && resDoctor.errCode === 0 && resClinic.errCode === 0) {
            this.setState({
                dataSpecialty: resSpecialty.data || [],
                dataDoctor: resDoctor.data || [],
                dataClinic: resClinic.data || []
            });
        }
    }

    handleSearchChange = (event) => {
        this.setState({
            searchKeyword: event.target.value
        });
    };

    handleClickSpecialty = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`);
    };

    handleClickDoctor = (item) => {
        this.props.history.push(`/detail-doctor/${item.id}`);
    };

    handleClickClinic = (item) => {
        this.props.history.push(`/detail-clinic/${item.id}`);
    };

    render() {
        const { dataSpecialty, dataDoctor, dataClinic, searchKeyword } = this.state;

        const filteredSpecialties = dataSpecialty.filter(item =>
            item.name && item.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );

        const filteredDoctors = dataDoctor.filter(item =>
            (item.firstName && item.firstName.toLowerCase().includes(searchKeyword.toLowerCase())) ||
            (item.lastName && item.lastName.toLowerCase().includes(searchKeyword.toLowerCase()))
        );

        const filteredClinics = dataClinic.filter(item =>
            item.name && item.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );

        return (
            
            <>
                <HomeHeader />
                <div className='search-container'>
                    <div className='search-header'>
                        <i className="fas fa-search"></i>
                        <input
                            type='text'
                            placeholder='Tìm kiếm chuyên khoa, bác sĩ hoặc cơ sở y tế'
                            value={searchKeyword}
                            onChange={this.handleSearchChange}
                        />
                    </div>
                    
                    <div className='search-section'>
                        <div className='search-title'>Chuyên khoa</div>
                        <div className='search-body'>
                            {filteredSpecialties.map((item, index) => (
                                <div className='search-body-child' key={index} onClick={() => this.handleClickSpecialty(item)}>
                                    <div className='img-search section-specialty' style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className='name-search'>{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className='search-section'>
                        <div className='search-title'>Bác sĩ</div>
                        <div className='search-body-doctor'>
                            {filteredDoctors.map((item, index) => (
                                <div className='search-body-child-doctor' key={index} onClick={() => this.handleClickDoctor(item)}>
                                    <div className='img-search-doctor section-doctor' style={{ backgroundImage: `url(${Buffer.from(item.image, 'base64').toString('binary')})` }}></div>
                                    <div className='name-search-doctor'>{item.lastName} {item.firstName} </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className='search-section'>
                        <div className='search-title'>Cơ sở y tế</div>
                        <div className='search-body-clinic'>
                            {filteredClinics.map((item, index) => (
                                <div className='search-body-child-clinic' key={index} onClick={() => this.handleClickClinic(item)}>
                                    <div className='img-search-clinic section-clinic' style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <div className='name-search-clinic'>{item.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        topDoctorsRedux : state.admin.topDoctors

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors : ()=> dispatch(actions.fetchTopDoctor())

    };
};

// Sử dụng withRouter để có thể truy cập history
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
