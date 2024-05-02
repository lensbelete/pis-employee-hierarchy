// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["employees"],

  endpoints: (builder) => ({
    getEmployees: builder.query<any, any>({
      query: () => `/employees`,
      providesTags: (res) => {
        if (Array.isArray(res)) {
          const employeeTags = res.map((employee: { id: string }) => ({
            type: "employees",
            id: employee.id,
          }));
          return employeeTags;
        } else {
          // Handle the case where res is not an array (optional)
          return []; // Or log an error message
        }
      },
      
      // providesTags: (res) => {
      //   const employeeTags = res.map((employee: { id: string }) => ({
      //     type: "employees",
      //     id: employee.id,
      //   }));

      //   console.log("employee tags", employeeTags);
      //   const listTag = { type: "employees", id: "list" };

      //   return [...employeeTags, listTag];
      // },
    }),

    creteEmployee: builder.mutation<any, any>({
      query: (body) => {
        return {
          url: "/employees",
          body: body,
          method: "POST",
        };
      },

      invalidatesTags: [{ type: "employees", id: "list" }],
    }),

    updateEmployee: builder.mutation<any, any>({
      invalidatesTags: (result, error, { id }) => [{ type: "employees", id }],

      query: (body) => {
        return {
          url: `/employees/${body.id}`,
          body: body,
          method: "PUT",
        };
      },
    }),

    deleteEmployee: builder.mutation<any, any>({
      invalidatesTags: (result, error, id) => [{ type: "employees", id }],
      query: (id) => {
        return {
          url: `/employees/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetEmployeesQuery,
  useCreteEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
