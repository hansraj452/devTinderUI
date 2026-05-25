import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice"
import connectionReucer from './connectionSlice'
import requestReducer from './requestSlice'
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    request: requestReducer,
    connection: connectionReucer,
  },
});

export default appStore;
