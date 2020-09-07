import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'


const NewComment = (props) => {
    let [descriptionAndCode, setDescriptionAndCode] = useState([""]) 

    let submitForm = (e) => {
        e.preventDefault()
        // passing state variable works for key and value pair
        let author = props.user.id
        let newComment = { descriptionAndCode, author}
        console.log(newComment);
        axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/` + props.postId, newComment)
        .then(()=> {
            
            setDescriptionAndCode([""])
        })
        .then(()=> {
            return <Redirect to="/post" />
        })
        .catch(error => console.log(error))
    }
    

    return (
        <div>
            <form onSubmit={submitForm}>
                    <div className="form-group col-md-6">
                    <label htmlFor="descriptionAndCode">Description or Code</label>
                        <textarea type="text" name="descriptionAndCode" value={descriptionAndCode} onChange={(e) => {setDescriptionAndCode([e.target.value])}} className="form-control" required/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default NewComment