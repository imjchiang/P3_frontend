import React, {useState, useEffect} from "react"
import axios from "axios"

const Filter = (props) => {
    const [filterPosts, setFilterPosts] = useState([])

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/`)
        .then(response => {
            setFilterPosts(response.data)
        })
    })
    return (
        <div>
            {filterPosts.map((post, idx) => 
            {
                let location = 
                {
                    pathname: `/post`,
                    state: post
                }
                // `/post/${post._id}`
                return (
                    <div key={idx}>
                        <Link to={location} key={post._id}>
                            {post.title}
                        </Link>
                        <br/>
                        {post.author ? post.author.name : "No author available"}
                        <br/>
                        {post.descriptionAndCode}
                        <br/>
                        <hr />
                    </div>
                )
            }) }
        </div>
    )
}

export default Filter