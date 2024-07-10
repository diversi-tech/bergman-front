
import React from 'react';
import { Box, Divider, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  // padding: '20px',
  borderTop: '1px solid #ccc',
  direction: 'rtl',
  position: 'sticky',
  // bottom: 0,
  width: '100%',
  backgroundColor: '#fff',
  fontFamily: 'sans-serif',
});

const Logo = styled('img')({
  height: '180px',
  marginRight: '20px',
});

const TextContainer = styled(Box)({
  textAlign: 'right',
  fontSize: '1.5em',
});

const CustomDivider = styled(Divider)({
  margin: '0 60px',
  backgroundColor: '#ccc',
});

const Footer = () => {
  return (
    <FooterContainer>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
        <Logo src='/logosmall.jpg' alt="CHANA BERGMAN Logo" />
        <CustomDivider orientation="vertical" flexItem />
        <TextContainer>
          <Typography variant="body1" style={{ margin: 0 }}>חנה ברגמן</Typography>
          <Typography variant="body1" style={{ margin: 0 }}>
            <Link href="tel:0527674311" style={{ textDecoration: 'none', color: 'inherit' }}>0527674311</Link> • 
            <Link href="tel:0733383374" style={{ textDecoration: 'none', color: 'inherit' }}>0733383374</Link>
          </Typography>
          <Typography variant="body1" style={{ margin: 0 }}>כתובת: יקלה, דושניצקי 71, בני ברק</Typography>
          <Typography variant="body1" style={{ margin: 0 }}>
            <Link href="mailto:c0527674311@gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>c0527674311@gmail.com</Link>
          </Typography>
        </TextContainer>
      </Box>
    </FooterContainer>
  );
};

export default Footer;

