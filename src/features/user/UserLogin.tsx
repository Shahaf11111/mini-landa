import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { login, selectUser } from "./user.slice";

export default function UserLogin() {

    const [username, setUsername] = React.useState('');
    const user = useAppSelector(selectUser);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleLogin = () => {
        dispatch(login(username));
    };

    React.useEffect(() => {
        if (user.username) {
            navigate('/home');
        }
    }, [navigate, user.username]);

    return (
        <Paper elevation={4}>
            <Typography variant='h5' fontWeight='bold' textAlign='center' p={2}>
                What Is Your Nickname?
            </Typography>
            <Box p={2}>
                <TextField
                    fullWidth
                    required
                    placeholder="Nickname"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <Button
                    sx={{ mt: 4, letterSpacing: 2, textTransform: 'none' }}
                    fullWidth
                    variant='contained'
                    onClick={handleLogin}
                >
                    Start
                </Button>
            </Box>
        </Paper>
    );
}
