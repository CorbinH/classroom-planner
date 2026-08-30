// 1. Create the Context (e.g., AppContext.js)
import { addStudentRelation, StudentRelations } from '@/controllers/StudentRelations';
import { Student } from '@/models/Student';
import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';

interface ClassroomContextProps {
  students: Student[],
  setStudents: Dispatch<SetStateAction<Student[]>>,
  studentRelations: StudentRelations,
  setStudentRelations:  Dispatch<SetStateAction<StudentRelations>>
}

const ClassroomContext = createContext<ClassroomContextProps>({
  students: [],
  setStudents: ()=>{},
  studentRelations: {
    worksWellWith: new Set<string>(),
    distractedBy: new Set<string>()
  },
  setStudentRelations: ()=>{}
});

const og_students:Student[] = [
  {uuid:crypto.randomUUID(),name:"Johny Test",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test2",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test3",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test4",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test5",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test6",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test7",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test8",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test9",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test10",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test11",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test12",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test13",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test14",img:null,notes:null},
  {uuid:crypto.randomUUID(),name:"Johny Test15",img:null,notes:null}
]

function shuffleRelations(students: Student[]) {
  const relations: StudentRelations = {
    worksWellWith: new Set<string>(),
    distractedBy: new Set<string>()
  }
  students.forEach((student, index)=>{
    for(let i = 0; i < 3; i++) {
      let ridx = Math.floor(Math.random() * (students.length-1))
      if(ridx >= index) {
        ridx+=1
      }
      addStudentRelation(relations,student,students[ridx],"worksWellWith")
    }
    for(let i = 0; i < 3; i++) {
      let ridx = Math.floor(Math.random() * (students.length-1))
      if(ridx >= index) {
        ridx+=1
      }
      addStudentRelation(relations,student,students[ridx],"distractedBy")
    }
  })
  console.log("[RelationsShuffle] ", relations)
  return relations
}

const shuffeledRelations = shuffleRelations(og_students)

export function ClassroomProvider({ children }: {
  children: React.ReactNode;
}) {
  
  const [students, setStudents] = useState(og_students)
  const [studentRelations, setStudentRelations] = useState(shuffeledRelations)

  return (
    <ClassroomContext.Provider value={{ students, setStudents, studentRelations, setStudentRelations }}>
      {children}
    </ClassroomContext.Provider>
  );
}

export const useClassroomContext = () => useContext(ClassroomContext);
