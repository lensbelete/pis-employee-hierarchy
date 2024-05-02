"use client";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas/employeeHierarchySaga";
import employeeHierarchyReducer from "../slices/employeeHierarchySlice";

import { employeeApi } from "./api/employe.api";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    [employeeApi.reducerPath]: employeeApi.reducer,
    employeeHierarchy: employeeHierarchyReducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare().concat([
      sagaMiddleware,
      employeeApi.middleware,
    ]);
  },
});

sagaMiddleware.run(rootSaga);

export default store;
