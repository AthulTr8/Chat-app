import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/main/index"
// layouts
import DashboardLayout from "../layouts/dashboard";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";
// import ResetPassword from "../pages/auth/ResetPassword";
// import Settings from "../pages/dashboard/Settings";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout />,
      children: [
        { element: <LoginPage />, path: "login" },
        { element: <RegisterPage />, path: "Register" },
        { element: <ResetPasswordPage />, path: "Reset-password" },
        { element: <NewPasswordPage />, path: "new-password" }
      ]
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "Settings", element: <Settings /> },
        { path: "Group", element: <GroupPage /> },
        { path: "call", element: <Call /> },
        { path: "profile", element: <ProfilePage /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);
const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);
const Call = Loadable(
  lazy(() => import("../pages/dashboard/Call")),
);
const LoginPage = Loadable(
  lazy(() => import("../pages/auth/Login")),
);
const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);
const ProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
);
const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/Register")),
);
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword")),
);
const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
