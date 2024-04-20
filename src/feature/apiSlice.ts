import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define an API service using RTK Query which allows us to handle data fetching
// and caching logic with minimal configuration
export const usersAPI = createApi({
  // Unique key for the reducer this API generates
  reducerPath: "usersAPI",
  // Set the base URL for all queries in this API
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  tagTypes: ["Users"],
  // Define API endpoints and the queries they should execute
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      // Endpoint to fetch all users, no parameters needed
      query: () => "users",
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, ...patchData }) => ({
        url: `users/${userId}`,
        method: "PATCH",
        body: patchData,
      }),
      // This line indicates which tags to invalidate once the mutation successfully completes.
      invalidatesTags: ["Users"],
      onQueryStarted: async (
        { userId, ...patchData },
        { dispatch, queryFulfilled, getState }
      ) => {
        // Step 1: Capture the current state for possible rollback
        const previousUser =
          getState().usersAPI.queries[`getUserById(${userId})`]?.data;

        // Step 2: Apply the optimistic update to the cache
        if (previousUser) {
          dispatch(
            usersAPI.util.updateQueryData("getAllUsers", undefined, (draft) => {
              const index = draft.findIndex((user: any) => user.id === userId);
              if (index !== -1) {
                draft[index] = { ...draft[index], ...patchData };
              }
            })
          );
        }

        try {
          // Step 3: Re-fetch the data after the mutation succeeds
          await queryFulfilled;
          // If the mutation is successful, this line triggers invalidation of the cache for all queries
          // associated with the "Users" tag. This means that any query that provides this tag
          // will be refetched, ensuring that the components have the latest data.
          dispatch(usersAPI.util.invalidateTags(["Users"]));
        } catch {
          // Step 4: Rollback the optimistic update if the mutation fails
          if (previousUser) {
            dispatch(
              usersAPI.util.updateQueryData(
                "getAllUsers",
                undefined,
                (draft) => {
                  const index = draft.findIndex(
                    (user: any) => user.id === userId
                  );
                  if (index !== -1) {
                    draft[index] = previousUser;
                  }
                }
              )
            );
          }
        }
      },
    }),
  }),
});
// Automatically generated hooks for each endpoint defined above.
// These hooks encapsulate the data fetching logic.
export const { useGetAllUsersQuery, useUpdateUserMutation } = usersAPI;
