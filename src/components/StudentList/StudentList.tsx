import { Student } from "@/models/Student";
import classes from './StudentList.module.css';
import { Button, ScrollArea, Stack, Title, Divider, Paper } from "@mantine/core";
import { StudentAvatar } from "../StudentAvatar/StudentAvatar";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useState } from "react";
import { setSelection } from "@testing-library/user-event/dist/cjs/event/selection/setSelection.js";

export interface StudentListProps {
  students:Student[], 
  selectedUUID?:string, 
  setSelectedUUID:Dispatch<SetStateAction<string>>
}

export function StudentList(props:StudentListProps) {
  return (
    <Stack className={classes.tower}>
      <Title order={4}>Students</Title>
      <Divider/>
      <ScrollArea className={classes.scrollList}>
        {
          props.students.map((student)=>{
            return (
              <Paper withBorder shadow="s" p="xs" 
                className={classes.studentCard}
                data-active={student.uuid === props.selectedUUID || undefined}
                onClick={(event)=>{
                  props.setSelectedUUID(student.uuid)
                }}>
                <StudentAvatar student={student} key={student.uuid}/>
              </Paper>
            )
          })
        }
      </ScrollArea>
      <Button><PlusCircleIcon size={24}/>Add Student</Button>
    </Stack>
  )
}