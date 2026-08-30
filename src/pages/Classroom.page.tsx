import { Stack } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { ClassroomCanvas } from '@/components/ClassroomCanvas/ClassroomCanvas';
import { useClassroomContext } from '@/context/ClassroomContext';
import { StudentList } from '@/components/StudentList/StudentList';

// provides `loaderData` to the component
export async function loader({}) {
  return { };
}

export default function ClassroomPage() {
  const {students, studentRelations} = useClassroomContext()
  return (
    <>
      <ClassroomCanvas students={[]} studentRelations={{worksWellWith:new Set<string>,distractedBy:new Set<string>}}/>
      <StudentList
        students={students}
        title="Students"
      ></StudentList>
    </>
  );
}
