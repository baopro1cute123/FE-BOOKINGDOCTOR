import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'; // Import withRouter
import { getAllSpecialtyService } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import './Search.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
            searchKeyword: ''
        };
    }

    async componentDidMount() {
        let res = await getAllSpecialtyService();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data || []
            });
        }
    }

    handleSearchChange = (event) => {
        this.setState({
            searchKeyword: event.target.value
        });
    };

    handleClick = (item) => {
        this.props.history.push(`/detail-specialty/${item.id}`); 
    };

    render() {
        const { dataSpecialty, searchKeyword } = this.state;

        const filteredSpecialties = dataSpecialty.filter(item =>
            item.name.toLowerCase().includes(searchKeyword.toLowerCase())
        );

        return (
            <>
                <HomeHeader />
                <div className='search-container'>
                    <div className='search-header'>
                        <i className="fas fa-search"></i>
                        <input
                            type='text'
                            placeholder='Tìm kiếm chuyên khoa khám bệnh'
                            value={searchKeyword}
                            onChange={this.handleSearchChange}
                        />
                    </div>
                    <div className='search-body'>
                        {filteredSpecialties.map((item, index) => (
                            <div className='search-body-child' key={index} onClick={() => this.handleClick(item)}>
                                <div className='img-search section-specialty' style={{ backgroundImage: `url(${item.image})` }}></div>
                                <div className='name-search'>{item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

// Sử dụng withRouter để có thể truy cập history
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));
