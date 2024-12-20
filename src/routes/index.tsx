import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "@/components/layout";
import PrescricaoPage from "@/pages/prescricao";
import RemedioPage from "@/pages/remedio";
import CalendarioPage from "@/pages/calendario";
import PerfilPage from "@/pages/perfil";

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
              path: "/calendario",
              element: <CalendarioPage />,
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
              element: <PerfilPage />,
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
