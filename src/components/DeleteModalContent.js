"use client";
import {
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "@/store/api/employe.api";
import { Button } from "@mantine/core";
import { Children } from "react";

export default function DeleteModalContent({ node, parent, onDelete }) {
  const [remove, { isLoading: removeIsLoading }] = useDeleteEmployeeMutation();
  const [edit, { isLoading: editIsLoading }] = useUpdateEmployeeMutation();

  const onClick = () => {
    remove(node.id);
    edit({
      ...parent,
      children: parent.children.map((c) => c.id).filter((id) => id != node.id),
    });
    onDelete();
  };

  return (
    <div className="flex flex-col gap-3">
      <h3>Are you sure to delete</h3>
      <Button color="red" variant="filled" onClick={onClick}>
        Delete
      </Button>
    </div>
  );
}
