import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "@/components/layout";
import PrescricaoPage from "@/pages/prescricao";
import RemedioPage from "@/pages/remedio";
import CalendarPage from "@/pages/calendar";

const Routes = () => {
  const routesForPublic = [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          element: <Layout />,
          children: [
            {
              path: "/calendar",
              element: <CalendarPage />,
            },
            {
              path: "/prescricoes",
              element: <PrescricaoPage />,
            },
            {
              path: "/remedios",
              element: <RemedioPage />,
            },
            {
              path: "/perfil",
              element: <div>Perfil</div>,
            },
          ],
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
