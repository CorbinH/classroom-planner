import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/", "./pages/Students.page.tsx"),
  route("/classroom", "./pages/Classroom.page.tsx"),
  // pattern ^           ^ module file
] satisfies RouteConfig;
