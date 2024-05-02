"use client";
import { updateEmployee } from "@/services/api";
import {
  useCreteEmployeeMutation,
  useUpdateEmployeeMutation,
} from "@/store/api/employe.api";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import *  as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function AddModalContent({ parent, node, onAdd }) {
  const [create, { isLoading: createLoading }] = useCreteEmployeeMutation();
  const [edit, { isLoading: editLoading }] = useUpdateEmployeeMutation();
  const isLoading = createLoading || editLoading;


  const schema = yup.object({
    position : yup.string().required("test error"),
    description: yup.string().required()
  })

  const {register, handleSubmit,formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    const id = `${Math.round(Math.random() * 10000)}`;
    const child = {
      id,
      position: data.position,
      description: data.description,
      children: [],
    };

    console.log("child", child);
    create(child);

    const children = node.children.map((c) => c.id);
    children.push(id);
    console.log(children);
    edit({ ...node, children });

    onAdd(data);
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    // const id = `${Math.round(Math.random() * 10000)}`;
    // const child = {
    //   id,
    //   position: e.target.position.value,
    //   description: e.target.description.value,
    //   children: [],
    // };

    // console.log("child", child);
    // create(child);

  //   const children = node.children.map((c) => c.id);
  //   children.push(id);
  //   console.log(children);
  //   edit({ ...node, children });

  //   console.log("abebe");
  //   onAdd();
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
    className='flex flex-col gap-3'>
      {isLoading && <p>Loading...</p>}
    <input type='text' placeholder='Position' {...register("position")}/>
    <input type='text' placeholder='Description' {...register("description")}/>
    <TextInput placeholder="Description" error={errors?.description?.message} {...register("description")}/>
    <Button type='submit'>Add</Button>
  </form>
  );
}
