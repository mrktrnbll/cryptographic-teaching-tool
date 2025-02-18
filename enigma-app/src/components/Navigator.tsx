"use client";

import React, { useState } from "react";
import { Drawer, Box, Typography, Divider, Button, Stepper, Step, StepLabel } from "@mui/material";

export default function FloatingDrawer() {
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [walkthroughStarted, setWalkthroughStarted] = useState(false);

    const steps = [
        {
            label: 'Introduction',
            content: "The Enigma machine was a cipher device used during WWII to encrypt Nazi Germany communications. Explore its basic functions.",
            moreInfo: "Have a little play around with the machine—click some of the rotor arrows, change the plugboard settings, and see what happens!",
            moreInfo2: "Try typing in some text and observe if the inputs match the outputs. Once you're ready for a structured tutorial, click 'Start Walkthrough' to begin.",
        },
        {
            label: 'Guided Encryption',
            content: "If you didn't get there yourself, no worries! Let's start with the basics.",
            moreContent: "You will see three numbers on top of the machine, these are just above the keyboard and lampboard (the group of letters that light up when you type). Before you start typing your secret message make sure you remember the numbers and order.",
            moreContent2: "Once you have done that open the notepad at the bottom of your screen... You are now ready to type your secret message! - use spaces and letters, nothing else works on the enigma.",
            moreContent3: "The notepad will now have some nonsense text... but don't worry! This is actually just cypher text, and we have the key to decrypt it.",
            moreContent4: "Using red and green arrows near the rotor's numbers, you can change the rotor positions to the same values you remembered from before encrypting your message. Once done, type the cypher text into the enigma and see if you can decrypt it!",
        },
        {
            label: 'Rotor Mechanics',
            content: "As you enter a letter, you might notice that the numbers on the machine change! These numbers show the current rotor positions. As you type, the rightmost rotor moves, altering its position and output.",
        },
        {
            label: 'Plugboard Settings',
            content: "Understand how the plugboard further complicates the encryption.",
        },
    ];

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleNext = () => {
        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const handleBack = () => {
        setActiveStep((prev) => Math.max(prev - 1, 0));
    };

    const startWalkthrough = () => {
        setWalkthroughStarted(true);
    };

    return (
        <div style={{ zIndex: 9999, position: "relative", minHeight: "80vh" }}>
            <Button
                variant="contained"
                onClick={toggleDrawer}
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
                        height: "80vh",
                        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.4)",
                        borderRadius: "8px",
                        backgroundColor: "rgb(179, 200, 207)",
                        backdropFilter: "blur(6px)",
                        zIndex: 9999,
                    },
                }}
                ModalProps={{ hideBackdrop: true }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%", p: 2 }}>
                    <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                        {activeStep === 0 && !walkthroughStarted ? (
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    {steps[0].label}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {steps[0].content}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="body2">
                                    {steps[0].moreInfo}
                                </Typography>
                                <br />
                                <Typography variant="body2">
                                    {steps[0].moreInfo2}
                                </Typography>
                            </Box>
                        ) : (
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.slice(1).map((step, index) => (
                                    <Step key={step.label}>
                                        <StepLabel>{step.label}</StepLabel>
                                        {activeStep === index && (
                                            <Box sx={{ mt: 1, mb: 1 }}>
                                                <Typography variant="body2">
                                                    {step.content}
                                                </Typography>
                                                {step.moreContent && (
                                                    <>
                                                        <br />
                                                        <Typography variant="body2">
                                                            {step.moreContent}
                                                        </Typography>
                                                    </>
                                                )}
                                                {step.moreContent2 && (
                                                    <>
                                                        <br />
                                                        <Typography variant="body2">
                                                            {step.moreContent2}
                                                        </Typography>
                                                    </>
                                                )}
                                                {step.moreContent3 && (
                                                    <>
                                                        <br />
                                                        <Typography variant="body2">
                                                            {step.moreContent3}
                                                        </Typography>
                                                    </>
                                                )}
                                                {step.moreContent4 && (
                                                    <>
                                                        <br />
                                                        <Typography variant="body2">
                                                            {step.moreContent4}
                                                        </Typography>
                                                    </>
                                                )}
                                            </Box>
                                        )}
                                    </Step>
                                ))}
                            </Stepper>
                        )}
                    </Box>

                    <Box sx={{ mt: "auto" }}>
                        {!walkthroughStarted && activeStep === 0 && (
                            <Button variant="outlined" onClick={startWalkthrough} fullWidth>
                                Start Walkthrough
                            </Button>
                        )}
                        {walkthroughStarted && (
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Button disabled={activeStep === 0} onClick={handleBack}>
                                    Back
                                </Button>
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                                </Button>
                            </Box>
                        )}
                    </Box>

                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ textAlign: "center", pt: 1 }}>
                        <Typography variant="caption" color="textSecondary">
                            @mrktrnbll
                        </Typography>
                    </Box>
                </Box>
            </Drawer>
        </div>
    );
}
