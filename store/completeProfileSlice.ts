import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompleteProfileState {
  step: number;
  queuedServices: { id: string; price: string }[];
  service: { id: string; price: string };
}

const initialState: CompleteProfileState = {
  step: 1,
  queuedServices: [],
  service: { id: "", price: "" },
};

const completeProfileSlice = createSlice({
  name: "completeProfile",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    setQueuedServices(
      state,
      action: PayloadAction<{ id: string; price: string }[]>
    ) {
      state.queuedServices = action.payload;
    },
    setService(state, action: PayloadAction<{ id: string; price: string }>) {
      state.service = action.payload;
    },
  },
});

export const { setStep, setQueuedServices, setService } =
  completeProfileSlice.actions;
export default completeProfileSlice.reducer;
