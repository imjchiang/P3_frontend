import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Feed = (props) =>
{
    // console.log(props);
    const [posts, setPosts] = useState([]);

    useEffect(() => 
    {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/`)
        .then(response => 
        {
            console.log(response.data);
            setPosts(response.data);
        });
    }, []);

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
            {posts.map(post => 
            {
                let location = 
                {
                    pathname: '/post',
                    state: post
                }
                // `/post/${post._id}`
                return (
                    <div>
                        <Link to={location} key={post._id}>
                            {post.title}
                        </Link>
                        <br/>
                        {post.author}
                        <br/>
                        {post.descriptionAndCode}
                        <br/>
                        <hr />
                    </div>
                )
            }) }
            </div>
        </div>
    )
}

export default Feed;