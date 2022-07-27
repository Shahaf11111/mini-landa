import { Box, Dialog, Modal, Paper, Popper, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { run } from "./game.slice";

export default function Countdown() {
    // const [timeLeft, setTimeLeft] = React.useState(Math.floor(Math.random() * 5) + 2);
    const [timeLeft, setTimeLeft] = React.useState(1);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (!timeLeft) {
            dispatch(run())
            return;
        };

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);

    return (
        <Dialog open={timeLeft > 0}>
            <Box sx={{
                height: 150,
                width: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Typography fontFamily="monospace" variant="h1">{timeLeft}</Typography>
            </Box>
        </Dialog>
    );
}