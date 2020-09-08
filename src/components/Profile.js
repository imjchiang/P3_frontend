import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Profile = (props) =>
{
    // console.log(props);
    const [posts, setPosts] = useState([]);
    
    let totalPosts = 0;
    posts.map((post, idx) => 
    {
        if (post.author && post.author._id === props.user.id)
        {
            totalPosts++;
        }
    });

    useEffect(() => 
    {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/`)
        .then(response => 
        {
            console.log(response.data);
            setPosts(response.data);
        });
    }, []);

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
                    <h1>{props.user.name}'s Profile</h1>
                    <hr />

                    <h3>Info</h3>
                    <p><strong>Email:</strong> {props.user.email}</p>
                    <p><strong>Number of Posts:</strong> {totalPosts}</p>
                    <p><strong>Number of Posts Commented On:</strong> 346554265</p>
                    <hr />

                    <h3>{props.user.name}'s Posts</h3>
                    <div>
                        {posts.map((post, idx) => 
                        {
                            if (post.author && post.author._id === props.user.id)
                            {
                                totalPosts++;
                                console.log(totalPosts);

                                let location = 
                                {
                                    pathname: `/post`,
                                    state: post
                                }
                                return (
                                    <div key={idx}>
                                        <Link to={location} key={post._id}>
                                            {post.title}
                                        </Link>
                                        <br/>
                                        {console.log(post.author)}
                                        <br/>
                                        {post.descriptionAndCode}
                                        <br/>
                                        <hr />
                                    </div>
                                )
                            }
                        })}
                    </div>
                    {/* <p>YEET</p>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br /> */}
                </>
            : 
                errorDiv()
            }
        </div>
    )
}

export default Profile;