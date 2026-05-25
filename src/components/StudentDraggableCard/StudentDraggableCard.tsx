import { Student } from "@/models/Student";
import classes from './StudentDraggableCard.module.css';
import { Image, Group, Text, Center, Avatar, Paper, CloseButton } from "@mantine/core";
import { StudentIcon } from "@phosphor-icons/react";
import { useSortable } from "@dnd-kit/react/sortable";

interface StudentDraggableCardProps { 
  student:Student;
  index:number;
  column:string;
  removeStudent?(student:Student) : void;
}


export function StudentDraggableCard({
    student,
    index,
    column,
    removeStudent
  }: StudentDraggableCardProps
) {
  const {ref, isDragging} = useSortable({
    id:student.uuid,
    index,
    type: 'item',
    accept: 'item',
    group: column
  });
  return (
    <Paper withBorder shadow="s" p="xs"
      key={student.uuid}
      ref={ref} 
      data-dragging={isDragging}
      className={classes.studentCard}
      >
      <Group w={"100%"}>
        <Avatar src={student.img}/>
        <Text>{student.name}</Text>
        <div className={classes.spacer}/>
        {removeStudent && <CloseButton onClick={()=>{removeStudent(student)}} />}
      </Group>
    </Paper>
  )
}