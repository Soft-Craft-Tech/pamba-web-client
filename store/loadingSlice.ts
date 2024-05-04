import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILoadingState {
  [key: string]: boolean;
}

const initialState: ILoadingState = {};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    toggleLoading: (state, action: PayloadAction<string>) => {
      state[action.payload as keyof ILoadingState] =
        !state[action.payload as keyof ILoadingState];
    },
  },
});

export const { toggleLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
