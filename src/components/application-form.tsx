import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "@/components/layout";

import { BasicInfo } from "./basic-info";
import { Credits } from "./credits";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        loader: () => redirect("basic-info"),
      },
      {
        path: "basic-info",
        element: <BasicInfo />,
      },
      {
        path: "credits",
        element: <Credits />,
      },
      {
        path: "gaps-and-needs",
        element: <div>Gaps and Needs</div>,
      },
      {
        path: "objectives-and-outcomes",
        element: <div>Objectives and Outcomes</div>,
      },
      {
        path: "commercial-support",
        element: <div>Commercial Support</div>,
      },
      {
        path: "commendation-criteria",
        element: <div>Commendation Criteria</div>,
      },
      {
        path: "files",
        element: <div>Files</div>,
      },
      {
        path: "comments",
        element: <div>Comments</div>,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export function ApplicationForm() {
  return <RouterProvider router={router} />;
}
