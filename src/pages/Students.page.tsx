import { Stack } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { StudentAvatar } from '@/components/StudentAvatar/StudentAvatar';
import { Student } from '@/models/Student';

// provides `loaderData` to the component
export async function loader({}) {
  return { };
}
const student:Student = {name:"Johny Test",img:null,notes:null,works_well_with:[],distracted_by:[]}

export default function StudentsPage() {
  return (
    <>
      <Stack>
        <StudentAvatar student={student}/>
        <ColorSchemeToggle />
      </Stack>
    </>
  );
}
