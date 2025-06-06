import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface FilteredServicesState<T> {
  filteredServices: Array<T>;
}

const initialState: FilteredServicesState<any> = {
  filteredServices: [],
};

const filteredServicesSlice = createSlice({
  name: "filteredServices",
  initialState,
  reducers: {
    setFilteredServices<T>(
      state: FilteredServicesState<T>,
      action: PayloadAction<Array<T>>
    ) {
      state.filteredServices = action.payload;
    },
    clearFilteredServices<T>(state: FilteredServicesState<T>) {
      state.filteredServices = [];
    },
  },
});

export const { setFilteredServices, clearFilteredServices } =
  filteredServicesSlice.actions;

export default filteredServicesSlice.reducer;
