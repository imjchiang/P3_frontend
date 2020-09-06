import React, { useState } from 'react' ;
import axios from 'axios';

const NewPostForm = (props) => {
    let [title, setTitle]= useState("")
    let [tag, setTag] = useState("")
    let [desc, setDesc] = useState("")

    let submitForm = (e) => {
        e.preventDefault()
        // passing state variable works for key and value pair
        // let newPost = { title, desc, tag }
        // axios.post(`${REACT_APP_SERVER_URL}/api/post/waitiing`, newPost)
        .then(response => response.json())
        .then(()=> {
            setTitle("")
            setTag("")
            setDesc("")
        })
        .then(()=>{
            //ALL states are SET then.
            props.refreshPosts()
        })
        .catch(error => console.log(error))
    }

  return (
      <div className="row mt-4">
          <div className="col-md-7 offset-md-3">
              <div className="card card-body">
                  <h2>Post your question</h2>
                  <form onSubmit={submitForm}>
                  <div class="form-group col-md-6">
                  <label htmlFor="title">Title</label>
                    <input type="title" name="title" value={title} onChange={(e) => {setTitle(e.target.value)}} class="form-control" required/>
                  </div>
                  <div class="form-group col-md-6">
                  <label htmlFor="desc">Description</label>
                    <textarea type="desc" name="desc" value={desc} onChange={(e) => {setDesc(e.target.value)}} class="form-control" required/>
                  </div>
                  <div class="form-check form-check-inline">
                    <input type="checkbox" name="tag-html" onChange={(e) => {setTag(e.target.checked)}} />
                    <label class="form-check-label" htmlFor="tag-html">html</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input type="checkbox" name="tag-javascript" onChange={(e) => {setTag(e.target.checked)}} />
                    <label class="form-check-label" htmlFor="tag-javascript">javascript</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input type="checkbox" name="tag-css" onChange={(e) => {setTag(e.target.checked)}} />
                    <label class="form-check-label" htmlFor="tag-css">css</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input type="checkbox" name="tag-mongodb" onChange={(e) => {setTag(e.target.checked)}} />
                    <label class="form-check-label" htmlFor="tag-mongodb">MongoDB</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input type="checkbox" name="tag-nodejs" onChange={(e) => {setTag(e.target.checked)}} />
                    <label class="form-check-label" htmlFor="tag-nodejs">node.js</label>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>

                  </form>
              </div>
          </div>
      </div>

     )
  
}

export default NewPostForm