import React, { useState, useEffect } from 'react'
import NewComment from './NewComment'

function Post(props) {
    let post = props.location.state;

    return(
        <div>
            {post ? 
                <>
                    <h1>We are looking at a specific post</h1>
                    <p>Title: {post.title}</p>
                    {/* <p>{post.tags}</p> */}
                    <p>Description: {post.descriptionAndCode}</p>
                    <p>Author: {post.author}</p>
                    {console.log(post.author)}
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