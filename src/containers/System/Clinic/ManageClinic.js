import MarkdownIt from 'markdown-it';
import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import { createNewClinic, deleteClinicService, getAllClinicService, updateClinicService } from "../../../services/userService";
import { CommonUtils } from "../../../utils";
import './ManageClinic.scss';

const mdParser = new MarkdownIt();

class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: '',
            dataClinic: [],
            clinicId : ''
        }
    }
    
    async componentDidMount() {
        await this.fetchClinics();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            // Handle language change if needed
        }
    }

    fetchClinics = async () => {
        let res = await getAllClinicService();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            });
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = {...this.state};
        stateCopy[id] = event.target.value;
        this.setState({...stateCopy});
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    }

    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({imageBase64: base64});
        }
    }

    handleSaveClinic = async () => {
        const { action } = this.state;
        if (action === 'EDIT') {
            let res = await updateClinicService(this.state);
            if (res && res.errCode === 0) {
                toast.success('Update success!');
                await this.fetchClinics();
            }
            else {
                toast.error('Error Update');
            }
        }else{
            let res = await createNewClinic(this.state);
            if (res && res.errCode === 0) {
                toast.success('Create success!');
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    address: '',
                });
                await this.fetchClinics();
            } else {
                toast.error('Error');
            }
        }
            
        
    }

    handleEditClinic = (item) => {
        let imageBase64 = '';
        if (item.image) {
            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
        }
        this.setState({
            name: item.name,
            address: item.address,
            descriptionMarkdown: item.descriptionMarkdown,
            descriptionHTML: item.descriptionHTML,
            imageBase64: imageBase64,
            action: 'EDIT',
            clinicId: item.id
        });
    }

    handleDeleteClinic = async (item) => {
        let res = await deleteClinicService(item.id);
        if (res && res.errCode === 0) {
            toast.success('Delete success!');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                address: '',
            });
            await this.fetchClinics();
        }
    }

    render() {
        let {dataClinic} = this.state
        return (
            <>
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý phòng khám</div>
                
                <div className='add-new-all-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input className='form-control' type='text' value={this.state.name} 
                            onChange={(event)=>this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input className='form-control-file' type='file'
                            onChange={(event)=>this.handleOnchangeImg(event)}
                        />
                    </div>
                    <div className='col-6 form-group'>
                    <label>Địa chỉ phòng khám</label>
                        <input className='form-control' type='text' value={this.state.address} 
                            onChange={(event)=>this.handleOnChangeInput(event, 'address')}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '200px' }} renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={()=> this.handleSaveClinic()}
                        >Lưu</button>
                    </div>
                    
                </div>
                <div>
                <table id="customers">
                <tbody>

                    <tr>
                        <th>STT</th>
                        <th>Tên phòng khám</th>
                        <th>Địa chỉ</th>
                        <th>Actions</th>

                    </tr>
                    {dataClinic && dataClinic.length &&
                        dataClinic.map((item, index)=>{
                            return (
                                <tr key={item.index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'
                                        onClick={()=> this.handleEditClinic(item)}
                                        ><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'
                                        onClick={()=> this.handleDeleteClinic(item)}
                                        ><i className="fas fa-trash"></i></button>
                                    </td> 
                                </tr>
                            )
                        })
                    }
                    </tbody>
                    </table>
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
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
