import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import NewComment from './NewComment'
import axios from 'axios';

function Post(props) {
    let referencedPost = props.location.state;
    let [post, setPost] = useState();
    let history = useHistory();

    useEffect(() =>
    {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/${referencedPost._id}`)
        .then(response =>
        {
            console.log(response.data);
            setPost(response.data);
        });
    }, []);

    let location = 
    {
        pathname: `/post/edit`,
        state: post
    }

    //delete post
    const deletePost = () => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/posts/${referencedPost._id}`)
        .then(response =>
        {
            console.log(response.data);
            history.push('/allPosts')
        });
    }
    //delete comment
    const deleteComment = () => {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/posts/${referencedPost._id}/comments`)
        .then(response =>
        {
            console.log(response.data);
            history.push('/allPosts')
        });
    }

    return(
        <div>
            {post ? 
                <div>
                    <h3>{post.title}</h3>
                    <p>Tags: {post.tags.map((p, idx) => {return <li key={idx}>{p.name}</li>})}</p>
                    <p>Description: {post.descriptionAndCode}</p>
                    <p>Author: {post.author && post.author.name ? post.author.name : "No Author Data Available"}</p>
                    {/* {console.log(post.author.name)} */}
                    {/* <p>{post.upvote}</p> */}
                    {/* <p>{post.downvote}</p> */}
                    <p>Status: {post.solve ? "SOLVED" : "NOT SOLVED"}</p>
                    <p>Date: {post.date}</p>

                    {/* post author has option to delete or edit post */}
                    {props.user && post.author && props.user.id === post.author._id
                    ?
                        <div className="edit-and-delete">
                            <Link to={location} key={post._id}>Edit</Link>
                            <button onClick={deletePost}>Delete</button>
                        </div>
                    :
                        <div className="edit-and-delete"></div>
                    }

                    <hr />
                    <h5>Comments</h5>
                    <br />
                    {post.comments.map((c, idx) =>
                    {
                        return(
                            <div key={idx}>
                                {c.descriptionsAndCode}
                                <br />
                                {c.author
                                ?
                                    c.author.name
                                :
                                    "No Author Data Available"
                                }
                                <br />

                                {props.user && c.author && props.user.id === c.author._id
                                ?
                                    <div className="edit-and-delete-comment">
                                        <Link to={location} key={post._id}>edit</Link>
                                        <button onClick={deleteComment}>delete</button>
                                    </div>
                                :
                                    <div className="edit-and-delete-comment"></div>
                                }

                                <hr />
                            </div>
                        )
                    })}
                    <NewComment {...props} postId={post._id}/>
                </div>
            : 
                <h3>Loading...</h3>
            }
        </div>
    )
}

export default Post