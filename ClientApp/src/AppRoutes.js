import { SignInPage } from "./components/AuthenticationComponent/SignInPage";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/HomeComponent/Home";
import { SignUpPage } from "./components/RegistrationComponent/SignUpPage";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: "/fetch-data",
    element: <FetchData />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
];

export default AppRoutes;
