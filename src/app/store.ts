//example using the dummyJson Users API
import { configureStore } from "@reduxjs/toolkit";
import { usersAPI } from "../feature/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    [usersAPI.reducerPath]: usersAPI.reducer,
  },
  // Adding the API middleware enables caching, invalidation, polling, and other features of `rtk-query`
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersAPI.middleware),
});
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
