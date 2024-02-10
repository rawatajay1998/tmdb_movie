"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchedMovie: "",
  loadMoreData: [],
  sortBy: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    search: (state, action) => {
      state.searchedMovie = action.payload;
    },
    loadData: (state, action) => {
      state.loadMoreData = [...state.loadMoreData, ...action.payload];
    },
    sortFunction: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { search, loadData, sortFunction } = counterSlice.actions;

export default counterSlice.reducer;
