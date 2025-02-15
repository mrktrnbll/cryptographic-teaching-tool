"use client";

import React, { useState } from "react";
import { Drawer, Box, Typography, Divider, Button } from "@mui/material";

export default function FloatingDrawer() {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen((prev)=> {
            console.log("Toggled", prev);
            return !prev;
        });
    };

    return (
        <div style={{ zIndex: 9999, position: "relative", minHeight: "80vh" }}>
            <Button
                variant="contained"
                onClick={handleToggle}
                sx={{
                    zIndex: 9999,
                    position: "fixed",
                    bottom: 16,
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                Show Tutorial
            </Button>

            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                PaperProps={{
                    sx: {
                        width: "400px",
                        top: "10%",
                        left: "1%",
                        justifySelf: "center",
                        height: "80vh",
                        boxShadow: "4px 4px 4px 4px rgba(0, 0, 0, 0.4)",
                        borderRadius: "8px",
                        backgroundColor: "rgb(179, 200, 207)",
                        backdropFilter: "blur(6px)",
                        zIndex: 9999,
                    },
                }}
                ModalProps={{
                    hideBackdrop: true,
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
                                Breaking the Enigma Machine
                            </Typography>
                            <Typography variant="body2">
                                This is the enigma machine navigator! Let&apos;s get started.
                            </Typography>
                            <Divider sx={{ marginY: 2 }} />
                        </Box>

                        <Box>
                            <Typography marginLeft={5} variant="subtitle1">
                                Introduction
                            </Typography>
                            The Enigma machine was a cipher device used by Nazi Germany during
                            World War II to encrypt and decrypt military communications. It
                            relied on a system of rotating rotors and plugboard connections to
                            generate complex, ever-changing cyphers. Breaking the enigma machine
                            would play a crucial role in shortening the war but it was
                            "unbreakable".
                        </Box>

                        <Box marginTop={2}>
                            <Typography marginLeft={5} variant="subtitle1">
                                Breaking the Enigma
                            </Typography>
                            - The Enigma machine had over 158,962,555,217,826,360,000 possible
                            settings. This made brute force checking near impossible - the
                            practice of trying every possible combination!
                            <br />
                            - On top of this, the setting changed every day! So if the code was
                            broken, they would have to do it all over again the next day.
                            <br />
                            <br />
                        </Box>

                        <Box textAlign={"center"} justifyItems={"center"}>
                            <Typography maxWidth={"65%"}>
                                Have a little play around with the machine, click some of the rotor
                                arrows, change the plugboard settings and see what happens! Try typing
                                in some text, are the inputs the same as the outputs?
                                <br />
                                Once you have done this and are ready to start the walkthrough, click
                                below to have a more structured tutorial.
                                <br />
                            </Typography>
                            <Button onClick={() => console.log("hello")}>Start Walkthrough</Button>
                        </Box>

                    </Box>

                    <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Typography variant="caption" color="textSecondary">
                            @mrktrnbll
                        </Typography>
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
}
