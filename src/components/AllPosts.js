import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Feed = (props) =>
{
    console.log(props);

    //button for creating a new post
    const newPost = 
    (
        <div>
            <Link to="/post/new">
                <button>Ask a Question</button>
            </Link>
        </div>
    )

    //button for login redirect if wanting to create a new post
    const errorDiv = () =>
    {
        return(
            <div>
                <Link to="/login">
                    <button>Login to Ask a Question</button>
                </Link>
            </div>
        );
    };

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/`)
    
        .then(response => {
            console.log(response)
            setPosts(response.data)
        })
    }, [])

    //TODO: need function that...
        //grabs all posts 
        //styles the posts in JSX
        //throws all the posts into an array
        // return the array of posts

    return(
        <div>
            <h1>Posts and Questions</h1>
            {props.user ? newPost : errorDiv()}
            <hr />
            <div>
            {props.posts.map(post => {
                let location = {
                    pathname: '/post',
                    state: post
                }
                return (
                    <Link to={location} key={post.title}>
                    {post.title}
                    </Link>
                )
            }) }
            </div>
        </div>
    )
}

export default Feed;