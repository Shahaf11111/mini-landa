import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { listProperties } from "./properties.api";

const initialState = {
    properties: [],
    current: 0,
}

export const listAsync = createAsyncThunk(
    "properties/list",
    async (page) => {
        const fetchedProperties = await listProperties(page);
        return fetchedProperties;
    }
);

export const propertiesSlice = createSlice({
    name: "properties",
    initialState,
    reducers: {
        list: (_, action) => {
            return ({ current: 0, properties: action.payload });
        },
        next: (state) => {
            if (state.properties.length >= state.current) {
                state.current = 0;
            } else {
                state.current += 1;
            }
        },
        previous: (state) => {
            if (state.current <= 0) {
                state.current = state.properties.length - 1;
            } else {
                state.current -= 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(listAsync.fulfilled, (state, action) => {
                state.properties = action.payload
            })
    },
});

export const selectProperties = (state) => state.properties.properties;
export const selectCurrent = (state) => state.properties.current;

export const { list, next, previous } = propertiesSlice.actions;

export default propertiesSlice.reducer;