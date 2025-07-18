import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const photoAPI = createApi({
  reducerPath: "apiPhoto",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7131/" }),
  tagTypes : ["Photos"],
  endpoints: (builder) => ({
    //QUERY -> GET
    //MUTATION -> POST/PUT/DELETE
    getPhotos: builder.query({
      query: (userId) => ({
        url : `PhotoGallery\\${userId}`,
        method : "GET",
        params : {}
      }),
      transformResponse : (res) => {
        if(res.photos)
           res.photos.sort((a,b) => b.id - a.id)
        return res

      },
      providesTags : ["Photos"]
    }),
    addPhotos: builder.mutation({
      query: (formData) => ({
        url : "PhotoGallery",
        method : "POST",
        body : formData
      }) ,
      invalidatesTags : ["Photos"]
    }),
    removePhoto: builder.mutation({
      query: (id) => ({
        url : `PhotoGallery\\${id}`,
        method : "DELETE",
      }) ,
      invalidatesTags : ["Photos"]
    }),
    updateLikeDislike: builder.mutation({
      query: ({id,userId,type}) => ({
        url : `PhotoGallery\\${id}\\${userId}\\${type}`,
        method : "PUT",
      }) ,
      invalidatesTags : ["Photos"]
    }),
    getComments: builder.query({
      query: (photoId) => ({
        url : `PhotoGallery\\comments\\${photoId}`,
        method : "GET",
      }) ,
      transformResponse : (res) => {
        if(res.result)
        {
             res.result.sort((a,b) => b.id - a.id)
        }
        return res;
      },
      providesTags : ["Comments"]
    }),
     addComments: builder.mutation({
      query: ({photoId,userId,comment}) => ({
        url : `PhotoGallery\\comments`,
        method : "POST",
        body:{
          photoId,userId,comment
        }
      }) ,
      invalidatesTags : ["Comments"]
    }),
    
  }),
});
export const { useGetPhotosQuery,
    useAddPhotosMutation,
 useUpdateLikeDislikeMutation,
 useGetCommentsQuery,
 useAddCommentsMutation,
 useRemovePhotoMutation
 } = photoAPI;