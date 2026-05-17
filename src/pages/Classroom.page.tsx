import { Grid, Stack } from '@mantine/core';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

// provides `loaderData` to the component
export async function loader({}) {
  return { };
}

export default function ClassroomPage() {
  return (
    <>
      <Stack>
        Classroom!
        <ColorSchemeToggle />
      </Stack>
    </>
  );
}
