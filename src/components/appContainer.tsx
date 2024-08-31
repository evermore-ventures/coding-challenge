import { Container, CssBaseline } from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

function AppContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CssBaseline />
      <Container
        sx={{
          width: '600px',
          height: '600px',
          paddingTop: 5,
          background: grey[100],
          display: 'flex',
          flexDirection: 'column',
          marginTop: '100px',
          position: 'relative',
        }}
      >
        {children}
      </Container>
    </>
  );
}

export default AppContainer;
