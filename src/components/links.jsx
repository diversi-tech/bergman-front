import React from 'react';
import { Box, TextField, Typography, Stack } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const SocialLinks = ({ linkedinUrl, githubUrl, handleLinkedinChange, handleGithubChange, urlError }) => {
  return (
    <Box mt={4} sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2, backgroundColor: 'white' }}>
      
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
        <LinkedInIcon sx={{ color: 'black' }} />
        <Typography variant="body1" sx={{ color: 'black' }}>
          קישור לפרופיל LinkedIn:
        </Typography>
      </Stack>
      <TextField
        id="linkedin-url"
        label="קישור לפרופיל LinkedIn"
        variant="outlined"
        fullWidth
        value={linkedinUrl}
        onChange={handleLinkedinChange}
        error={urlError}
        helperText={urlError ? "הקישור אינו תקין" : ""}
        sx={{ color: 'black' }}
      />
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
        <GitHubIcon sx={{ color: 'black' }} />
        <Typography variant="body1" sx={{ color: 'black' }}>
          קישור לגיטהאב:
        </Typography>
      </Stack>
      <TextField
        id="github-url"
        label="קישור לגיטהאב"
        variant="outlined"
        fullWidth
        value={githubUrl}
        onChange={handleGithubChange}
        error={urlError}
        helperText={urlError ? "הקישור אינו תקין" : ""}
        sx={{ color: 'black' }}
      />
    </Box>
  );
};

export default SocialLinks;
