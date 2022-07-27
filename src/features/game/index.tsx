import { Box } from "@mui/material";
import useEventListener from "../../hooks/useEventListener";
import ShapeBoard from "./ShapeBoard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Side } from "../../interfaces";
import { selectPhase, userInput } from "./game.slice";
import RoundResults from "./RoundResults";
import Countdown from "./Countdown";

export default function GameRound() {
    const phase = useAppSelector(selectPhase);
    const dispatch = useAppDispatch();

    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key == "a") {
            dispatch(userInput(Side.left));
        }
        if (event.key == "l") {
            dispatch(userInput(Side.right));
        }
    }

    useEventListener("keypress", handleKeyPress);

    return (
        <Box>
            {phase === "idle" && <Countdown />}
            <ShapeBoard draw={phase === "run"} />
            {phase === "complete" && <RoundResults />}
        </Box>
    );
}