'use client';

import React from 'react';
import {Box, Button, Divider, Drawer, TextField, Typography} from "@mui/material";


export default function EnigmaSettings({open}) {

    const uniqueCharacter = (string: string, letter: string) => {
        return string.match(new RegExp(letter, "gi")).length === 1;
    };

    const checkPlugboardSettings: () => string = (): string => {
        const from = document.getElementById("from-input") as HTMLInputElement;
        const to = document.getElementById("to-input") as HTMLInputElement;

        if (from.value === "" || to.value === "") {
            return "Plugboard settings are set to default. A -> A, B -> B, etc.";
        } else if (from.value.length !== to.value.length) {
            return "Plugboard settings are invalid. Please make sure the number of characters in 'From' and 'To' are the same.";
        } else if (from.value.length > 13) {
            return "Plugboard settings are invalid. There can only be 13 pairs of characters. Please remove some pairs.";
        } else {
            const response = "A letter cannot map to two different letters. Please make sure the characters in 'From' and 'To' are unique.";
            for (let i = 0; i < from.value.length; i++) {
                if (from.value[i] === to.value[i]) {
                    return "Plugboard settings are invalid. Please make sure the characters in 'From' and 'To' are not the same. Just leave it empty if you want to set it to default.";
                } else if (!uniqueCharacter(from.value, from.value[i])) {
                    return response;
                } else if (!uniqueCharacter(to.value, to.value[i])) {
                    return response;
                }
            }
        }

        return `Plugboard settings are valid. ${from.value.toUpperCase()} -> ${to.value.toUpperCase()}`;
    }

    return (
        <div style={{zIndex: 9999, position: "relative", minHeight: "100vh"}}>
            <Drawer
                variant="persistent"
                anchor="right"
                open={open}
                PaperProps={{
                    sx: {
                        width: "350px",
                        top: "10%",
                        right: "1%",
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
                                Enigma Machine Settings
                            </Typography>
                            <Typography variant="body2">
                                Change the settings of the plugboard here.
                            </Typography>
                            <Divider sx={{ marginY: 2 }} />
                        </Box>

                        <Box>
                            <Typography variant="subtitle1">
                                Plugboard Settings
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <TextField sx={{marginBottom: 1}} id="from-input" label="From" variant="outlined" />
                                <TextField id="to-input" label="To" variant="outlined" />
                            </Box>
                        </Box>

                        <Box marginTop={2}>
                            <Typography variant="subtitle1">
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
                            <Button onClick={() => console.log(checkPlugboardSettings())}>Save Settings</Button>
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
