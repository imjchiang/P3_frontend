import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useHistory, Link} from 'react-router-dom'


const EditComment = (props) => {
    let [descriptionsAndCode, setDescriptionsAndCode] = useState("") 
    let [imgUrl, setImgUrl] = useState("")
    let [loading, setLoading] = useState(false)
    let history = useHistory()

    let referencedComment = props.location.state;
    let referencedPost = props.location.postId;

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
            console.log(imgUrl);
            let editComment = { descriptionsAndCode, author, referencedComment, imgUrl}
            console.log(editComment);
            axios.put(`${process.env.REACT_APP_SERVER_URL}/api/posts/${referencedPost}/comments/edit`, editComment)
            .then(()=> {
                setDescriptionsAndCode("")
                setImgUrl("")
                setLoading(true);
                history.goBack()
            })
            .catch(error => console.log(error))
        }
    }
    
    const errorDiv = () =>
    {
        return(
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to edit your post</h3>
            </div>
        );
    };

    return (
        <div>
            {props.user 
            ?
                <form onSubmit={submitForm}>
                    <div className="form-group col-md-6">
                        <label htmlFor="descriptionsAndCode">Description or Code</label>
                            <textarea type="text" name="descriptionsAndCode" value={descriptionsAndCode} onChange={(e) => {setDescriptionsAndCode([e.target.value])}} className="form-control" required/>
                    </div>
                    <div className="form-group col-md-6">
                            <label htmlFor="image">Code Image</label>
                                <input type="file" name="image" onChange={uploadImage} className="form-control"/>
                        </div> 
                    <button type="submit" className="btn btn-primary">{loading ? "Loading Image" : "Submit"}</button>
                </form>
            :
                <>
                    {errorDiv()}
                </>
            }
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}

export default EditComment