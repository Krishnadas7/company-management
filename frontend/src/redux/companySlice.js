import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCompanies = createAsyncThunk("companies/fetch", async () => {
  const response = await axios.get("/api/companies");
  return response.data;
});

const companySlice = createSlice({
  name: "companies",
  initialState: { companies: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCompanies.fulfilled, (state, action) => {
      state.companies = action.payload;
    });
  },
});

export default companySlice.reducer;
