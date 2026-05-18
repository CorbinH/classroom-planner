import { Student } from "@/models/Student";
import classes from './StudentAvatar.module.css';
import { Image, Group, Text, Center, Avatar } from "@mantine/core";
import { StudentIcon } from "@phosphor-icons/react";

export function StudentAvatar(props:{student:Student}) {
  return (
    <Group className={classes.container}>
      <Avatar src={props.student.img}/>
      <Text>{props.student.name}</Text>
    </Group>
  )
}