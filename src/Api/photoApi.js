import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const photoAPI = createApi({
  reducerPath: "apiPhoto",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7131/" }),
  tagTypes : ["Photos"],
  endpoints: (builder) => ({
    //QUERY -> GET
    //MUTATION -> POST/PUT/DELETE
    getPhotos: builder.query({
      query: () => ({
        url : "PhotoGallery",
        method : "GET",
        params : {}
      }),
      transformResponse : (res) => res.sort((a,b) => b.id - a.id),
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
      query: ({id,type}) => ({
        url : `PhotoGallery\\${id}\\${type}`,
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