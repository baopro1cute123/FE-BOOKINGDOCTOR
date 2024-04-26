import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import { connect } from "react-redux";
// import './verifyEmail.scss';
class verifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    async componentDidMount () {


    }


  
    async componentDidUpdate( prevProps,prevState,snapshot){
       if(this.props.language !== prevProps.language ){
        
        }
        
}
    render() {
        
        return (
            <>
            Hello world from verify email compoment
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
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
