import { Student } from "@/models/Student";
import classes from './DraggableStudentList.module.css';
import { Button, ScrollArea, Stack, Title, Divider, Paper, CloseButton } from "@mantine/core";
import { StudentAvatar } from "../StudentAvatar/StudentAvatar";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useState } from "react";
import { setSelection } from "@testing-library/user-event/dist/cjs/event/selection/setSelection.js";
import { StudentDraggableCard } from "../StudentDraggableCard/StudentDraggableCard";
import { useDroppable } from "@dnd-kit/react";
import {CollisionPriority} from '@dnd-kit/abstract';

export interface DraggableStudentListProps {
  students:Student[], 
  title:string,
  selectable:boolean,
  selectedUUID?:string, 
  setSelectedUUID?:Dispatch<SetStateAction<string>>,
  removeStudent?(student:Student) : void
}

export function DraggableStudentList(props:DraggableStudentListProps) {
  const {isDropTarget, ref} = useDroppable({
    id: props.title,
    type: 'column',
    accept: 'item',
  });
  return (
    <Stack 
      className={classes.tower}>
      <Title order={4}>{props.title}</Title>
      <Divider/>
      <ScrollArea
        ref={ref}
        className={classes.scrollList}
        data-isdroptarget={isDropTarget}>
        {
          props.students.map((student,idx)=>{
            return (
              <StudentDraggableCard 
                key={student.uuid} 
                student={student} 
                index={idx} 
                column={props.title} 
                removeStudent={props.removeStudent}/>)
          })
        }
      </ScrollArea>
    </Stack>
  )
}