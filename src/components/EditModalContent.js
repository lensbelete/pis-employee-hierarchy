"use client";
import { Button, TextInput } from "@mantine/core";
import { useUpdateEmployeeMutation } from "@/store/api/employe.api";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

export default function EditModalContent({ parent, node, onEdit }) {
  const [edit, { isLoading: editLoading }] = useUpdateEmployeeMutation();
  const schema = yup.object({
    position : yup.string().required(),
    description : yup.string().required()
  })

  const {register, handleSubmit} = useForm({
    resolver : yupResolver(schema)
  })

  const onSubmit = async (data) => {
    edit({
      id: node.id,
      position: data.position,
      description: data.description,
      children: node.children.map((c) => c.id),
    });

    onEdit(data);

  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}
    className='flex flex-col gap-3'
    >
      <input type='text' placeholder={node.position} {...register("position")}/>
      <input type='text' placeholder="edt description" {...register("description")}/>
      <Button type='submit'>Save</Button>
    </form>
  );
}
