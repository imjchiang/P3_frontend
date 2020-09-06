import React, { useState, useEffect } from 'react'
import axios from 'axios';

function Post(props) {
    let [post, setPost] = useState([]);

    useEffect(()=> {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/`)
        .then(response =>{
            setPost(response.data)
        })
    }, [])

    return(
        <div>
            <h1>We are looking at a specific post</h1>
            {Post}
        </div>
    )
}

export default Post