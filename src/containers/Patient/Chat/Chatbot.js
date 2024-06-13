import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import logo from "../../../assets/logo.jpeg";
import { ChatBotServices } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader';
import './Chatbot.scss';

class Chatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            response: null,
            error: null,
            chatHistory: [] // Mảng lưu trữ lịch sử tin nhắn
        };
        this.messagesEndRef = React.createRef(); // Tạo một ref để cuộn đến bottom của chatbox-messages
    }

    handleChange = (e) => {
        this.setState({ message: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { message } = this.state;
        try {
            const userMessage = {
                sender: 'user',
                content: message
            };
    
            const updatedChatHistory = [...this.state.chatHistory, userMessage];
            this.setState({ chatHistory: updatedChatHistory });
    
            const response = await ChatBotServices({
                message: message
            });
    
            if (response && response.errCode === 0) {
                const botResponse = {
                    sender: 'bot',
                    content: response.data.message,
                    data: response.data.data // Thêm dữ liệu vào phản hồi
                };
                updatedChatHistory.push(botResponse);
                this.setState({ response: response.data, error: null, chatHistory: updatedChatHistory });
            } else {
                const errorMessage = {
                    sender: 'bot',
                    content: 'Error from server'
                };
                updatedChatHistory.push(errorMessage);
                this.setState({ response: null, error: 'Error from server', chatHistory: updatedChatHistory });
            }
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = {
                sender: 'bot',
                content: 'Error from server'
            };
            const updatedChatHistory = [...this.state.chatHistory, errorMessage];
            this.setState({ response: null, error: 'Error from server', chatHistory: updatedChatHistory });
        }
        this.setState({ message: '' });
    };

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    handleOnClickspecialty = (id) => {
        window.open(`/detail-specialty/${id}`, '_blank');
    }
    

    handleOnClickDoctor = (id) => {
        window.open(`/detail-doctor/${id}`, '_blank');

    }
    handleOnClickClinic = (id) => {
        window.open(`/detail-clinic/${id}`, '_blank');

    }

    render() {
        const { message, error, chatHistory } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="chatbox-container">
                    <div className='title-chatbox'>
                        <div className='avatar-chatbox'>
                            <img src={logo} alt='logo'></img>
                            <i className="fas fa-circle"></i>
                        </div>
                        <div className='icon-chatbox'>
                            <i className="fas fa-question-circle"></i>
                            <i className="fas fa-video"></i>
                            <i className="fas fa-phone"></i>
                        </div>
                    </div>
                    <div className="chatbox-messages">
                        {chatHistory.map((message, index) => (
                            <div className={`chatbox-message ${message.sender}`} key={index}>
                                <p className='chatboxp'>{message.content}</p>
                                {message.data && (
                                    <div className='chatbot-body'>
                                        {message.data.map((item, i) => (
                                            <div key={i} className='chatbot-child'>

                                                {item && item.name ?
                                                <div className='chatbot-name'>{i+1}. {item.name}</div> : ""
                                                }

                                                {item && item.firstName && item.lastName ?
                                                <div className='chatbot-name'>{i+1}. {item.lastName} {item.firstName}</div> : ""
                                                }

                                                {item && item.valueVi ?
                                                <div className='chatbot-name'>{i+1}. {item.valueVi}</div> : ""
                                                }
                                                {item && item.descriptionMarkdown ?
                                                <div className='chatbot-name'>{i+1}. {item.descriptionMarkdown}</div> : ""
                                                }

                                                {item && item.image ?
                                                    <div className='bg-image section-chatbot'
                                                        onClick={()=>this.handleOnClickspecialty(item.id)} 
                                                    style={{backgroundImage: `url(${Buffer.from (item.image, 'base64').toString('binary')})`}}/>: ""
                                                }
                                                {item && item.imgclinic ?
                                                    <div className='bg-image section-chatbot-clinic'
                                                        onClick={()=>this.handleOnClickClinic(item.id)} 
                                                    style={{backgroundImage: `url(${Buffer.from (item.imgclinic, 'base64').toString('binary')})`}}/>: ""
                                                }
                                                {item && item.imgdoctor ?
                                                    <div className='bg-image section-chatbot-doctor'
                                                        onClick={()=>this.handleOnClickDoctor(item.id)} 
                                                    style={{backgroundImage: `url(${Buffer.from (item.imgdoctor, 'base64').toString('binary')})`}}/>: ""
                                                }

                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={this.messagesEndRef} /> {/* Đây là ref sẽ cuộn đến bottom của chatbox-messages */}
                        {error && <div className="chatbox-error">{error}</div>}
                    </div>
                    <form className="chatbox-form" onSubmit={this.handleSubmit}>
                        <i className="fas fa-file"></i>
                        <i className="fas fa-gift"></i>
                        <i className="fas fa-image"></i>
                        <input
                            type="text"
                            value={message}
                            onChange={this.handleChange}
                            placeholder="Nhập tin nhắn..."
                        />
                        <button type="submit">Gửi</button>
                    </form>
                </div>
            </>
        );
    }
}

export default withRouter(Chatbot);
