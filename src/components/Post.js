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
                <div>
                    <h3>We are looking at a specific post</h3>
                    <p>Title: {post.title}</p>
                    <p>Tags: {post.tags.map((p)=>{
                        
                        return <li>{p.name}</li>
                        
                    })
                    }</p>
                    <p>Description: {post.descriptionAndCode}</p>
                    <p>Author: {post.author.name}</p>
                    {console.log(post.author.name)}
                    {/* <p>{post.upvote}</p> */}
                    {/* <p>{post.downvote}</p> */}
                    <p>Status: {post.solve ? "SOLVED" : "NOT SOLVED"}</p>
                    <p>Date: {post.date}</p>
                    <hr />
                    <h5>Comments</h5>
                    <br />
                    <p>{post.comments.map((c)=>{
                        return(
                            <div>
                                {c.descriptionsAndCode}
                                <br />
                                {c.author.name}
                                <br />
                                <hr />
                            </div>
                        )
                    })}</p>
                    <NewComment {...props} postId={post._id}/>
                </div>
            : 
                <h3>Loading...</h3>
            }
        </div>
    )
}

export default Post