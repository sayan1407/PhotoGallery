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
    updateLikeDislike: builder.mutation({
      query: ({id,userId,type}) => ({
        url : `PhotoGallery\\${id}\\${userId}\\${type}`,
        method : "PUT",
      }) ,
      invalidatesTags : ["Photos"]
    }),
    
  }),
});
export const { useGetPhotosQuery,
    useAddPhotosMutation,
 useUpdateLikeDislikeMutation
 } = photoAPI;