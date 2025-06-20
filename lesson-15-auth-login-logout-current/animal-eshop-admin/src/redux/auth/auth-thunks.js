import { createAsyncThunk } from "@reduxjs/toolkit";

import { loginUserApi } from "../../shared/api/auth-api";

export const login = createAsyncThunk(
    "auth/login",
    async(payload, {rejectWithValue})=> {
        try {
            const data = await loginUserApi(payload);
            return data;
        }
        catch(error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)