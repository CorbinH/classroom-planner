import { Student } from "@/models/Student";
import classes from './DraggableStudentList.module.css';
import { Button, ScrollArea, Stack, Title, Divider, Paper, CloseButton, NumberInput } from "@mantine/core";
import { StudentDraggableCard } from "../StudentDraggableCard/StudentDraggableCard";
import { useDroppable } from "@dnd-kit/react";
import { StudentRelations } from "@/controllers/StudentRelations";
import React, { useState, Dispatch, SetStateAction } from 'react';
import { Layer, Line, Rect, Stage } from "react-konva";
import { DeskIcon } from "@phosphor-icons/react";



export interface ControlBarProps {
  width:number, 
  height:number,
  setWidth:Dispatch<SetStateAction<number>>,
  setHeight:Dispatch<SetStateAction<number>>
}



export function ControlBar({
    width,
    height,
    setWidth,
    setHeight
  }:ControlBarProps) {
  return (
    <div className="controlBar">
      <DeskIcon size={16}></DeskIcon>
      <Divider orientation="vertical" />
      <NumberInput value={width} onChange={(value) => {if(value.valueOf() as number) setWidth(value.valueOf() as number)}}/>
        x
      <NumberInput value={height} onChange={(value) => {if(value.valueOf() as number) setHeight(value.valueOf() as number)}}/>
      <Divider orientation="vertical" />
      <Button>Shuffle</Button>
    </div>
  )
}