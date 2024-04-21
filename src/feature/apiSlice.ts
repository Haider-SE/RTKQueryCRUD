import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../components/users/AddUserData";

// Define an API service using RTK Query which allows us to handle data fetching
// and caching logic with minimal configuration
export const usersAPI = createApi({
  // Unique key for the reducer this API generates
  reducerPath: "usersAPI",
  // Set the base URL for all queries in this API
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["Users"],
  // Define API endpoints and the queries they should execute
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      // Endpoint to fetch all users, no parameters needed
      query: () => "users",
      providesTags: ["Users"],
    }),
    addUser: builder.mutation({
      query: (userData) => ({
        url: `users`,
        method: "POST",
        body: userData,
      }),
      // This line indicates which tags to invalidate once the mutation successfully completes.
      invalidatesTags: ["Users"],
      onQueryStarted: async (userData, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          usersAPI.util.updateQueryData(
            "getAllUsers",
            undefined,
            (draft: User[]) => {
              return [...draft, userData]; //returns updated data immediately to show on the UI
            }
          )
        );
        try {
          // Step 3: Re-fetch the data after the mutation succeeds
          await queryFulfilled;
          // If the mutation is successful, this line triggers invalidation of the cache for all queries
          // associated with the "Users" tag. This means that any query that provides this tag
          // will be refetched, ensuring that the components have the latest data.
          dispatch(usersAPI.util.invalidateTags(["Users"]));
        } catch {
          // Step 4: Rollback the optimistic update if the mutation fails
          patchResult.undo();
        }
      },
    }),
  }),
});
// Automatically generated hooks for each endpoint defined above.
// These hooks encapsulate the data fetching logic.
export const { useGetAllUsersQuery, useAddUserMutation } = usersAPI;
