import { configureStore } from "@reduxjs/toolkit";

import propertiesReducer from "../features/properties/properties.slice"

export default configureStore({
    reducer: {
        properties: propertiesReducer,
    },
});