import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ToggleButton from 'react-toggle-button'

const SolveToggle = (props) => {
    let [solved, setSolved] = useState(false)
    let referencedPost = props.location.state;

    useEffect(() => 
    {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/`)
        .then(response => 
        {
            console.log(response.data);
            setSolved(response.data);
        });
    }, []);

    const handleSolved = (e) => {
        solved ? setSolved(false) : setSolved(true)
        let solve = {solved}
        axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${referencedPost._id}`, solve)
        .then(()=> {
            console.log(solved)
        })
        .catch(error => console.log(error))

    }

    return (
        <div>
            <ToggleButton 
            inactiveLabel={<span>x</span>} activeLabel={<span>solved</span>}
            value={solved || false} onToggle={handleSolved}
            />
        </div>
    )
}

export default SolveToggle