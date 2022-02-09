import { Box, Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Grid
      container
      justifyContent="center"
      style={{ height: '7vh', backgroundColor: '#082032', color:'white'  }}
    >
      <Box>
        <Typography>Copyright</Typography>
      </Box>
      <Box>
        <Typography>&copy; </Typography>
      </Box>
    </Grid>
  );
};

export default Footer;
