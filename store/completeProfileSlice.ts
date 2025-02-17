import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CompleteProfileState {
  step: number;
  queuedServices: {
    name: string;
    category: string;
    price: string;
    description: string;
    estimatedTime: string;
    imageURL: string;
  }[];
  service: {
    name: string;
    category: string;
    price: string;
    description: string;
    estimatedTime: string;
    imageURL: string;
  };
}

const initialState: CompleteProfileState = {
  step: 1,
  queuedServices: [],
  service: {
    category: "",
    price: "",
    description: "",
    estimatedTime: "",
    name: "",
    imageURL: "",
  },
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
      action: PayloadAction<
        {
          name: string;
          category: string;
          price: string;
          description: string;
          estimatedTime: string;
          imageURL: string;
        }[]
      >
    ) {
      state.queuedServices = action.payload;
    },
    setService(
      state,
      action: PayloadAction<{
        name: string;
        category: string;
        price: string;
        description: string;
        estimatedTime: string;
        imageURL: string;
      }>
    ) {
      state.service = action.payload;
    },
  },
});

export const { setStep, setQueuedServices, setService } =
  completeProfileSlice.actions;
export default completeProfileSlice.reducer;
