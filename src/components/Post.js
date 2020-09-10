import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import NewComment from './NewComment'
import Solution from './Solution'
import axios from 'axios';
import SolveToggle from './SolveToggle';
import "../css/Post.css"
import "../css/Comments.css"

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
    const deletePost = () => 
    {
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/posts/${referencedPost._id}`)
        .then(response =>
        {
            console.log(response.data);
            history.push('/allPosts')
        });
    }

    //delete comment
    const deleteComment = (id) => 
    {
        let deletedComment = { id }
        axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${referencedPost._id}/comments/delete`, deletedComment)
        .then(response =>
        {
            console.log(response.data);
            window.location.reload(false);
            // history.push('/allPosts')
        });
    }

    return(
        <div>
            {post ? 
                <div>
                    <p className="post-title">{post.title}</p>
                    <hr />

                    {props.user && post.author && props.user.id === post.author._id
                    ?
                        <div>
                            <p className="post-status-title">Status: </p>
                            <div className="post-status">
                                <p className="post-status-content-special">{post.solved ? "SOLVED" : "NOT SOLVED"}</p>
                                <SolveToggle {...props} post={post}/>
                            </div>
                        </div>
                    :
                        <div>
                            <p className="post-status-title">Status: </p>
                            <p className="post-status-content">{post.solved ? "SOLVED" : "NOT SOLVED"}</p>
                        </div>

                    }

                    <p className="post-tag-title">Tags: </p>
                    <div className="all-post-tags">
                        {post.tags.map((tag, idx) => 
                        {
                            return <button className="post-tag" key={idx}>{tag.name}</button>
                        })}
                    </div>

                    <p className="post-desc-title">Description / Question: </p>
                    <p className="post-desc">{post.descriptionAndCode}</p>

                    {post.imgUrl && post.imgUrl.length > 0 
                    ? 
                        <>
                            <p className="post-code-title">Code / Display: </p>
                            <img className="post-code-img" src={post.imgUrl}/>
                        </>
                    : 
                        <></>
                    }

                    <p className="post-author-title">Author: </p>
                    <p className="post-author">{post.author && post.author.name ? post.author.name : "No Author Data Available"}</p>

                    {/* <p>{post.upvote}</p> */}
                    {/* <p>{post.downvote}</p> */}
                    
                    <p className="post-date-title">Timestamp: </p>
                    <p className="post-date">{post.date}</p>

                    {/* post author has option to delete or edit post */}
                    {props.user && post.author && props.user.id === post.author._id
                    ?
                        <div className="edit-and-delete">
                            <Link className="post-edit-toggle" to={location} key={post._id}>Edit Post</Link>
                            <button className="post-delete-toggle" onClick={deletePost}>Delete Post</button>
                        </div>
                    :
                        <div className="edit-and-delete"></div>
                    }

                    <hr />
                    <hr />

                    <p className="comment-title">Comments</p>
                    <hr />
                    {post.comments.map((c, idx) =>
                    {
                        return(
                            <div key={idx}>
                                <p className="comment-desc">{c.descriptionsAndCode}</p>

                                {c.imgUrl && c.imgUrl.length > 0 
                                ? 
                                    <>
                                        <p className="comment-img-title">Code / Display: </p>
                                        <img className="comment-img" src={c.imgUrl}/> 
                                    </>
                                : 
                                    <></>
                                }

                                {console.log(c._id)}
                                <br />
                                {c.author
                                ?
                                    <>
                                        <p className="comment-author-title">Author: </p>
                                        <p className="comment-author">{c.author.name}</p>
                                    </>
                                :
                                    "No Author Data Available"
                                }

                                {props.user && c.author && props.user.id === c.author._id
                                ?
                                    <div className="edit-and-delete-comment">
                                        <Link className="comment-edit-toggle" to={{pathname: `/comment/edit`, state: c._id, postId: post._id}} key={post._id}>edit</Link>
                                        <button className="comment-delete-toggle" onClick={() => deleteComment(c._id)}>delete</button>
                                    </div>
                                :
                                    <div className="edit-and-delete-comment"></div>
                                }

                                <Solution {...props} post={post} user={props.user} comment={c}/>
                                <hr />
                            </div>
                        )
                    })}
                    <NewComment {...props} postId={post._id}/>
                </div>
            : 
                <h3>Loading...</h3>
            }
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

export default Post;