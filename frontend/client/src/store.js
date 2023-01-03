import { configureStore} from "@reduxjs/toolkit"
import userReducer from 'features/user';
import { blogApi } from "features/blogApi";

export const store = configureStore({
   
    reducer: {
        user: userReducer,
        [blogApi.reducerPath]: blogApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(blogApi.middleware)


}); 

