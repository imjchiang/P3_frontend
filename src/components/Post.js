import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Post(props) {
    let post = props.location.state;

    return(
        <div>
            <h1>We are looking at a specific post</h1>
            <p>{post.title}</p>
            <p>{post.tags}</p>
            <p>{post.descriptionsAndCode}</p>
            <p>{post.author}</p>
            <p>{post.upvote}</p>
            <p>{post.downvote}</p>
            <p>{post.solve}</p>
            <p>{post.date}</p>
            
        </div>
    )
}

export default Post