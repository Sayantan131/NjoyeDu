import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// export const getCurrentUser = createAsyncThunk(
//   "user/getCurrentUser",
//   async () => {
//     const accessToken = localStorage.getItem("accessToken");
//     const response = await axios.get(
//       "http://localhost:5000/api/v1/users/current-user",
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     return response.data;
//   }
// );

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    userSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    getUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(getCurrentUser.fulfilled, (state, action) => {
  //     state.user = action.payload;
  //     state.loading = false;
  //   });
  //   builder.addCase(getCurrentUser.rejected, (state, action) => {
  //     state.loading = false;
  //     state.error = action.payload;
  //   });
  // },
});

export const {
  getUserStart,
  userSuccess,
  getUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
