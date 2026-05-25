import { Student } from "@/models/Student";
import classes from './StudentDetails.module.css';
import { Button, ScrollArea, Stack, Text, Title, Divider, Paper, Textarea, Group, Avatar, TextInput, STYlE_PROPS_DATA } from "@mantine/core";
import { StudentAvatar } from "../StudentAvatar/StudentAvatar";
import { PlusCircleIcon, Target } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useCallback, useMemo, useRef, useState } from "react";
import { setSelection } from "@testing-library/user-event/dist/cjs/event/selection/setSelection.js";
import { StudentList } from "../StudentList/StudentList";
import { addStudentRelation, findStudentRelations, removeStudentRelation, StudentRelations } from "@/controllers/StudentRelations";
import { DraggableStudentList } from "../DraggableStudentList/DraggableStudentList";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { Droppable } from "@dnd-kit/abstract";

export interface StudentDetailsProps {
  students: Student[],
  selectedStudent: Student,
  studentRelations: StudentRelations,
  setStudentRelations: Dispatch<SetStateAction<StudentRelations>>
  updateStudent(student:Student): void
}

function getStudentsWithRelationUUIDs(students: Student[], relationUUIDs: string[]) {
  return students.filter((student)=>{return relationUUIDs.includes(student.uuid)})
}
function getStudentsWithNoRelations(students: Student[], relationUUIDs: string[]) {
  return students.filter((student)=>{return !relationUUIDs.includes(student.uuid)})
}

export function StudentDetails(props:StudentDetailsProps) {
  // console.log("[AllRelations] ", props.studentRelations)
  // console.log("[SelectedStudentWWWRelations] ", findStudentRelations(props.studentRelations,props.selectedStudent,"worksWellWith").toArray())
  const previousRelations = useRef(props.studentRelations)
  const worksWellWith = useMemo(()=>{
    const relations = findStudentRelations(props.studentRelations,props.selectedStudent,"worksWellWith").toArray()
    return getStudentsWithRelationUUIDs(props.students,relations)
  }, [props.students, props.studentRelations, props.selectedStudent])
  const distractedBy = useMemo(()=>{
    const relations = findStudentRelations(props.studentRelations,props.selectedStudent,"distractedBy").toArray()
    return getStudentsWithRelationUUIDs(props.students,relations)
  }, [props.students, props.studentRelations, props.selectedStudent])
  const neutral = useMemo(()=>{
    const relations = findStudentRelations(props.studentRelations,props.selectedStudent,"distractedBy").toArray().concat(
      findStudentRelations(props.studentRelations,props.selectedStudent,"worksWellWith").toArray()
    )
    return getStudentsWithNoRelations(
      props.students,
      findStudentRelations(
        props.studentRelations,
        props.selectedStudent,
        "worksWellWith").toArray().concat(relations)).filter(
          (s)=>{return s.uuid !== props.selectedStudent.uuid}
        )
  }, [props.students, props.studentRelations, props.selectedStudent])

  return (
    <Paper className={classes.tower}>
      <Stack  className={classes.tower}>
        <Group align="center">
          <Avatar size="xl" src={props.selectedStudent.img}/>
          <TextInput
            value={props.selectedStudent.name}
            style={{"alignContent":"center"}}
            onChange={(event)=>{
              props.updateStudent({...props.selectedStudent, "name":event.currentTarget.value})
            }}/>
        </Group>
        <Textarea label="Student Notes" name="Notes" onChange={(event)=>{
          props.updateStudent({...props.selectedStudent, "notes":event.currentTarget.value})
        }}/>
        <DragDropProvider
          onDragStart={() => {
            previousRelations.current = props.studentRelations;
          }}
          onDragOver={(event) => {
            const {target, source} = event.operation
            console.log("[onDragOver]: ",target,source)
            if(target) {
              const list = isSortable(target) ? target?.group : target.id
              const student = props.students.find((student)=>{return student.uuid === source?.id})
              if(student === undefined){
                return;
              }
              if(list === "Works Well With") {
                const relations = addStudentRelation(props.studentRelations,props.selectedStudent,student,"worksWellWith")
                props.setStudentRelations(relations)
              } else if(list === "Distracted By") {
                const relations = addStudentRelation(props.studentRelations,props.selectedStudent,student,"distractedBy")
                props.setStudentRelations(relations)
              } else {
                const step = removeStudentRelation(props.studentRelations,props.selectedStudent,student,"worksWellWith")
                const relations = removeStudentRelation(step,props.selectedStudent,student,"distractedBy")
                props.setStudentRelations(relations)
              }
            }
          }}
          onDragEnd={(event) => {
            const {source, target} = event.operation;

            if (event.canceled) {
              if (source?.type === 'item') {
                props.setStudentRelations(previousRelations.current);
              }

              return;
            }
          }}
        
        >
          <Group justify="space-around" align="stretch" flex={1} h="100px">
            <DraggableStudentList 
              title="Works Well With"
              students={worksWellWith}
              selectable={false}
              removeStudent={(student)=> {
                props.setStudentRelations(removeStudentRelation(props.studentRelations,props.selectedStudent,student,"worksWellWith"))
              }}
              />
            <DraggableStudentList 
              title="Neutral"
              students={neutral}
              selectable={false}
              />
            <DraggableStudentList 
              title="Distracted By"
              students={distractedBy}
              selectable={false}
              removeStudent={(student)=> {
                props.setStudentRelations(removeStudentRelation(props.studentRelations,props.selectedStudent,student,"distractedBy"))
              }}
              />
          </Group>
        </DragDropProvider>
      </Stack>
    </Paper>
  )
}