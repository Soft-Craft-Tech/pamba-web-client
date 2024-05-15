"use client";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { RootState } from "@/store/store";
import { setShowToast } from "@/store/toastSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";

export default function Toast({
  message,
  type,
}: {
  message: string | undefined;
  type: any;
}) {
  const { showToast } = useAppSelector((state: RootState) => state.toast);
  const dispath = useAppDispatch();
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispath(setShowToast(false));
  };
  return (
    <Snackbar
      open={showToast}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
