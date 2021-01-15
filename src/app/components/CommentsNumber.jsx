import React from 'react'
import { fetchPostComments } from '../../services/postServices'

class CommentsNumber extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            authorName: "",
            totalComments: []
        }
    }
    componentDidMount() {
        fetchPostComments(this.props.id)
            .then(totalComments => this.setState({ totalComments }))
    }
    render() {

        return (
            <span>{this.state.totalComments.length}</span>
        )
    }
}

export default CommentsNumber