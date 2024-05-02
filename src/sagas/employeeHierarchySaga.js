"use client";
// src/sagas/employeeHierarchySaga.js

import { takeLatest, call, put } from "redux-saga/effects";
import {
  fetchTreeSuccess,
  fetchTreeFailure,
  fetchTreeStart,
  editEmployee,
  addEmployee,
  deleteEmployee,
} from "../slices/employeeHierarchySlice";
import {
  fetchEmployees,
  editEmployeeApi,
  addEmployeeApi,
  deleteEmployeeApi,
} from "../services/api";

function* fetchTreeSaga() {
  try {
    const response = yield call(fetchEmployees);
    yield put(fetchTreeSuccess(response.data));
  } catch (error) {
    yield put(fetchTreeFailure(error.toString()));
  }
}

function* editEmployeeSaga(action) {
  try {
    yield call(editEmployeeApi, action.payload);
    yield put(fetchTreeStart());
  } catch (error) {
    yield put(fetchTreeFailure(error.toString()));
  }
}

function* addEmployeeSaga(action) {
  try {
    yield call(addEmployeeApi, action.payload);
    yield put(fetchTreeStart());
  } catch (error) {
    yield put(fetchTreeFailure(error.toString()));
  }
}

function* deleteEmployeeSaga(action) {
  try {
    yield call(deleteEmployeeApi, action.payload);
    yield put(fetchTreeStart());
  } catch (error) {
    yield put(fetchTreeFailure(error.toString()));
  }
}

export default function* rootSaga() {
  // Make sure rootSaga is defined using function* syntax
  yield takeLatest(fetchTreeStart.type, fetchTreeSaga);
  yield takeLatest(editEmployee.type, editEmployeeSaga);
  yield takeLatest(addEmployee.type, addEmployeeSaga);
  yield takeLatest(deleteEmployee.type, deleteEmployeeSaga);
}
