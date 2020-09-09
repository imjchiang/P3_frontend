import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SolveToggle = (props) => {
    let solved = props.post.solved;

    const handleSolved = (e) => 
    {
        if (solved)
        {
            axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${props.post._id}`, {solved: false})
            .then(()=> {
                window.location.reload(false);
            })
            .catch(error => console.log(error))
        }
        else
        {
            axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${props.post._id}`, {solved: true})
            .then(()=> {
                window.location.reload(false);
            })
            .catch(error => console.log(error));
        }
        console.log(solved);
    }

    return (
        <div>
            <button onClick={handleSolved}>Change Status</button>
        </div>
    )
}

export default SolveToggle;