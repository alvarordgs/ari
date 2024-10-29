import LoginPage from "@/pages/auth/login";
import { ProtectedRoute } from "./ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "@/pages/auth/register";

const Routes = () => {
  const routesForPublic = [
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/teste',
          element: <div></div>,
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
