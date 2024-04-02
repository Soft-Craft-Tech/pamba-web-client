"use client";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useContext } from 'react';
import { AuthPageContext } from '@/app/context/auth/authContext';

export default function Toast({message, type}) {
    const {showToast, setShowToast} = useContext(AuthPageContext);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowToast(false);
    }
    return (
        <Snackbar open={showToast} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={type}
                variant="filled"
                sx={{ width: '100%' }}
            >
            {message}
            </Alert>
        </Snackbar>
    )
}