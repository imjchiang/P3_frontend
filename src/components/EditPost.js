import React, { useState, useEffect } from 'react' ;
import axios from 'axios';
import { useHistory} from 'react-router-dom';


const EditPost = (props) => {
    let [title, setTitle]= useState("")
    let [tags, setTags] = useState([])
    let [descriptionAndCode, setDescriptionAndCode] = useState([""])
    let [allTags, setAllTags] = useState("");
    
    let history = useHistory()

    let referencedPost = props.location.state;

    useEffect(() =>
    {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/tags`)
        .then(response =>
        {
            console.log(response.data);
            setAllTags(response.data);
        });
    }, []);

    useEffect(() =>
    {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/posts/${referencedPost._id}`)
        .then(response =>
        {
            console.log(response.data);
            setTitle(response.data.title);
            setTags(response.data.tags);
            setDescriptionAndCode(response.data.descriptionAndCode);
            
        });
    }, []);



    let submitForm = (e) => {
        e.preventDefault()
        // passing state variable works for key and value pair
        console.log(tags);
        let author = props.user.id;
        let newPost = { title, descriptionAndCode, tags, author }
        console.log(author);
        //reset edit api
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/posts/`, newPost)
        .then(()=> {
            setTitle("")
            setTags([])
            setDescriptionAndCode([""])
            // reset back
           history.goBack()
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
                                                <input type="checkbox" name={"tag-" + eachTag.name} value={eachTag._id} onChange={(e) => {
                                                    if(e.target.checked) {
                                                        if (tags.length >= 5) {
                                                            alert("Max 5 tags!")
                                                            e.preventDefault()
                                                            return
                                                        }
                                                        let newTags = []
                                                        newTags = newTags.concat(tags,[e.target.value] )
                                                        console.log(newTags)
                                                        setTags(newTags) 
                                                    } else {
                                                        let newTags = []
                                                        newTags = tags.filter((t)=>{
                                                            return t !== e.target.value

                                                        })
                                                        setTags(newTags)
                                                    }
                                                            }} />
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

export default EditPost