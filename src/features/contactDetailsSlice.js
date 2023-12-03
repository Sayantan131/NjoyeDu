import { createSlice } from "@reduxjs/toolkit";

export const ContactDetailsSlice = createSlice({
  name: "contactDetails",
  initialState: {
    name: "",
    email: "",
    higesteducation: "",
    interest: "",
    gender: "",
    loading: false,
    error: null,
  },

  reducers: {
    contactdetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.higesteducation = action.payload.higesteducation;
      state.interest = action.payload.interest;
      state.gender = action.payload.gender;
    },
  },
});

export const { contactdetails } = ContactDetailsSlice.actions;

export default contactdetails.reducer;