import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Snackbar, Typography, Alert } from '@mui/material';
import { useState } from 'react';
export default function CopyText({text}) {

    const [isCopied, setCopied] = useState(false);
    const copyTextToClipboard = async () => {
        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(text);
        } else {
            document.execCommand('copy', true, text);
        }
        setCopied(true);
        return;
    }

    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setCopied(false);
    };
    return (
            <Typography component="h2" variant="h6" color="text.secondary" >
                {text}
            <IconButton aria-label="copied" onClick={copyTextToClipboard}>
                <ContentCopyIcon />
            </IconButton>
            <Snackbar open={isCopied} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Copied
                </Alert>
            </Snackbar>
            </Typography>
    )
}