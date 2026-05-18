import { Group } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { StudentAvatar } from '@/components/StudentAvatar/StudentAvatar';
import { Student } from '@/models/Student';
import { StudentList } from '@/components/StudentList/StudentList';
import { useState } from 'react';

// provides `loaderData` to the component
export async function loader({}) {
  return { };
}
const students:Student[] = [
  {uuid:crypto.randomUUID(),name:"Johny Test",img:null,notes:null,works_well_with:[],distracted_by:[]},
  {uuid:crypto.randomUUID(),name:"Johny Test2",img:null,notes:null,works_well_with:[],distracted_by:[]}
]

export default function StudentsPage() {
  const [activeStudent, setActiveStudent] = useState(students[0].uuid)
  return (
    <>
      <Group>
        <StudentList students={students} selectedUUID={activeStudent} setSelectedUUID={setActiveStudent}/>
      </Group>
    </>
  );
}
