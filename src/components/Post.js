import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import NewComment from './NewComment'
import axios from 'axios';

function Post(props) {
    let referencedPost = props.location.state;
    let [post, setPost] = useState();
    let history = useHistory()

    // let [descriptionsAndCode, setDescriptionsAndCode] = useState("") 

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

    // let submitForm = (e) => 
    // {
    //     e.preventDefault()
    //     // passing state variable works for key and value pair
    //     let author = props.user.id

    //     let newComment = { descriptionsAndCode, author }
    //     console.log(newComment);
    //     axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${post._id}/comments`, newComment)
    //     .then(()=> {
    //         setDescriptionsAndCode("")
    //     })
    //     .then(()=> {
    //         return <Redirect to="/post" />
    //     })
    //     .catch(error => console.log(error))
    // }

    // function refreshPage() 
    // {
    //     window.location.reload(false);
    // }

    return(
        <div>
            {post ? 
                <div>
                    <h3>We are looking at a specific post</h3>
                    <p>Title: {post.title}</p>
                    <p>Tags: {post.tags.map((p, idx)=>{
                        
                        return <li key={idx}>{p.name}</li>
                        
                    })
                    }</p>
                    <p>Description: {post.descriptionAndCode}</p>
                    <p>Author: {post.author.name}</p>
                    {console.log(post.author.name)}
                    {/* <p>{post.upvote}</p> */}
                    {/* <p>{post.downvote}</p> */}
                    <p>Status: {post.solve ? "SOLVED" : "NOT SOLVED"}</p>
                    <p>Date: {post.date}</p>

                    {/* post author has option to delete or edit post */}
                    {props.user.id === post.author._id
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
                    {post.comments.map((c, idx)=>{
                        return(
                            <div key={idx}>
                                {c.descriptionsAndCode}
                                <br />
                                {c.author.name}
                                <br />
                                <hr />
                            </div>
                            //edit n delete
                        )
                    })}
                    <NewComment {...props} postId={post._id}/>

                    {/* <div>
                        <form onSubmit={submitForm}>
                            <div className="form-group col-md-6">
                                <label htmlFor="descriptionsAndCode">Description or Code</label>
                                    <textarea type="text" name="descriptionsAndCode" value={descriptionsAndCode} onChange={(e) => {setDescriptionsAndCode([e.target.value])}} className="form-control" required/>
                            </div>
                            <button onClick={refreshPage} type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div> */}


                </div>
            : 
                <h3>Loading...</h3>
            }
        </div>
    )
}

export default Post