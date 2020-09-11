import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "../css/Profile.css"

const Profile = (props) =>
{
    // console.log(props);
    const [posts, setPosts] = useState([]);
    let specificPosts = [];
    
    useEffect(() => 
    {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/`)
        .then(response => 
        {
            // console.log(response.data);
            setPosts(response.data);
        });
    }, []);

    let totalPosts = 0;
    posts.map((post, idx) => 
    {
        if (post.author && post.author._id === props.user.id)
        {
            totalPosts++;
        }
    });

    let totalComments = 0;
    posts.map((post, idx) => 
    {
        if (post.comments)
        {
            for (let i = 0; i < post.comments.length; i++)
            {
                if (post.comments[i].author && post.comments[i].author._id === props.user.id)
                {
                    totalComments++;
                    console.log(post);
                    specificPosts.push(post._id);
                }
            }
        }
    });

    const errorDiv = () =>
    {
        return(
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };

    return(
        <div>
            {props.user 
            ? 
                <>
                    <h2>- {props.user.name}'s Profile -</h2>
                    <hr />

                    <h3 className="profile-subtitle">Info</h3>
                    <p><strong>Email:</strong> {props.user.email}</p>
                    <p><strong>Number of Posts:</strong> {totalPosts}</p>
                    <p><strong>Number of Posts Commented On:</strong> {totalComments}</p>
                    <hr />
                    <hr />

                    <h3 className="profile-subtitle">{props.user.name}'s Posts</h3>
                    <div>
                        {posts.map((post, idx) => 
                        {
                            if (post.author && post.author._id === props.user.id)
                            {
                                let location = 
                                {
                                    pathname: `/post`,
                                    state: post
                                }
                                return (
                                    <div key={idx}>
                                        <Link className="profile-posts-title" to={location} key={post._id}>
                                            {post.title.length > 50 
                                            ? 
                                                post.title.substring(0, 50) + " . . ."
                                            :
                                                post.title
                                            }
                                        </Link>
                                        <br/>
                                        <p className="profile-posts-desc">
                                            {post.descriptionAndCode[0].length > 250
                                            ?
                                                post.descriptionAndCode[0].substring(0, 250) + " . . ."
                                            :
                                                post.descriptionAndCode
                                            }
                                        </p>
                                        <hr />
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <hr />
                    <h3 className="profile-subtitle">Posts {props.user.name} Commented On</h3>
                    <div>
                        {specificPosts.map((sp, idx) => 
                        {
                            return(
                                posts.map((post, idx) =>
                                {
                                    if (post._id === sp)
                                    {
                                        let location = 
                                        {
                                            pathname: `/post`,
                                            state: post
                                        }
                                        return(
                                            <div key={idx}>
                                                {console.log(post)}
                                                <Link className="profile-posts-title" to={location} key={post._id}>
                                                    {post.title.length > 50 
                                                    ? 
                                                        post.title.substring(0, 50) + " . . ."
                                                    :
                                                        post.title
                                                    }
                                                </Link>
                                                <p className="profile-posts-desc">
                                                    {post.descriptionAndCode[0].length > 250
                                                    ?
                                                        post.descriptionAndCode[0].substring(0, 250) + " . . ."
                                                    :
                                                        post.descriptionAndCode
                                                    }
                                                </p>
                                                <p className="profile-posts-author">Posted by {post.author ? post.author.name : "NO AUTHOR DATA FOUND"}</p>
                                                <hr />
                                            </div>
                                        )
                                    }
                                })
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
                </>
            : 
                errorDiv()
            }
        </div>
    )
}

export default Profile;