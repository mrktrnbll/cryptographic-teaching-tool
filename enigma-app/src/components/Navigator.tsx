'use client'

import React from 'react';
import {Drawer, Box, Typography, Divider} from '@mui/material';


export default function FloatingDrawer({moveToSwitchboard}) {

    return (
        <div className="font-whiteRabbit" style={{position: 'absolute', width: '100vw', height: '100vh'}}>
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
                        justifyContent: 'space-between',
                        height: '100%',
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
                        <Divider sx={{marginY: 2}}/>
                    </Box>

                    <Box>
                        <Typography variant="subtitle1">Introduction</Typography>
                        <ul style={{paddingLeft: 16}}>
                            <li>What is this tool?</li>
                            <li>Why is this tool?</li>
                            <li>Get playing!</li>
                        </ul>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1">Explore the parts</Typography>
                        <ul style={{paddingLeft: 16}}>
                            <li>Switchboard</li>
                            <li>Rotors</li>
                            <li><a className="cursor-pointer" onClick={() => moveToSwitchboard()}>Keyboard and Lampboard</a></li>
                        </ul>
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
