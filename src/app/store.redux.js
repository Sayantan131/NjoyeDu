import { configureStore } from "@reduxjs/toolkit";
import  contactDetailsSlice  from "../features/contactDetailsSlice";

export const store = configureStore({
  reducer: {
    app:contactDetailsSlice,
  },
});
