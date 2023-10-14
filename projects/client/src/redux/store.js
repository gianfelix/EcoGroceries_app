import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./reducer/AuthReducer";
// import UserReducer from "./reducer/UserReducer";
// import CategoryReducer from "./reducer/CategoryReducer";

export const store = configureStore({
    reducer: {
        AuthReducer: AuthReducer,
        // UserReducer: UserReducer,
        // CategoryReducer: CategoryReducer,
    },
});