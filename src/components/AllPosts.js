import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "../css/AllPosts.css"
import axios from "axios";

const Feed = (props) =>
{
    // console.log(props);
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([])
    const [filter, setFilter] = useState(false)
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
            <Link className="options" to="/post/new">
                Ask a Question
            </Link>
        </div>
    )

    //button for login redirect if wanting to create a new post
    const errorDiv = () =>
    {
        return(
            <div>
                <Link className="options" to="/login">
                    Login to Ask a Question
                </Link>
            </div>
        );
    };

    const toggleFilter = () =>
    {
        let currentFilter = filter;
        currentFilter = !currentFilter
        setFilter(currentFilter);
    }

    return(
        <div>
            <h2>- Posts and Questions -</h2>
            <div className="allposts-options">
                {props.user ? newPost : errorDiv()}
                <button onClick={toggleFilter} className="options">Tags filter</button>
            </div>
            <hr />

            {filter 
            ?
                <> 
                    <h6 className="allposts-filter">Filter by Tag: </h6>
                    <br />
                    {allTags.map((eachTag, idx) =>
                    {
                        return(
                            <div key={idx} className="form-check form-check-inline">
                                <input type="checkbox" 
                                    name={"tag-" + eachTag.name} 
                                    value={eachTag._id} 
                                    onChange={(e) => 
                                    {
                                        if(e.target.checked) 
                                        {
                                            if (tags.length >= 5) 
                                            {
                                                alert("Max 5 tags!")
                                                e.preventDefault()
                                                return
                                            }
                                            let newTags = []
                                            newTags = newTags.concat(tags,[e.target.value])
                                            console.log(newTags)
                                            setTags(newTags) 
                                        } 
                                        else 
                                        {
                                            let newTags = []
                                            newTags = tags.filter((t)=>
                                            {
                                                return t !== e.target.value
                                            })
                                            setTags(newTags)
                                        }
                                    }} 
                                />
                                <label className="form-check-label" htmlFor={"tag-" + eachTag.name}>{eachTag.name}</label>
                            </div>
                        )
                    })} 
                    <button type="submit" 
                        className="btn btn-primary"
                        onClick={() => 
                        {
                            let filter = tags.join(',')
                            let url = `${process.env.REACT_APP_SERVER_URL}/api/posts/?filter=${filter}`
                            console.log(url)
                            axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/?filter=${filter}`)
                            .then(response => 
                            {
                                console.log(response.data);
                                setPosts(response.data);
                            });
                        }}
                    >
                        Submit
                    </button>
                    <hr />
                </>
            :
                console.log("NO FILTER")
            }

            <div>
                {posts.map((post, idx) => 
                {
                    let location = 
                    {
                        pathname: `/post`,
                        state: post
                    }
                    return (
                        <div key={idx}>
                            <Link className="allposts-title" to={location} key={post._id}>
                                {post.title.length > 50 
                                ? 
                                    post.title.substring(0, 50) + " . . ."
                                :
                                    post.title
                                }
                            </Link>
                            <br/>
                            <div className="allposts-desc">
                                {post.descriptionAndCode[0].length > 250
                                ?
                                    post.descriptionAndCode[0].substring(0, 250) + " . . ."
                                :
                                    post.descriptionAndCode
                                }
                            </div>
                            <div className="allposts-author">
                                {post.author ? "Posted by " + post.author.name : "No author available"}
                            </div>
                            <hr />
                        </div>
                    )
                })}
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default Feed;