import { Group } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { StudentAvatar } from '@/components/StudentAvatar/StudentAvatar';
import { Student, getNewStudent } from '@/models/Student';
import { StudentList } from '@/components/StudentList/StudentList';
import { Dispatch, SetStateAction, useCallback, useContext, useMemo, useState } from 'react';
import { StudentDetails } from '@/components/StudentDetails/StudentDetails';
import { addStudentRelation, getRelationKey, removeStudentFromAll, StudentRelations } from '@/controllers/StudentRelations';
import { useClassroomContext } from '@/context/ClassroomContext';

// provides `loaderData` to the component
export async function loader({}) {
  return { };
}



export default function StudentsPage() {
  const {students, setStudents, studentRelations, setStudentRelations} = useClassroomContext()
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

  const addStudent = useCallback(() => {
      const newStudent = getNewStudent()
      setStudents([...students, newStudent])
      setActiveStudentUUID(newStudent.uuid)
  },[students])

  const removeStudent = useCallback((student:Student)=>{
    const nextStudents = students.filter((old_student:Student)=>{
      return old_student.uuid != student.uuid
    })

    const nextStudentRelations = removeStudentFromAll(studentRelations,student)
    setStudents(nextStudents)
    setStudentRelations(nextStudentRelations)
    if(nextStudents.length > 0) {
      setActiveStudentUUID(nextStudents[0].uuid)
    }
  }, [students, studentRelations])
  
  return (
    <>
      <Group style={{"height":"100%", "overflow":"hidden"}}>
        <StudentList 
          students={students} 
          title="Students"
          selectedUUID={activeStudentUUID} 
          setSelectedUUID={setActiveStudentUUID}
          addStudent={addStudent}/>
        {activeStudent && students && studentRelations &&
          <StudentDetails 
            students={students} 
            selectedStudent={activeStudent} 
            updateStudent={updateStudent}
            removeStudent={removeStudent}
            studentRelations={studentRelations}
            setStudentRelations={setStudentRelations}
            />}
      </Group>
    </>
  );
}
