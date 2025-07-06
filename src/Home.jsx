import React, { useEffect, useState } from "react";
import {
  useAddPhotosMutation,
  useGetPhotosQuery,
  useRemovePhotoMutation,
  useUpdateLikeDislikeMutation,
} from "./Api/photoApi";
import withAuth from "./HOC/withAuth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Home() {
  const [uploadPhoto] = useAddPhotosMutation();
  const [updateLikeDislike] = useUpdateLikeDislikeMutation();
  const [deletePhoto] = useRemovePhotoMutation();
  const loggedInUser = useSelector((store) => store.userAuthStore);
  console.log(loggedInUser);
  const navigate = useNavigate();
  const[deletePhotoId,setDeletePhotoId] = useState(0)

  useEffect(() => {
    if (loggedInUser.id == "") navigate("/login");
  });

  // useEffect(() => {
  //   console.log(loggedInUser);
  //   if (loggedInUser.id == "") navigate("/login");
  // });

  const { data, isLoading } = useGetPhotosQuery(loggedInUser.id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.elements["image"].files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", e.target.elements["image"].files[0]);
      formData.append("UserId", loggedInUser.id);

      const result = await uploadPhoto(formData);
      console.log(result);
      if (result.data) {
        if (result.data.isSuccess) toast.success("Photo uploaded successfully");
        else {
          const errorMsg = result.error.data.errorMessages.join(",");
          toast.error(errorMsg);
        }
      }
      if (result.error) {
        const errorMsg = result.error.data.errorMessages.join(",");
        toast.error(errorMsg);
      }
    } else {
      toast.error("Please select a photo");
    }
    
  };
  const handleDeletePhoto = async (id) => {
    const result = await deletePhoto(id);
    console.log(result);
    if (result.data) {
      if (result.data.isSuccess) toast.success("Photo deleted successfully");
      else {
        const errorMsg = result.error.data.errorMessages.join(",");
        toast.error(errorMsg);
      }
    }
    if (result.error) {
      const errorMsg = result.error.data.errorMessages.join(",");
      toast.error(errorMsg);
    }
  };
  const handleUpdateLikeDislike = (id, type) => {
    updateLikeDislike({
      id: id,
      userId: loggedInUser.id,
      type: type,
    });
  };
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
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
              />
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-upload"></i>Upload
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
                className="modal fade"
                id="exampleModal"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Delete the photo
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      Are you sure want to delete?
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                        onClick={() => handleDeletePhoto(deletePhotoId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>

      <div className="row g-4">
        {!isLoading &&
          data.photos.map((value, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
              
              <div className="card h-100 shadow rounded-4 overflow-hidden">
                <div className="position-relative">
                  <button
                    className="btn p-0 w-100"
                    onClick={() =>
                      navigate("/comments", {
                        state: {
                          image: value.fileName,
                          photoId: value.id,
                        },
                      })
                    }
                    style={{ borderRadius: "0" }}
                  >
                    <img
                      src={`images/${value.fileName}`}
                      className="card-img-top img-fluid"
                      alt="Uploaded"
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                  </button>

                  {data.uploadedPhotos.map((u) => u.id).includes(value.id) ? (
                    <button
                      className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle"
                      title="Delete"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                       onClick={() => setDeletePhotoId(value.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="card-body text-center">
                  <h5 className="card-title mb-3 text-primary">
                    Uploaded by:{" "}
                    <span className="fw-semibold text-dark">
                      {value.user?.userName ?? ""}
                    </span>
                  </h5>

                  {/* Like button */}
                  <button
                    className={`${
                      data.likedPhotos.map((l) => l.id).includes(value.id)
                        ? "btn btn-success me-2"
                        : "btn btn-outline-success me-2"
                    }`}
                    onClick={() =>
                      handleUpdateLikeDislike(parseInt(value.id), "like")
                    }
                  >
                    <i
                      className={`bi ${
                        data.likedPhotos.map((l) => l.id).includes(value.id)
                          ? "bi bi-hand-thumbs-up-fill"
                          : "bi-hand-thumbs-up"
                      } `}
                    ></i>
                    <span className="badge bg-success ms-1">{value.like}</span>
                  </button>
                  <button
                    className={`${
                      data.disLikedPhotos.map((l) => l.id).includes(value.id)
                        ? "btn btn-danger me-2"
                        : "btn btn-outline-danger me-2"
                    }`}
                    onClick={() =>
                      handleUpdateLikeDislike(parseInt(value.id), "dislike")
                    }
                  >
                    <i
                      className={`bi ${
                        data.disLikedPhotos.map((l) => l.id).includes(value.id)
                          ? "bi bi-hand-thumbs-down-fill"
                          : "bi-hand-thumbs-down"
                      } `}
                    ></i>
                    <span className="badge bg-danger ms-1">
                      {value.dislike}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default withAuth(Home);
