import { Stack } from '@mantine/core';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

// provides `loaderData` to the component
export async function loader({}) {
  return { };
}

export default function StudentsPage() {
  return (
    <>
      <Stack>
        Students!
        <ColorSchemeToggle />
      </Stack>
    </>
  );
}
