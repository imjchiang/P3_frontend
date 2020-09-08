import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'


const NewComment = (props) => {

    let [descriptionsAndCode, setDescriptionsAndCode] = useState("") 

    let submitForm = (e) => {
        e.preventDefault()
        // passing state variable works for key and value pair
        let author = props.user.id

        let newComment = { descriptionsAndCode, author}
        console.log(newComment);
        axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${props.postId}/comments`, newComment)
        .then(()=> {
            setDescriptionsAndCode("")
        })
        .then(()=> {
            return <Redirect to="/post" />
        })
        .catch(error => console.log(error))
    }
    
    function refreshPage() 
    {
        window.location.reload(false);
    }

    return (
        <div>
            <form onSubmit={submitForm}>
                <div className="form-group col-md-6">
                    <label htmlFor="descriptionsAndCode">Description or Code</label>
                        <textarea type="text" name="descriptionsAndCode" value={descriptionsAndCode} onChange={(e) => {setDescriptionsAndCode([e.target.value])}} className="form-control" required/>
                </div>
                <button onClick={refreshPage} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default NewComment