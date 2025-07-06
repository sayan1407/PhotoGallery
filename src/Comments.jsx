import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useAddCommentsMutation, useGetCommentsQuery } from './Api/photoApi'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Comments() {
    const location = useLocation()
    console.log(location.state.photoId)
    const loggedInUser = useSelector((store) => store.userAuthStore)
    const {data,isLoading} = useGetCommentsQuery(location.state.photoId)
    const[addComments] = useAddCommentsMutation()
    const[comment,setComment] = useState("")
    useEffect(() => {
        if(!isLoading)
            console.log(data)
    })
    const handleAddComment = async (photoId) => {
    const result = await addComments({
      photoId: photoId,
      userId: loggedInUser.id,
      comment: comment,
    });
    console.log(result);
    if (result.data) {
      if (result.data.isSuccess) toast.success("Comments added successfully");
      else {
        const errorMsg = result.data.errorMessages.join(",");
        toast.error(errorMsg);
      }
      
    }
    else if (result.error) {
            const errorMsg = result.error.data.errorMessages.join(",");
            toast.error(errorMsg);
          }
    setComment("")
    }
  return (
    <div className="container py-5" id="commentsBody">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="comment-box">
                    <div className="text-center mb-4">
                        <img src={`images/${location.state.image}`} className="img-thumbnail w-100" alt="" />
                    </div>

                    <div className="mb-4">
                        <textarea className="form-control" rows="3" placeholder="Write a comment..." onChange={(e) => setComment(e.target.value)}></textarea>
                        <div className="d-flex justify-content-end mt-2">
                            <button className="btn btn-primary px-4" onClick={() => handleAddComment(location.state.photoId)}>
                                <i className="bi bi-chat-left-text me-2"></i>Comment
                            </button>
                        </div>
                    </div>
                    {!isLoading && data.result.map((value,index) => (
                        <div className="card comment-card mb-3 p-3" key={index}>
                        <span className="comment-user">{value.user.name}:</span>
                        <p className="mb-0">{value.comment}</p>
                    </div>
                    ))}
                    {/* <div className="card comment-card mb-3 p-3">
                        <span className="comment-user">User1:</span>
                        <p className="mb-0">HALA MADRID!!</p>
                    </div>

                    <div className="card comment-card p-3">
                        <span className="comment-user">User2:</span>
                        <p className="mb-0">We are the best team in the world!!</p>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Comments