import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchQuery: string | undefined;
}

const initialState: SearchState = {
  searchQuery: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string | undefined>) => {
      state.searchQuery = action.payload;
    },
    resetToast: (state) => {
      state.searchQuery = "";
    },
  },
});

export const { setSearchQuery, resetToast } = searchSlice.actions;

export default searchSlice.reducer;
