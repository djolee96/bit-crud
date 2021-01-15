import React from 'react'
import PostListItem from '../components/PostListItem'

class PostsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
        }
    }
    render() {
        return (
            <div className="postsList row" >{
                this.props.posts.map(post => {
                    return <PostListItem key={post.id} data={post} />
                })}
            </div>)
    }
}


export default PostsList