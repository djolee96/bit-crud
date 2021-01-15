import React from 'react'
import PostCard from '../components/PostCard'

class PostsGrid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
        }
    }
    render() {
        const filteredPosts = this.props.posts.filter((element) => (element.title + element.subtitle + element.text).toLowerCase().includes(this.props.searchQuery))
        return (
            <div className="postsList row" >{
                filteredPosts.map(post => {
                    return <PostCard key={post.id} data={post} />
                })}
            </div>)
    }
}


export default PostsGrid