import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'


const NewComment = (props) => {

    let [descriptionsAndCode, setDescriptionsAndCode] = useState("") 
    let [loading, setLoading] = useState(false)
    let [imgUrl, setImgUrl] = useState();

    let uploadImage = async e => 
    {
        setLoading(true);
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'scft486b')
        if (data)
        {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/dc8ufznd0/image/upload`,
                {
                    method: 'POST',
                    body: data
                }
            )
            const file = await res.json() 
            setImgUrl(file.secure_url)
            setLoading(false)
            console.log(file.secure_url)
        }
        else
        {
            setLoading(false);
        }
    }

    let submitForm = (e) => {
        e.preventDefault()
        // passing state variable works for key and value pair
        if (!loading)
        {
            let author = props.user.id

            let newComment = { descriptionsAndCode, author, imgUrl}
            console.log(newComment);
            axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${props.postId}/comments`, newComment)
            .then(()=> {
                setDescriptionsAndCode("")
                setImgUrl("")
                setLoading(true);
            })
            .then(()=> {
                return <Redirect to="/post" />
            })
            .catch(error => console.log(error))
        }
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
                <div className="form-group col-md-6">
                    <label htmlFor="image">Code Image</label>
                        <input type="file" name="image" onChange={uploadImage} className="form-control" multiple/>
                </div>  
                {props.user
                ?
                    <>{loading ? <button className="btn btn-primary">Loading</button> : <button onClick={refreshPage} type="submit" className="btn btn-primary">Submit</button>}</>
                :
                    <Link to="/login">
                        <button className="btn btn-primary">Login to Comment</button>
                    </Link>
                }
            </form>
        </div>
    )
}

export default NewComment