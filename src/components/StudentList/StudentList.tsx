import { Student } from "@/models/Student";
import classes from './StudentList.module.css';
import { Button, ScrollArea, Stack, Title, Divider, Paper, CloseButton } from "@mantine/core";
import { StudentAvatar } from "../StudentAvatar/StudentAvatar";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useState } from "react";
import { setSelection } from "@testing-library/user-event/dist/cjs/event/selection/setSelection.js";

export interface StudentListProps {
  students:Student[], 
  title:string,
  selectedUUID?:string, 
  setSelectedUUID?:Dispatch<SetStateAction<string>>,
  enableRemoveStudent:boolean,
  removeStudent?(student:Student) : void
}

export function StudentList(props:StudentListProps) {
  return (
    <Stack className={classes.tower}>
      <Title order={4}>{props.title}</Title>
      <Divider/>
      <ScrollArea className={classes.scrollList}>
        {
          props.students.map((student)=>{
            return (
              <Paper withBorder shadow="s" p="xs" 
                key={student.uuid}
                className={classes.studentCard}
                data-active={student.uuid === props.selectedUUID || undefined}
                onClick={(event)=>{
                  props.setSelectedUUID ? props.setSelectedUUID(student.uuid):null
                }}>
                <StudentAvatar student={student} key={student.uuid}/>
                <div style={{"flexGrow":1}}/>
                {
                  props.enableRemoveStudent 
                  && props.removeStudent 
                  && <CloseButton onClick={(event)=>{props.removeStudent?props.removeStudent(student):null}}/>}
              </Paper>
            )
          })
        }
      </ScrollArea>
      <Button variant={"outline"} color={"indigo"} className={classes.button}><PlusCircleIcon size={24}/>Add Student</Button>
    </Stack>
  )
}