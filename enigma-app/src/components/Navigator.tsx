'use client'

import React from 'react';
import { Drawer, Box, Typography, Divider, Button } from '@mui/material';

export default function FloatingDrawer() {
  return (
    <div className="font-whiteRabbit" style={{ position: 'absolute', width: '20vw', height: '100vh'}}>
      <Drawer
          variant="permanent"
          anchor="right"
          PaperProps={{
            sx: {
              width: 305,
              height: '60vh',
              marginTop: '10vh',
              marginRight: '0.5vw',
              boxShadow: '10px 10px 10px 10px rgba(0, 0, 0, 0.4)',
              borderRadius: '8px 8px 8px 8px',
              backgroundColor: 'rgb(179, 200, 207)',
              backdropFilter: 'blur(8px)',
              position: 'absolute',
              zIndex: 1
            },
          }}
      >
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              height: '100%',
              width: '100%',
              padding: 2,
              pointerEvents: 'auto'
            }}
        >
          <Box>
            <Typography variant="h6" gutterBottom>
              Breaking the Enigma Machine
            </Typography>
            <Typography variant="body2">
                This is the enigma machine navigator! Let's get started.
            </Typography>
            <Divider sx={{ marginY: 2 }} />
          </Box>

          <Box>
            <Typography marginLeft={5} variant="subtitle1">Introduction</Typography>
              The Enigma machine was a cipher device used by Nazi Germany during World War II
              to encrypt and decrypt military communications. It relied on a system of rotating
              rotors and plugboard connections to generate complex, ever-changing cyphers. Breaking
              the enigma machine would play a crucial role in shortening the war but it was "unbreakable".
          </Box>
          <Box marginTop={5}>
            <Typography marginLeft={5} variant="subtitle1">Decrypting</Typography>
            - The Enigma machine had over 158,962,555,217,826,360,000 possible settings. This made brute force
              checking near impossible - the practise of trying every possible combination.
              <br/>
            - On top of this, the setting changed every day! So if the code was broken, they would have
              to do it all over again the next day.
          </Box>

          <Box textAlign={"center"}>
            <Button onClick={() => console.log("hello")}>Start</Button>
          </Box>

          <Box textAlign="center">
            <Typography variant="caption" color="textSecondary">
              @mrktrnbll
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
