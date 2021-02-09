import React, { Component } from 'react';
import axios from '../../../axios';
// import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        console.log('[PostS.js] props:');
        console.log(this.props);
        axios.get( '/posts' )
            .then( response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Marco'
                    }
                });
                this.setState({posts: updatedPosts});
                // console.log( response );
            } )
            .catch(error => {
                console.log(error);
                // this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        // this.setState({selectedPostId: id});
        // another way to load the FullPost component is to add 
        // a new page to the navigation history
        this.props.history.push({pathname: '/posts/' + id}); // same as: this.props.history.push( '/' + id );
        
    }
    
    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                        // one way to load the FullPost component is to use a Link to pass the post ID
                        // <Link to={'/posts/' + post.id} key={post.id}>
                            <Post 
                                key={post.id} // the key must be in the out most component
                                title={post.title} 
                                author={post.author}
                                // one way to pass the parent routing properties to the child Post component
                                // {...this.props } 
                                clicked={() => this.postSelectedHandler(post.id)} />
                        // </Link>
                    );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                {/* adding a Route parameter 'id' */}
                {/* this is a nested Route, this Route in Posts.js is being called through the Route defined in Blog.js */}
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;