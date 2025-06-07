import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7131/api/" }),
  endpoints: (builder) => ({
    //QUERY -> GET
    //MUTATION -> POST/PUT/DELETE
    
    registerUser: builder.mutation({
        query: (userData) => ({
          url : `Auth/register`,
          method : "POST",
          headers : {
            "Content-type" : "application/json"
          },
          body : userData
        }),
      }),
      loginUser : builder.mutation({
        query: (userCredentials) => ({
          url : `Auth/login`,
          method : "POST",
          headers : {
            "Content-type" : "application/json"
          },
          body : userCredentials
        }),
      })
     
  }),
});
export const { useRegisterUserMutation, useLoginUserMutation} = authAPI;

 export default authAPI;