import React, { useState, useEffect } from 'react' ;
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const NewPostForm = (props) => {
    let [title, setTitle]= useState("")
    let [tag, setTag] = useState("")
    let [descriptionAndCode, setDescriptionAndCode] = useState([""])
    let [allTags, setAllTags] = useState("");

    useEffect(() =>
    {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/tags`)
        .then(response =>
        {
            // console.log(response.data);
            setAllTags(response.data);
        });
    }, []);



    let submitForm = (e) => {
        e.preventDefault()
        // passing state variable works for key and value pair
        let author = props.user.id;
        let newPost = { title, descriptionAndCode, tag, author }
        console.log(author);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/posts/`, newPost)
        .then(()=> {
            setTitle("")
            setTag("")
            setDescriptionAndCode([""])
            // setAuthor(props.user.id);
        })
        .then(()=> {
            return <Redirect to="/allPosts" />
        })
        .catch(error => console.log(error))
    }

    return (
        <>
            {allTags ? 
                <div className="row mt-4">
                    <div className="col-md-7 offset-md-3">
                        <div className="card card-body">
                            <h2>Post your question</h2>
                            <form onSubmit={submitForm}>
                                <div className="form-group col-md-6">
                                    <label htmlFor="title">Title</label>
                                        <input type="title" name="title" value={title} onChange={(e) => {setTitle(e.target.value)}} className="form-control" required/>
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="descriptionAndCode">Description or Code</label>
                                        <textarea type="text" name="descriptionAndCode" value={descriptionAndCode} onChange={(e) => {setDescriptionAndCode([e.target.value])}} className="form-control" required/>
                                </div>
                                {
                                allTags.map((eachTag, idx) =>
                                    {
                                        return(
                                            <div key={idx} className="form-check form-check-inline">
                                                <input type="checkbox" name={"tag-" + eachTag.name} onChange={(e) => {setTag(e.target.checked)}} />
                                                <label className="form-check-label" htmlFor={"tag-" + eachTag.name}>{eachTag.name}</label>
                                            </div>
                                        )
                                    })
                                }
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                :
                <h3>Loading...</h3>
            }
        </>

    )
  
}

export default NewPostForm