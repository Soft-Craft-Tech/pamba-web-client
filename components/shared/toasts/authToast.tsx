"use client";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { setShowToast } from "@/store/toastSlice";

export default function Toast({
  message,
  type,
}: {
  message: string | undefined;
  type: any;
}) {
  const {
    toast: { showToast },
  } = useSelector((state: RootState) => state);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setShowToast(false);
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
