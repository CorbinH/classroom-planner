import { Student } from "@/models/Student";
import classes from './DraggableStudentList.module.css';
import { Button, ScrollArea, Stack, Title, Divider, Paper, CloseButton } from "@mantine/core";
import { StudentDraggableCard } from "../StudentDraggableCard/StudentDraggableCard";
import { useDroppable } from "@dnd-kit/react";
import { StudentRelations } from "@/controllers/StudentRelations";
import { Layer, Line, Rect, Stage } from "react-konva";

export interface ClassroomCanvasProps {
  students:Student[], 
  studentRelations: StudentRelations,
}

function generateGridArrays(width:number, height:number, padding:number) {
  
  const gridArrays : {
    horizontal:number[][],
    vertical:number[][] 
  } = {
    horizontal: [],
    vertical: []
  }
  for (var i = 0; i < width / padding; i++) {
    gridArrays.horizontal.push([Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, height])
  }
  for (var j = 0; j < height / padding; j++) {
    gridArrays.vertical.push([0, Math.round(j * padding), width, Math.round(j * padding)])
  }
  return gridArrays
}

export function ClassroomCanvas({
    students,
    studentRelations
  }:ClassroomCanvasProps) {
  const blockSnapSize = 50;
  const gridArray = generateGridArrays(1000, 700, blockSnapSize)
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer name="grid">
        {
          gridArray.horizontal.map((point)=>{
            return <Line
              points={point}
              stroke='#ddddddce'
              strokeWidth={1}
              dash={[1,blockSnapSize-1]}
            />
          })
        }
        {
          gridArray.vertical.map((point)=>{
            return <Line
              points={point}
              stroke='#ddddddce'
              strokeWidth={1}
              dash={[1,blockSnapSize-1]}
            />
          })
        }
      </Layer>
    </Stage>
  )
}