import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'; // Assuming you're using Reactstrap for modal components
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email : '',
            password: '',
            firstName : '',
            lastName : '',
            address: '',
        }
    }
    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)){
            this.setState({
                id: user.id,
                email: user.email,
                password: "hardcode",
                firstName : user.firstName,
                lastName : user.lastName,
                address: user.address,
            })
        }
        console.log("check",this.props.currentUser)
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
        return isValid
    }
    handleSaveUser = () =>{
        let isValid = this.checkValideInput();
        if(isValid === true){
            this.props.editUser(this.state);
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
            <ModalHeader toggle={()=>{this.toggle()}} >CHỈNH SỬA NGƯỜI DÙNG</ModalHeader>
            <ModalBody>
                <div className='modal-user-body'>
                    <div className='input-container'>
                        <label>Email</label>
                        <input type='text'
                            onChange={(event)=>{this.handleOnChangeInput(event, "email")}}
                            value={this.state.email}
                            disabled
                        />
                    </div>
                    <div className='input-container'>
                        <label>Password</label>
                        <input type='password'
                             onChange={(event)=>{this.handleOnChangeInput(event,"password")}}
                             value={this.state.password}
                             disabled
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
              onClick={()=>{this.handleSaveUser()}} >
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);





