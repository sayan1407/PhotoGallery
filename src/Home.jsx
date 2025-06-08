import React, { useEffect } from 'react'
import { useAddPhotosMutation, useGetPhotosQuery, useUpdateLikeDislikeMutation } from './Api/photoApi'
import withAuth from './HOC/withAuth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function Home() {
   
    const [uploadPhoto] = useAddPhotosMutation();
    const[updateLikeDislike] = useUpdateLikeDislikeMutation()
    const navigate = useNavigate()
    const loggedInUser = useSelector((store) => store.userAuthStore)
    console.log(loggedInUser)
    if(loggedInUser.id == "")
      navigate("/login")
    const { data, isLoading } = useGetPhotosQuery(loggedInUser.id);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", e.target.elements["image"].files[0]);
      const result = await uploadPhoto(formData);
      console.log(result)
      if (result.data) {
          if(result.data.isSuccess)
          toast.success("Photo uploaded successfully");
        else{
           const errorMsg = result.error.data.errorMessages.join(",");
           toast.error(errorMsg);
        }
        
      }
      if (result.error) {
        const errorMsg = result.error.data.errorMessages.join(",");
        toast.error(errorMsg);
      }
    };
    const handleUpdateLikeDislike = (id,type) => {
        updateLikeDislike({
           id :  id,
           userId : loggedInUser.id,
           type :  type
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
        
          {!isLoading && data.photos.map((value,index) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
            <div className="card h-100">
              <img
                src= {`images/${(value.fileName)}`}
                className="card-img-top"
                alt=""
              />
              <div className="card-body text-center">
                <button className={`${data.likedPhotos.map((l) => l.id).includes(value.id) ? "btn btn-success me-2" : "btn btn-outline-success me-2"}`} onClick={() => handleUpdateLikeDislike(parseInt(value.id),"like")}>
                  <i className={`bi ${data.likedPhotos.map((l) => l.id).includes(value.id) ? "bi bi-hand-thumbs-up-fill" : "bi-hand-thumbs-up"} `}></i>
                  <span className="badge bg-success ms-1">{value.like}</span>
                </button>
                <button className={`${data.disLikedPhotos.map((l) => l.id).includes(value.id) ? "btn btn-danger me-2" : "btn btn-outline-danger me-2"}`} onClick={() => handleUpdateLikeDislike(parseInt(value.id),"dislike")}>
                  <i className={`bi ${data.disLikedPhotos.map((l) => l.id).includes(value.id) ? "bi bi-hand-thumbs-down-fill" : "bi-hand-thumbs-down"} `}></i>
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


export default withAuth(Home)