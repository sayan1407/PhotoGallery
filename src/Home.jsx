import React, { useEffect } from 'react'
import { useAddPhotosMutation, useGetPhotosQuery, useUpdateLikeDislikeMutation } from './Api/photoApi'

function Home() {
    const {data,isLoading} = useGetPhotosQuery()
    const [uploadPhoto] = useAddPhotosMutation();
    const[updateLikeDislike] = useUpdateLikeDislikeMutation()
    useEffect(() => {
        if(!isLoading)
            console.log(data)
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file",e.target.elements["image"].files[0]);
        uploadPhoto(formData)
    }
    const handleUpdateLikeDislike = (id,type) => {
        updateLikeDislike({
            id,
            type
        })
    }
  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12">
          <h1>Photo Gallery</h1>
        </div>
      </div>

      <div className="row justify-content-center mb-5">
        <div className="col-md-6 upload-section">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="d-flex gap-2">
              <input type="file" className="form-control" id="image" name="image"/>
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-upload"></i>Upload
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="row g-4">
        
          {!isLoading && data.map((value,index) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
            <div className="card h-100">
              <img
                src= {`images/${(value.fileName)}`}
                className="card-img-top"
                alt=""
              />
              <div className="card-body text-center">
                <button className="btn btn-outline-success me-2" onClick={() => handleUpdateLikeDislike(parseInt(value.id),"like")}>
                  <i className="bi bi-hand-thumbs-up"></i>
                  <span className="badge bg-success ms-1">{value.like}</span>
                </button>
                <button className="btn btn-outline-danger" onClick={() => handleUpdateLikeDislike(parseInt(value.id),"dislike")}>
                  <i className="bi bi-hand-thumbs-down"></i>
                  <span className="badge bg-danger ms-1">{value.dislike}</span>
                </button>
              </div>
            </div>
          </div>
          ))}
        
        
       
        </div>
      </div>
   
  );
}

export default Home