"use client";
import React, { useState, useEffect } from "react"; // Import useState and useEffect from React
import { useDispatch, useSelector } from "react-redux";
// import { Container } from "@mantine/core";
import EmployeeCard from "../components/EmployeeCard";
import {
  fetchTreeStart,
  editEmployee,
  addEmployee,
  deleteEmployee,
  fetchTreeSuccess,
} from "../slices/employeeHierarchySlice";
import {useGetEmployeesQuery} from "@/store/api/employe.api";
// import { originalTree } from "../slices/employeeHierarchySlice"; // Import originalTree from the correct location

function toTree(nodes) {
  const nodeMap = {};
  for (const node of nodes) {
    nodeMap[node.id] = node;
  }

  const buildHierarchy = (node) => {
    node = { ...node };
    node.children = node.children.map((childId) => {
      const childTree = buildHierarchy(nodeMap[childId]);
      return childTree;
    });

    return node;
  };

  //assuming first id is root parent
  const root = buildHierarchy(nodes[0]);
  return root;
}

export default function Home() {
  const dispatch = useDispatch();
  const tree = useSelector((state) => state.employeeHierarchy.tree);
  // const [localTree, setLocalTree] = useState(originalTree);
  const { data, isLoading: employeesLoading } = useGetEmployeesQuery();
  // const [creteEm, { isLoading: createEmployeeLoading }] =
  //   useCreteEmployeeMutation();

  useEffect(() => {
    dispatch(fetchTreeStart()); // Dispatch fetchTreeStart action when component mounts
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(fetchTreeSuccess(toTree(data)));
    }
  }, [data]);

  if (!tree) {
    return <div>Loading...</div>;
  }
  const handleEditEmployee = (employee) => {
    dispatch(editEmployee(employee));
  };

  const handleAddEmployee = (employee) => {
    dispatch(addEmployee(employee));
  };

  const handleDeleteEmployee = (employeeId) => {
    dispatch(deleteEmployee(employeeId));
  };

  return (
    <>
    <nav className="bg-gray-800 flex items-center justify-between px-4 py-2 shadow-md">
          <h1 className="text-xl text-white font-bold text-center">Employee Hierarchy Structure</h1>
        </nav>
    
      
      <div className="bg-white flex justify-center items-center">
        
        <EmployeeCard
          node={tree.children[0]}
          parent={tree}
          onEditEmployee={handleEditEmployee}
          onAddEmployee={handleAddEmployee}
          onDeleteEmployee={handleDeleteEmployee}
          isRootPosition
        />
      </div>
   
    </>

    
  );
}
