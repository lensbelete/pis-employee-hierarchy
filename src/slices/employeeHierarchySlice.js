"use client";
// src/slices/employeeHierarchySlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tree: {
    id: 0,
    position: null,
    description: null,
    children: [
      {
        id: 0,
        position: "CEO",
        description: "Martin",
        children: [
          {
            id: 1,
            position: "EFO",
            description: "Starboy",
            children: [
              {
                id: 2,
                position: "Manager",
                description: "Martinelli",
                children: [
                  {
                    id: 3,
                    position: "Employee1",
                    description: "Trossard",
                    children: [],
                  },
                  {
                    id: 4,
                    position: "Employee2",
                    description: "Rice",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 5,
            position: "CFO",
            description: "White",
            children: [
              {
                id: 6,
                position: "Accountant",
                description: "Saliba",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  loading: false,
  error: null,
};

const employeeHierarchySlice = createSlice({
  name: "employeeHierarchy",
  initialState,
  reducers: {
    fetchTreeStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTreeSuccess(state, action) {
      state.loading = false;
      state.tree.children = [action.payload];
    },
    fetchTreeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    editEmployee(state, action) {
      // Handle editing employee
    },
    addEmployee(state, action) {
      // Handle adding employee
    },
    deleteEmployee(state, action) {
      // Handle deleting employee
    },
  },
});

export const {
  fetchTreeStart,
  fetchTreeSuccess,
  fetchTreeFailure,
  editEmployee,
  addEmployee,
  deleteEmployee,
} = employeeHierarchySlice.actions;

export default employeeHierarchySlice.reducer;
