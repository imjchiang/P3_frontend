import React, { useState, useEffect } from 'react'
import NewComment from './NewComment'
import axios from 'axios';

function Post(props) {
    let referencedPost = props.location.state;
    let [post, setPost] = useState();

    useEffect(() =>
    {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/${referencedPost._id}`)
        .then(response =>
            {
        
            console.log(response.data);
            setPost(response.data);
        });
    }, []);

   

    return(
        <div>
            {post ? 
                <>
                    <h1>We are looking at a specific post</h1>
                    <p>Title: {post.title}</p>
                    <p>Tags: {post.tags.map((p)=>{
                        
                        return <div>{p.name}</div>
                        
                    })
                    }</p>
                    <p>Description: {post.descriptionAndCode}</p>
                    <p>Author: {post.author.name}</p>
                    {console.log(post.author.name)}
                    {/* <p>{post.upvote}</p> */}
                    {/* <p>{post.downvote}</p> */}
                    <p>Status: {post.solve ? "SOLVED" : "NOT SOLVED"}</p>
                    <p>Date: {post.date}</p>
                    <NewComment />
                </>
            : 
                <h3>Loading...</h3>
            }
        </div>
    )
}

export default Post