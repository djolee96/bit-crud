import React from 'react'
import Input from './components/Input'
import Button from './components/Button'
import { fetchSinglePost, updatePost, deleteSinglePost } from "../services/postServices"
import Loader from './components/Loader'

class SinglePostPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            title: "",
            subtitle: "",
            imageUrl: "",
            text: ""
        }
    }

    componentDidMount() {
        let token = localStorage.getItem("currentUser")
        fetchSinglePost(this.props.match.params.id, token)
            .then(result => this.setState({
                title: result.title,
                subtitle: result.subtitle,
                imageUrl: result.imageUrl,
                text: result.text,
                sid: result.sid,
                loading: false
            }))
    }

    getTitle = (x) => {
        this.setState({ title: x })
    }

    getSubtitle = (x) => {
        this.setState({ subtitle: x })
    }

    getImageUrl = (x) => {
        this.setState({ ImageUrl: x })
    }

    getText = (x) => {
        this.setState({ text: x })
    }

    updatePost = () => {
        let data = {
            sid: this.state.sid,
            title: this.state.title,
            subtitle: this.state.subtitle,
            imageUrl: this.state.imageUrl,
            text: this.state.text
        }
        let token = localStorage.getItem("currentUser")

        updatePost(this.props.match.params.id, data, token)
        this.props.history.push('/myposts')

    }
    deletePost = () => {
        let data = {
            sid: this.state.sid,
            title: this.state.title,
            subtitle: this.state.subtitle,
            imageUrl: this.state.imageUrl,
            text: this.state.text
        }
        let token = localStorage.getItem("currentUser")
        deleteSinglePost(this.props.match.params.id, data, token)
            .then(result => {
                setTimeout(() => {
                    this.props.history.push('/myposts')
                }, 2000);
            })
    }

    render() {

        if (this.state.loading) {
            return <Loader />
        }

        return (
            <div className="singlePostPage row">
                <div className="col">
                    <h2>Update post</h2>
                    <p><span className="headStyle">Title:</span><br />
                        <Input type="text" placeholder="Enter title here" value={this.state.title} className="inputTitleName" onChange={this.getTitle} required />
                    </p>
                    <p><span className="headStyle">Subtitle:</span><br />
                        <Input type="text" placeholder="Enter subtitle here" value={this.state.subtitle} className="inputSubtitleName" onChange={this.getSubtitle} required />
                    </p>
                    <Input type="text" placeholder="Image URL" value={this.state.imageUrl} className="enterImageURL" onChange={this.getImageUrl} required />
                    <p><span className="headStyle">Text of post:</span><br />
                        <Input type="text" placeholder="Enter text here" value={this.state.text} className="inputTextOfPost" onChange={this.getText} required />
                    </p>
                    <Button value="DELETE" className="deletePost" onClick={this.deletePost} />
                    <Button value="SAVE" className="savePost" onClick={this.updatePost} />
                </div>
            </div >
        )
    }

}

export default SinglePostPage