'use client';

import React, {useState, useEffect} from 'react';
import {Box, Button, Divider, Drawer, Typography} from "@mui/material";


export default function MachineSettings({message, open, setOpen}) {
    const [messageEmpty, setMessageEmpty] = useState(true);

    const messageRemove = () => {
        message.current = "";
        setMessageEmpty(false);
    };

    useEffect(() => {
        if (message.current === "") {
            setMessageEmpty(false);
        } else {
            setMessageEmpty(true);
        }
    }, [message.current]);

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
                                Enigma Outputs
                            </Typography>
                            <Typography variant="body2">
                                This is your noteboook. Here you can write down your messages and see the outputs of the Enigma Machine.
                            </Typography>
                            <Divider sx={{ marginY: 2 }} />
                        </Box>
                        <Box sx={{
                            width: '70%',
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                            alignSelf: 'center',
                            justifySelf: 'center',
                        }}>
                            <Typography variant="body1">
                                {
                                    messageEmpty &&
                                    (message.current.split('++').map((line, idx) => (
                                        <React.Fragment key={idx}>
                                            {line}
                                            <br/>
                                            <br/>
                                        </React.Fragment>)))
                                }
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ textAlign: 'center', p: 1 }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <Button onClick={messageRemove}>Erase Notes</Button>
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
