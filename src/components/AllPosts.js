import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Feed = (props) =>
{
    // console.log(props);
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([])
    let [allTags, setAllTags] = useState([]);

    useEffect(() => 
    {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/`)
        .then(response => 
        {
            console.log(response.data);
            setPosts(response.data);
        });
    }, []);

    //find tags
    useEffect(() =>
    {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/tags`)
        .then(response =>
        {
            console.log(response.data);
            setAllTags(response.data);
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

    return(
        <div>
            <button>Tags filter</button>
            <br/>
            {allTags.map((eachTag, idx) =>
                                        {
                                            return(
                                                <div key={idx} className="form-check form-check-inline">
                                                    <input type="checkbox" name={"tag-" + eachTag.name} value={eachTag._id} onChange={(e) => {
                                                        if(e.target.checked) 
                                                        {
                                                            if (tags.length >= 5) {
                                                                alert("Max 5 tags!")
                                                                e.preventDefault()
                                                                return
                                                            }
                                                            let newTags = []
                                                            newTags = newTags.concat(tags,[e.target.value] )
                                                            console.log(newTags)
                                                            setTags(newTags) 
                                                        } 
                                                        else 
                                                        {
                                                            let newTags = []
                                                            newTags = tags.filter((t)=>{
                                                                return t !== e.target.value

                                                            })
                                                            setTags(newTags)
                                                        }
                                                                }} />
                                                    <label className="form-check-label" htmlFor={"tag-" + eachTag.name}>{eachTag.name}</label>
                                                </div>
                                            )
                                        })} 
                                        <button onClick={()=>{
                                            let filter = tags.join(',')
                                            let url = `${process.env.REACT_APP_SERVER_URL}/api/posts/?filter=${filter}`
                                            console.log(url)
                                            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/?filter=${filter}`)
                                            .then(response => 
                                            {
                                                console.log(response.data);
                                                setPosts(response.data);
                                            });
                                        }} type="submit" className="btn btn-primary">Submit</button>

            <h1>Posts and Questions</h1>
            {props.user ? newPost : errorDiv()}
            <hr />
            <div>
            {posts.map((post, idx) => 
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
        </div>
    )
}

export default Feed;