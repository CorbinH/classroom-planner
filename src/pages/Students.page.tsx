import { Group } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { StudentAvatar } from '@/components/StudentAvatar/StudentAvatar';
import { Student } from '@/models/Student';
import { StudentList } from '@/components/StudentList/StudentList';
import { useCallback, useContext, useMemo, useState } from 'react';
import { StudentDetails } from '@/components/StudentDetails/StudentDetails';
import { addStudentRelation, getRelationKey, StudentRelations } from '@/controllers/StudentRelations';

// provides `loaderData` to the component
export async function loader({}) {
  return { };
}

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

export default function StudentsPage() {
  const [students, setStudents] = useState(og_students)
  const [studentRelations, setStudentRelations] = useState(shuffeledRelations)
  const [activeStudentUUID, setActiveStudentUUID] = useState(students[0].uuid)

  const activeStudent = useMemo(
    ()=>{
        return students.find((student)=>student.uuid===activeStudentUUID)
    } ,[activeStudentUUID, students])

  const updateStudent = useCallback((student:Student)=>{
    const nextStudents = students.map((old_student:Student)=>{
      if(old_student.uuid == student.uuid ) {
        return student
      } else {
        return old_student
      }
    })
    setStudents(nextStudents)
  },[students])
  
  return (
    <>
      <Group style={{"height":"100%", "overflow":"hidden"}}>
        <StudentList 
          students={students} 
          title="Students"
          selectedUUID={activeStudentUUID} 
          setSelectedUUID={setActiveStudentUUID}
          enableRemoveStudent={false}/>
        {activeStudent && students && studentRelations &&
          <StudentDetails 
            students={students} 
            selectedStudent={activeStudent} 
            updateStudent={updateStudent}
            studentRelations={studentRelations}
            setStudentRelations={setStudentRelations}/>}
      </Group>
    </>
  );
}
