import {createSlice} from "@reduxjs/toolkit";

import { login, getCurrent, logout } from "./auth-thunks";

const initialState = {
    token: "",
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: builder => {
        builder.addCase(login.pending, (store)=> {
            store.loading = true;
            store.error = null;
        })
        .addCase(login.fulfilled, (store, {payload})=> {
            store.loading = false;
            store.token = payload.token;
            store.user = payload.user;
        })
        .addCase(login.rejected, (store, {payload})=> {
            store.loading = false;
            store.error = payload;
        })
        .addCase(getCurrent.pending, (store)=> {
            store.loading = true;
            store.error = null;
        })
        .addCase(getCurrent.fulfilled, (store, {payload})=> {
            store.loading = false;
            store.token = payload.token;
            store.user = payload.user;
        })
        .addCase(getCurrent.rejected, ()=> initialState)
        .addCase(logout.pending, (store)=> {
            store.loading = true;
            store.error = null;
        })
        .addCase(logout.fulfilled, ()=> initialState)
        .addCase(logout.rejected, (store, {payload})=> {
            store.loading = false;
            store.error = payload;
        })
    }
});

export default authSlice.reducer;