import { Student } from "@/models/Student";
import classes from './StudentAvatar.module.css';
import { Image, Group, Text, Center } from "@mantine/core";
import { StudentIcon } from "@phosphor-icons/react";

export function StudentAvatar(props:{student:Student}) {
  const avatar = props.student.img != null ? 
    <Image className={classes.image} src={props.student.img}/> : 
    <Center className={classes.image}><StudentIcon size={24} /></Center>
  return (
    <Group className={classes.container}>
      {avatar}
      <Text>{props.student.name}</Text>
    </Group>
  )
}