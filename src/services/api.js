import axios from "axios";

const BASE_URL = "http://localhost:3000/employees";

const api = axios.create({ baseURL: BASE_URL });

export const fetchEmployees = () => api.get("/employees");

export const addEmployeeApi = (employee) => api.post("/employee", employee);

export const editEmployeeApi = (id, employee) =>
  api.put(`/employee/${id}`, employee);

export const deleteEmployeeApi = (id) => api.delete(`/employee/${id}`);

export const fetchTreeApi = () => api.get("/tree");

export default api;
