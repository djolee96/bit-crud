import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import SignInPage from '../SignInPage'
import SignUpPage from '../SignUpPage'
import SinglePostPage from '../SinglePostPage'
import PostsPage from '../PostsPage'
import CreatePostPage from '../CreatePostPage'
import About from '../About'
import Dashboard from '../DashBoard';
import MyPosts from '../MyPosts';

class Main extends React.Component {


    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/posts" component={PostsPage} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/login" component={(props) => <SignInPage changeLogStatus={this.props.changeLogStatus} {...props} />} />
                    <Route exact path="/newUser" component={(props) => <SignUpPage changeLogStatus={this.props.changeLogStatus} {...props} />} />
                    <PrivateRoute>
                        <Route exact path="/post/:id" component={SinglePostPage} />
                        <Route exact path="/new_post" component={CreatePostPage} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/myposts" component={MyPosts} />
                    </PrivateRoute>
                    <Redirect from="/" to="/posts" />
                </Switch>
            </div>
        )
    }
}

function PrivateRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={() =>
                localStorage.getItem('isLogged') ? (
                    children
                ) : (
                        <Redirect
                            to="/login"
                        />
                    )
            }
        />
    );
}

export default Main