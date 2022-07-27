import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Api from '../../api';
import { RootState, AppThunk } from '../../app/store';
import { Side, User } from '../../interfaces';
import { score } from '../user/user.slice';

/*
 TODO:
idle - lasts 2-5 seconds
idle-failed
match - 1 second shape appearance:
match-failed
done
*/

interface GameRound {
  phase: 'idle' | 'run' | 'complete';
  side: Side | null;
}

const initialState: GameRound = {
  phase: 'idle',
  side: null,
};

export const gameRoundSlice = createSlice({
  name: 'game-round',
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    run: (state) => ({ ...state, phase: 'run' }),
    complete: (state) => ({ ...state, phase: 'complete' }),
    setSide: (state, action: PayloadAction<Side>) => ({ ...state, side: action.payload }),
  },
});


export const { reset, run, complete, setSide } = gameRoundSlice.actions;

export const selectPhase = (state: RootState) => state.gameRound.phase;
export const selectSide = (state: RootState) => state.gameRound.side;

export const userInput =
  (chosenSide: Side): AppThunk =>
    (dispatch, getState) => {
      const phase = selectPhase(getState());
      if (phase === "idle") {
        alert("Too Soon");
      } else if (phase === "run") {
        const side = selectSide(getState());
        if (side === chosenSide) {
          dispatch(score());
        } else {
          alert("Wrong Key");
        }
      } else if (phase === "complete") {
        alert("Too Late");
      }
    }


/*
 TODO:
idle - lasts 2-5 seconds
idle-failed
match - 1 second shape appearance:
match-failed
done
*/
// interface GameRound {
//   phase: 'idle' | 'run' | 'complete';
//   choice: Side | null,
// }
// export const login =
//   (username: string): AppThunk =>
//     async (dispatch, getState) => {
//       const currentUser = selectUser(getState());
//       if (currentUser.username) {
//         return;
//       }
//       const { data, message } = await Api.signUpOrLogIn(username);
//       console.log(data);
//       if (data) {
//         dispatch(setUserId(data._id));
//         dispatch(setUsername(data.username));
//         dispatch(setScore(data.score));
//       } else {
//         dispatch(reset());
//       }
//       alert(message);
//     };


// export const logout = (): AppThunk => (dispatch) => { dispatch(reset()) };


export default gameRoundSlice.reducer;
