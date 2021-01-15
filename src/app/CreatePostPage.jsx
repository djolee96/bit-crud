import React from 'react'
import Input from './components/Input'
import Button from './components/Button'
import Checkbox from './components/Checkbox'
import { createPost } from '../services/postServices'
import validatePost from '../shared/postValidation'
import { resetInputs, removeClassAttribute } from '../shared/reset'
import Message from './components/Message'
import { popUp } from '../shared/popUpMessage'

class CreatePostPage extends React.Component {

    state = {
        status: "",
        title: "",
        subtitle: "",
        photo: "",
        content: ""
    }

    getCheckValue = (x) => {
        this.setState({ status: x })
    }
    getTitle = (x) => {
        this.setState({ title: x })
        removeClassAttribute(".inputTitle")
    }
    getSubtitle = (x) => {
        this.setState({ subtitle: x })
        removeClassAttribute(".inputSubtitle")
    }
    getPhoto = (x) => {
        this.setState({ photo: x })
        removeClassAttribute(".inputImgUrl")
    }
    getContent = (x) => {
        this.setState({ content: x })
        removeClassAttribute(".inputPostText")
    }

    makePost = () => {
        let data = {
            isPublic: this.state.status,
            title: this.state.title,
            subtitle: this.state.subtitle,
            imageUrl: this.state.photo,
            text: this.state.content
        }
        const validation = validatePost(data.title, data.subtitle, data.text, data.imageUrl)
        let token = localStorage.getItem("currentUser")

        if (validation === true) {

            createPost(data, token)
                .then(() => {
                    popUp()
                    setTimeout(() => this.props.history.push("/myposts"), 2000)
                })
            resetInputs()
        }
    }

    render() {
        return (
            <div className="CreatePostPage row">
                <div className="col">
                    <h2>Create Post</h2>
                    <Message text="Post successfully created" className="messageHide" nameClass="messageText" />
                    <div className="createPostContainer">
                        <label>Title: <br />
                            <Input className="inputTitle reset" type="text" placeholder="Post Title" onChange={this.getTitle} />
                        </label>
                        <label>Subtitle: <br />
                            <Input className="inputSubtitle reset" type="text" placeholder="Post subtitle" onChange={this.getSubtitle} />
                        </label>
                        <br />
                        <Input className="inputImgUrl reset" type="text" placeholder="Image URL" onChange={this.getPhoto} />
                        <span>Private</span>
                        <label className="switch">
                            <Checkbox type="checkbox" nameClass="checkReset" onChange={this.getCheckValue} />
                            <span className="slider round"></span>
                        </label>
                        <span>Public</span>
                        <br />
                        <label>Text of post: <br />
                            <Input className="inputPostText reset" type="text" onChange={this.getContent} />
                        </label>
                        <br />
                        <Button value='SAVE' className='saveButton' onClick={this.makePost} />
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePostPage