import '@mantine/core/styles.css';
import { MantineProvider, Flex, Box } from '@mantine/core';
import { theme } from './theme';
import { NavbarSimple } from './components/NavbarSimple/NavbarSimple';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <Flex>
            <NavbarSimple />
            <Box p={"sm"}>
              {children}
            </Box>
          </Flex>
        </MantineProvider>
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

// export default function App() {
//   return (
//     <html lang="en">
//       <head>
//         <link rel="icon" href="/favicon.ico" />
//       </head>
//       <body>
//         <MantineProvider theme={theme}>
//           <Flex>
//             <NavbarSimple />
//             <Box p={"sm"}>
//               <Outlet />
//             </Box>
//           </Flex>
//         </MantineProvider>
//         <Scripts />
//       </body>
//     </html>
//   );
// }