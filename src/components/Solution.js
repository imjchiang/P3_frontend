import React from "react";
import axios from "axios";

const Solution = (props) =>
{
    let post = props.post
    let pickedSolution = false;

    console.log(post);

    {post.comments.map((c, idx) =>
    {
        if (c.starredOnPost)
        {
            console.log("FOUND A STARRED COMMENT");
            return pickedSolution = true;
        }
    })}

    if (props.user && post.author && props.user.id === post.author._id)
    {
        console.log("YOU ARE THE POST AUTHOR")
        // parse through all comments to check if at least one has been marked as the solution
        if (pickedSolution)
        {
            console.log(pickedSolution)
            console.log("SOLUTION HAS BEEN PICKED")
            if (props.comment.starredOnPost)
            {
                return (
                    <button 
                        onClick={() => 
                        {
                            axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${post._id}/comments/editStatus`, {starredOnPost: false, comment: props.comment._id})
                            .then(()=> 
                            {
                                console.log(props.comment.starredOnPost);
                                window.location.reload(false);
                            })
                            .catch(error => console.log(error))
                        }}>
                        Remove Solution
                    </button>
                )
            }
            //if yes, can only mark "starredOnPost" as false
                //refresh page
        }
        else
        {
            console.log(props.comment.starredOnPost);
            console.log(pickedSolution)
            console.log("PICK A SOLUTION")
            return (
                <button 
                    onClick={() =>
                    {
                        axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${post._id}/comments/editStatus`, {starredOnPost: true, comment: props.comment._id})
                        .then(()=> 
                        {
                            console.log(props.comment.starredOnPost);
                            window.location.reload(false);
                        })
                        .catch(error => console.log(error))
                    }}>
                    Set as Solution
                </button>
            )
            //if no, can only mark "starredOnPost" as true
                //refresh page
        }
    }
    else
    {
        console.log("NOT THE POST AUTHOR")
    }
    return null;
}

export default Solution;