import React, { Component, Suspense } from 'react';
// import axios from 'axios';
// import { Route, Link } from 'react-router-dom';
// import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import { Route, NavLink, Switch } from 'react-router-dom';

import './Blog.css';
import Posts from './Posts/Posts';
// import FullPost from './FullPost/FullPost';

// import NewPost from './NewPost/NewPost';
// we'll use lazy loading to load NewPost component
// import asyncComponent from '../../hoc/asyncComponent';
// const AsyncNewPost = asyncComponent(() => {
//     return import('./NewPost/NewPost');
// });

// Lazy Loading with React Suspense (new feature of React 16.6)
// another way to use lazy loading to load NewPost component
const SuspenseNewPost = React.lazy(() => import('./NewPost/NewPost'));

class Blog extends Component {

    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                {/* if we use a regular HTML link with 'a href', then the page will be reloaded
                                to avoid this, there's the react-router Link tag  */}
                                {/* <Link to="/">Home</Link> */}
                                {/* using NavLink instead of Link to style the active link */}
                                <NavLink 
                                        to="/posts/" 
                                        exact
                                        // the default active link class name is 'active', but you can define a custom class name with 'activeClassName' attribute
                                        activeClassName="my-active" 
                                        // you can also define a custom style through inline CSS
                                        activeStyle={{
                                            color: '#fa923f',
                                            textDecoration: 'underline'
                                        }}>Posts</NavLink>
                            </li>
                            <li>
                                <NavLink to={{
                                        // pathname always works with absolute paths
                                        // if you need to work with relative paths, there's this workaround:
                                        // pathname: this.props.match.url + '/new-post',
                                        pathname: '/new-post',
                                        // pathname: 'new-post', // without the leading slash, it will also lead to example.com/new-post
                                        hash: '#submit', // we won't use this in the NewPost component, it's just an example of how to create HTML anchors using Link tag
                                        search: '?quick-submit=true' // we won't use this in the NewPost component, it's just an example of how to define path parameters using Link tag
                                }}>New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={() => <h1>Home</h1>} />
                <Route path="/" render={() => <h1>Home 2</h1>} /> */}
                {/* need to add the 'exact' attribute otherwise it will route everything that starts with "/", including /new-post */}
                {/* Switch tells React to load only one Route, the fist one that matches the path attribute
                Without Switch, more than one path attribute may match, which will result in multiple Routes being loaded */}
                <Switch> 
                    {/* adding a Guard to check if user is authenticated  */}
                    {/* lazy loading with asyncComponent */}
                    {/* {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null} */}
                    {/* lazy loading with modern aproach of React Suspense */}
                    {this.state.auth ? <Route path="/new-post" render={() => (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <SuspenseNewPost />
                                </Suspense>
                            )} /> : null}
                    {/* the order of the Routes is important */}
                    {/* <Route path="/new-post" component={NewPost} /> */}
                    <Route path="/posts" component={Posts} />
                    {/* <Redirect from="/" to="/posts" /> the same as: <Route path="/" component={Posts} /> */}
                    {/* this is a way to handle HTTP 404 - Page Not Found
                    if the path is omitted, then it will catch anything */}
                    <Route render={() => <h1>Page not found</h1>} />
                </Switch>
            </div>
        );
    }
}

export default Blog;