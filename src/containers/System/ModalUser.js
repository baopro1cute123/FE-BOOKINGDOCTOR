import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'; // Assuming you're using Reactstrap for modal components
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password: '',
            firstName : '',
            lastName : '',
            address: '',
        }
        this.listenToEmitter();
    }
    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email : '',
                password: '',
                firstName : '',
                lastName : '',
                address: '',
            })
        })
    }
    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent();
    }
    handleOnChangeInput = (event, id) => {
        let copyState = {...this.state}
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
        
    }
    checkValideInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if(!this.state[arrInput[i]]){
                isValid = false
                alert("Missing parameter: "+arrInput[i])
                break
            }
            
        }
        return true
    }
    handleAddNewUser = () =>{
        let isValid = this.checkValideInput();
        if(isValid === true){
            this.props.createNewUser(this.state);
        }
    }
    render() {
        return (
            
        <Modal 
        isOpen={this.props.isOpen} 
        toggle={()=>{this.toggle()}} 
        className={'modal-user-container'}
        size='lg'
        >
            <ModalHeader toggle={()=>{this.toggle()}} >TẠO MỚI NGƯỜI DÙNG</ModalHeader>
            <ModalBody>
                <div className='modal-user-body'>
                    <div className='input-container'>
                        <label>Email</label>
                        <input type='text'
                            onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                            value={this.state.email}

                        />
                    </div>
                    <div className='input-container'>
                        <label>Password</label>
                        <input type='password'
                             onChange={(event)=>{this.handleOnChangeInput(event,"password")}}
                             value={this.state.password}
                        />
                    </div>
                    <div className='input-container'>
                        <label>FirstName</label>
                        <input type='text'
                             onChange={(event)=>{this.handleOnChangeInput(event,"firstName")}}
                             value={this.state.firstName}/>
                    </div>
                    <div className='input-container'>
                        <label>LastName</label>
                        <input type='text'
                             onChange={(event)=>{this.handleOnChangeInput(event,"lastName")}}
                             value={this.state.lastName}/>
                    </div>
                    <div className='input-container max-width-input'>
                        <label>Address</label>
                        <input type='text'
                             onChange={(event)=>{this.handleOnChangeInput(event, "address")}}     
                             value={this.state.address}
                        />
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
              <Button 
              className='px-3' color="primary" 
              onClick={()=>{this.handleAddNewUser()}} >
                LƯU
              </Button>{' '}
              <Button className='px-3' color="secondary" onClick={()=>{this.toggle()}}>
                ĐÓNG
              </Button>
            </ModalFooter>
          </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);





