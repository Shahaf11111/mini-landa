import { Box } from "@mui/material";
import GameRound from "../../features/game";
import UserDetailsBar from "../../features/user/UserDetailsBar";
import { IMenuItem } from "../../interfaces";

export default function GamePage() {

    const menu: IMenuItem[] = [
        {
            title: "New Game",
            action: () => console.log('new game'),
        },
        {
            title: "Leaderboard",
            action: () => console.log('leaderboard'),
        }
    ];

    return (
        <Box>
            <UserDetailsBar menu={menu} />
            <GameRound />
        </Box>
    );
}
