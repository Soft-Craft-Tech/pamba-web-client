// General Toast
"use client";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function Toast({message, type}) {
    return (
        <Snackbar open={true} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
            <Alert
                severity={type}
                variant="filled"
                sx={{ width: '100%' }}
            >
            {message}
            </Alert>
        </Snackbar>
    )
}