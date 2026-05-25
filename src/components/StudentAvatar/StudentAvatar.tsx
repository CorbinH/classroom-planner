import { Student } from "@/models/Student";
import classes from './StudentAvatar.module.css';
import { Image, Group, Text, Center, Avatar } from "@mantine/core";
import { StudentIcon } from "@phosphor-icons/react";

interface StudentAvatarProps { 
  student:Student;
}


export function StudentAvatar({
    student,
  }: StudentAvatarProps
) {
  return (
    <Group className={classes.container}>
      <Avatar src={student.img}/>
      <Text>{student.name}</Text>
    </Group>
  )
}