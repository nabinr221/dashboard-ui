import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  fullName: '',
  email: '',
  refreshToken: '',
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserDetails: (state, actions) => {
      const { _id, fullName, email, refreshToken, isAuthenticated } =
        actions.payload;
      state.id = _id;
      state.fullName = fullName;
      state.email = email;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    resetUserDetails: (state, actions) => {
      state._id = '';
      state.fullName = '';
      state.email = '';
      state.isAuthenticated = false;
      state.refreshToken = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUserDetails, resetUserDetails } = userSlice.actions;

export default userSlice.reducer;
