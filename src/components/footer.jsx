import React from 'react';
import { Box, Divider, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../images/image (10).png'; // עדכן את נתיב הלוגו

const FooterContainer = styled('footer')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderTop: '1px solid #ccc',
  direction: 'rtl',
  position: 'sticky',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // רקע שחור שקוף
  fontFamily: 'sans-serif',
  color: 'white', // צבע טקסט לבן
  zIndex: 1000,
  marginTop: '550px',
});

const Logo = styled('img')({
  height: '180px',
  marginRight: '20px',
});

const TextContainer = styled(Box)({
  textAlign: 'right',
  fontSize: '1.5em',
  color: 'white', // צבע טקסט לבן
});

const CustomDivider = styled(Divider)({
  margin: '0 60px',
  backgroundColor: '#ccc',
});

const Footer = () => {
  return (
    <FooterContainer>
      <Box style={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1 }}>
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ height: 150, marginLeft: 2 }}
          />
        </Box>        <CustomDivider orientation="vertical" flexItem />
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
