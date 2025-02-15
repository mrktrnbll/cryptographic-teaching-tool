'use client';

import React, { useState } from 'react';
import {Box, Button, Divider, Drawer, Typography} from "@mui/material";
import SettingsInputComponentIcon from '@mui/icons-material/SettingsInputComponent';


export default function MachineSettings() {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prev)=> {
            console.log("Toggled", prev);
            return !prev;
        });
    };

    return (
        <div style={{zIndex: 9999, position: "relative", minHeight: "100vh"}}>
            <Button
                variant="contained"
                onClick={handleToggle}
                sx={{
                    zIndex: 9999,
                    position: "fixed",
                    bottom: 16,
                    left: "58%",
                    transform: "translateX(-50%)",
                }}
            >
                <SettingsInputComponentIcon />
            </Button>

            <Drawer
                variant="temporary"
                anchor="bottom"
                open={open}
                onClose={handleToggle}
                PaperProps={{
                    sx: {
                        position: "absolute",
                        top: "20%",
                        left: "2%",
                        transform: "translate(-50%, -50%)",
                        width: "60vw",
                        height: "60vh",
                        margin: "0 auto",
                        boxShadow: "10px 10px 10px 10px rgba(0, 0, 0, 0.4)",
                        borderRadius: "8px",
                        backgroundColor: "rgb(179, 200, 207)",
                        backdropFilter: "blur(8px)",
                        zIndex: 9999,
                    },
                }}
                sx={{
                    "& .MuiBackdrop-root": {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                        padding: 2,
                        pointerEvents: "auto",
                    }}
                >
                    <Box sx={{ flex: 1, overflowY: "auto", p: 2}}>
                        <Box sx={{textAlign: 'center'}}>
                            <Typography variant="h6" gutterBottom>
                                Enigma Machine Settings
                            </Typography>
                            <Typography variant="body2">
                                Change the settings of the plugboard here.
                            </Typography>
                            <Divider sx={{ marginY: 2 }} />
                        </Box>

                        <Box>
                            <Typography marginLeft={5} variant="subtitle1">
                                Plugboard Settings
                            </Typography>
                            ...
                        </Box>

                        <Box marginTop={2}>
                            <Typography marginLeft={5} variant="subtitle1">
                                Rotor Settings
                            </Typography>
                            ...
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <Button onClick={() => console.log("hello")}>Save Settings</Button>
                            <Typography variant="caption" color="textSecondary">
                                @mrktrnbll
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
}
