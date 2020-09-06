import React from "react";
import {Link} from "react-router-dom";

const Feed = (props) =>
{
    console.log(props);

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

    //TODO: need function that...
        //grabs all posts 
        //styles the posts in JSX
        //throws all the posts into an array
        // return the array of posts

    return(
        <div>
            <h1>Posts and Questions</h1>
            {props.user ? newPost : errorDiv()}
            <hr />
            {/* display the posts here */}
        </div>
    )
}

export default Feed;