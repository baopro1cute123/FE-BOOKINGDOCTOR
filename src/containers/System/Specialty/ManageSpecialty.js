import MarkdownIt from 'markdown-it';
import 'moment/locale/vi'; // Import locale vi
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import MdEditor from 'react-markdown-editor-lite';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import { createNewSpecialty, deleteSpecialtyService, getAllSpecialtyService, updateSpecialtyService } from "../../../services/userService";
import { CommonUtils } from "../../../utils";
import './ManageSpecialty.scss';
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: '',
            dataSpecialty: [],
            specialtyId : ''
        }
    }
    async componentDidMount () {
        await this.fetchSpecialty();

    }
    fetchSpecialty = async () => {
        let res = await getAllSpecialtyService();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            });
        }
    }


    async componentDidUpdate( prevProps,prevState,snapshot){
    if(this.props.language !== prevProps.language ){
        
        }
    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = {...this.state}
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
            
        })
    }
    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64 : base64
            })
        }
    }
    handleSaveSpecialty =  async () => {
        const { action } = this.state;
        if (action === 'EDIT') {
            let res = await updateSpecialtyService(this.state);
            if (res && res.errCode === 0) {
                toast.success('Cập nhật thành công!');
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                });
                await this.fetchSpecialty();
            }
            else {
                toast.error('Cập nhật thất bại !');
            }
        }else{
            let res = await createNewSpecialty(this.state);
            if (res && res.errCode === 0) {
                toast.success('Tạo mới thành công !');
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                });
                await this.fetchSpecialty();
            } else {
                toast.error('Tạo mới thất bại !');
            }
        }
      
    }

    handleEditSpecialty = (item) => {
        let imageBase64 = '';
        if (item.image) {
            imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
        }
        this.setState({
            name: item.name,
            descriptionMarkdown: item.descriptionMarkdown,
            descriptionHTML: item.descriptionHTML,
            imageBase64: imageBase64,
            action: 'EDIT',
            specialtyId: item.id
        });
    }
    handleDeleteSpecialty = async (item) => {
        let res = await deleteSpecialtyService(item.id);
        if (res && res.errCode === 0) {
            toast.success('Xóa thành công !');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            });
            await this.fetchSpecialty();
        }
    }
    render() {
        let {dataSpecialty} = this.state
        return (
            <>
            <div className='manage-specialty-container'>
                <div className='ms-title'><FormattedMessage id="admin.manage-doctor.manage-speciality"/></div>
                
                <div className='add-new-all-specialty row'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.name-speciality"/></label>
                        <input className='form-control' type='text' value={this.state.name} 
                            onChange={(event)=>this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="admin.manage-doctor.photo-speciality"/></label>
                        <input className='form-control-file' type='file'
                            onChange={(event)=>this.handleOnchangeImg(event)}
                        />
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '400px' }} renderHTML={text => mdParser.render(text)} 
                            onChange={this.handleEditorChange} 
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={()=> this.handleSaveSpecialty()}
                        ><FormattedMessage id="admin.manage-doctor.save"/></button>
                    </div>
                    
                </div>
                <div className='table-specialty'>
                <table id="customers">
                <tbody>

                    <tr>
                        <th>STT</th>
                        <th><FormattedMessage id="admin.manage-doctor.name-speciality"/></th>
                        <th><FormattedMessage id="table.action"/></th>
                    </tr>
                    {dataSpecialty && dataSpecialty.length &&
                        dataSpecialty.map((item, index)=>{
                            return (
                                <tr key={item.index}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <button className='btn-edit'
                                        onClick={()=> this.handleEditSpecialty(item)}
                                        ><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete'
                                        onClick={()=> this.handleDeleteSpecialty(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
