import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    reloadUser: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    }
  },
})
export const { setUser } = userSlice.actions
export default userSlice.reducer
