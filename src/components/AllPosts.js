import React from "react";
import {Link} from "react-router-dom";

const Feed = (props) =>
{
    console.log(props);
    const newPost = 
    (
        <div>
            <Link to="/post/new">
                <button>Ask a Question</button>
            </Link>
        </div>
    )

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
            <h1>Posts and Questions</h1>
            {props.user ? newPost : errorDiv()}
            <hr />
        </div>
    )
}

export default Feed;