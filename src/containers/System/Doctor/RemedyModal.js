import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { CommonUtils } from "../../../utils";
import './RemedyModal.scss';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            imgBase64: '',
            reason: '',
        }
    }
    async componentDidMount () {
        if(this.props.dataModal){
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }


    async componentDidUpdate( prevProps,prevState,snapshot){
        if(this.props.dataModal !== prevProps.dataModal ){
            this.setState({
                email: this.props.dataModal.email,

            })
        }
        
        
    }
    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    handleOnChangeReason = (event) => {
        this.setState({
            reason: event.target.value
        })

    }

    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
              imgBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {
            let {isOpenModal, closeRemedyModal, dataModal, sendRemedy} = this.props
            return (
            <>  
                <Modal
                    isOpen={isOpenModal} 
                    className={'booking-modal-container'}
                    size='md'
                    centered
                >
                    <div className='modal-header'>
                        <h5 className='modal-title'>GỬI HÓA ĐƠN KHÁM BỆNH THÀNH CÔNG</h5>
                        <button className='close' type='button' aria-label='Close'>
                            <span aria-hidden='true' onClick={closeRemedyModal}>x</span>
                        </button>
                    </div>
                        <ModalBody>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                        <label >Email bệnh nhân</label>
                                        <input className='form-control' type='email' value={this.state.email}
                                            onChange={(event)=>this.handleOnChangeEmail(event)}
                                        />
                                </div>
                               

                                <div className='col-6 form-group'>
                                        <label >Chọn file đơn thuốc</label>
                                        <input className='form-control-file' type='file'
                                            onChange={(event)=> this.handleOnchangeImg(event)}
                                        />
                                </div>

                                <div className='col-12 form-group'>
                                        <label >Bệnh nhận bị bệnh</label>
                                        <input className='form-control' type='text' value={this.state.reason}
                                            onChange={(event)=>this.handleOnChangeReason(event)}
                                        />
                                </div>
                                
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>this.handleSendRemedy()}>
                            Send
                            </Button>{' '}
                        <Button color="secondary" onClick={closeRemedyModal}>
                            Cancel
                        </Button>
                        </ModalFooter>
                </Modal>
            </>
   
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders : state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
