import React from 'react';
import { useNavigate } from 'react-router-dom';   
import { Button } from '@mui/material';           
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Imports the back arrow icon from material UI

const BackButton = () => {
  // Get the navigate function from React Router – this lets us go back/forward
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"           // Outlined style (not filled, not just text)
      startIcon={<ArrowBackIcon />} // Places the back arrow to the left of the button text
      onClick={() => navigate(-1)}  // When clicked, go back one entry in the history stack
      sx={{ mt: 2 }}               // Material‑UI sx prop: adds margin‑top of 2 (theme spacing unit)
    >
      Back
    </Button>
  );
};
// We added this component because we want the user to be able to go back easily.
export default BackButton;