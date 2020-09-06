import React, { useEffect } from 'react'
import axios from 'axios';

function Post(props) {
    let [post, setPost] = useState([]);

    useEffect(()=> {
        axios.get(`${REACT_APP_SERVER_URL}/api/post/waitiing`)
        .then(response =>{
            setPost(response.data)
        })
    }, [])

    return(
        <div>
            {Post}
        </div>
    )
}

export default Post