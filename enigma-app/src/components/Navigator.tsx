"use client";

import React, { useState } from "react";
import { Drawer, Box, Typography, Divider, Button, Stepper, Step, StepLabel } from "@mui/material";

export default function Navigator({setVisualiseLetter}) {
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [walkthroughStarted, setWalkthroughStarted] = useState(false);
    const [visualiseFlip, setVisualiseFlip] = useState(false);

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
            content: "As you enter a letter, you might noticed that the numbers on the machine changed! These numbers show the current rotor positions. As you type, the rightmost rotor moves, altering its position and output.",
            moreContent2: "If you type the same letter repeatedly do you notice a pattern? Does the letter ever encrypt to itself?",
            moreContent3: "The answer to the above should be; no and no! There might be a pattern, however it will be far to complex for us to understand. A letter also cannot encrypt to itself!",
            moreContent4: "One last thing to do. Set the rotor number to 1, 4 and 16. Type any letters in randomly but keep a very close look at the rotor numbers. If you can notice something then you might just have cracked how the rotors work.",
        },
        {
            label: 'Plugboard Settings',
            content: "You now should have an idea for how to encrypt and decrypt secret messages as well as how the rotors work. The plugboard is another part of this puzzle.",
            moreContent2: "Open the connection menu at the bottom of your screen. From here we can change the configurations of the plugboard.",
            moreContent3: 'You have two text fields - "From" and "To". If you add Q to the "From" field and W to the "To" field, then every time you type Q it will encrypt to W and vice versa.',
            moreContent4: "You will also be zoomed into the plugboard on the engima machine to show that setting up these mappings used to be done manually with a bundle of wires!",
            moreContent5: "Since there are 26 letters in the alphabet you will notice if you add more than 13 connections then this will not work. Try understand what else might not work.",
        },
        {
            label: "Reflector",
            content: "The reflector is the final part of the enigma machine. You can't see it in this model because it is inside the machine and hidden away.",
            moreContent2: "The reflector works much like the plugboard but is not changeable by the machine operator. It is the reflector that stops a letter from mapping to itself - this was a major flaw.",
        },
        {
            label: "Breaking the Enigma",
            content: "The enigma machine was considered unbreakable by the Germans. However, the Alan Turing and his team managed to break the code and decrypt the messages. There was two main ideas used to break the enigma machine:",
            moreContent2: "  1. The enigma machine could not encrypt a letter to itself. This was a major flaw in the design of the machine. If you have a cypher text you could make a guess of what one of the words was and see if it ever contradicted this rule.",
            moreContent3: "  2. With the above rule in mind, the team could then use common phrases and words to rule out enigma machine setups.",
            moreContent4: "There was still one key issue. This took AGES! Alan Turing and his team commited to making a machine that would do this for them."
        },
        {
            label: "Conclusion",
            content: "???",
        }
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

    const handleFinish = () => {
        setActiveStep(0);
        setWalkthroughStarted(false);
    };

    const startWalkthrough = () => {
        setWalkthroughStarted(true);
    };

    const handlePlugboardVisualisation = () => {
        setVisualiseLetter(!visualiseFlip);
        setVisualiseFlip(!visualiseFlip);
    }

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
                        zIndex: 0,
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
                                        {activeStep === index + 1 && ( // Fix the index offset here
                                            <Box sx={{ mt: 1, mb: 1 }}>
                                                <Typography variant="body2">{step.content}</Typography>
                                                {step.moreContent && (
                                                    <>
                                                        <br />
                                                        <Typography variant="body2">{step.moreContent}</Typography>
                                                    </>
                                                )}
                                                {step.moreContent2 && (
                                                    <>
                                                        <br />
                                                        <Typography variant="body2">{step.moreContent2}</Typography>
                                                    </>
                                                )}
                                                {step.moreContent3 && (
                                                    <>
                                                        <br />
                                                        <Typography variant="body2">{step.moreContent3}</Typography>
                                                    </>
                                                )}
                                                {step.moreContent4 && (
                                                    <>
                                                        <br />
                                                        <Typography variant="body2">{step.moreContent4}</Typography>
                                                    </>
                                                )}
                                                {step.moreContent5 && (
                                                    <>
                                                        <br />
                                                        <Typography variant="body2">{step.moreContent5}</Typography>
                                                    </>
                                                )}
                                                {step.label === "Plugboard Settings" && (
                                                    <Box>
                                                        <br />
                                                        <Button onClick={() => handlePlugboardVisualisation(true)}>
                                                            Visualise Plugboard Settings
                                                        </Button>
                                                    </Box>
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
                                <Button onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}>
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
