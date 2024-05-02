"use client";
import { useState } from "react";
import { Button, Text, HoverCard, Modal, Card, Group } from "@mantine/core";
import EditModalContent from "./EditModalContent";
import AddModalContent from "./AddModalContent";
import DeleteModalContent from "./DeleteModalContent";
import CantDeleteModalContent from "./CantDeleteModalContent";
import {ChevronDown, ChevronUp, Edit, Delete, Add} from "../icons"

export default function EmployeeCard({ node, parent, isRootPosition = false }) {
  const { id, position, description, children = [] } = node;
  const [showChildren, setShowChildren] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const hasChildren = children.length > 0;

  return (
    <div className="">
      <Modal opened={showEdit} onClose={() => setShowEdit(false)} title="Edit">
        <EditModalContent
          node={node}
          parent={parent}
          onEdit={() => setShowEdit(false)}
        />
      </Modal>

      <Modal
        title="Delete"
        opened={showDelete}
        onClose={() => setShowDelete(false)}
      >
        {isRootPosition && (
          <CantDeleteModalContent reason="Cannot delete root position" />
        )}
        {hasChildren && !isRootPosition && (
          <CantDeleteModalContent reason="Cannot delete position having other positions beneath it" />
        )}
        {!isRootPosition && !hasChildren && (
          <DeleteModalContent
            node={node}
            parent={parent}
            onDelete={() => setShowDelete(false)}
          />
        )}
      </Modal>
      <Modal title="Add" opened={showAdd} onClose={() => setShowAdd(false)}>
        <AddModalContent
          node={node}
          parent={parent}
          onAdd={() => {
            setShowAdd(false);
            setShowChildren(true);
          }}
        />
      </Modal>

      
      <div >
        <HoverCard>
          <HoverCard.Target>
          <Card withBorder shadow="sm" radius="md" className='w-90 m-6'>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Text fw={600}>{position}</Text>
        </Group>
      </Card.Section>

      <Card.Section inheritPadding mt="sm" pb="md">
        <Group justify="space-between">
        {hasChildren && (
          
      
                  <Button
                    variant='transparent'
                    color="blue" radius="xs"
                    onClick={() => setShowChildren(!showChildren)}
                  >
                    {showChildren ? <ChevronUp/> : <ChevronDown/>}
                  </Button>
                )}
               
                <Button variant='transparent' color="blue" radius="xs" onClick={() => setShowEdit(true)}>
                <Edit/>
                </Button>

                <Button variant='transparent' color="blue" radius="xs" onClick={() => setShowDelete(true)}>
                  <Delete/>
                </Button>

                <Button variant='transparent' color="blue" radius="xs" onClick={() => setShowAdd(true)}>
                  <Add/>
                </Button>
        </Group>
      </Card.Section>
    </Card>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Text size="sm">{description}</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </div>
      {showChildren && hasChildren && (
        <div className="ml-6 pt-6 px-3 flex flex-col gap-3 border-l border-[#228be6]">
          {children.map((child) => (
            <EmployeeCard key={child.id} node={child} parent={node} />
          ))}
        </div>
      )}
    </div>
  );
}
