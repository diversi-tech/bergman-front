import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CopyToClipboardButton = () => {
  const [text, setText] = useState('Hello, this is the text to copy!');
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setOpen(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography variant="h6">{text}</Typography>
      <TextField 
        label="Text to Copy" 
        variant="outlined" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        style={{ margin: '10px', width: '300px' }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleCopy}
        style={{ marginTop: '10px' }}
      >
        Copy Text to Clipboard
      </Button>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Text copied to clipboard!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CopyToClipboardButton;
