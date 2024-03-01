import { SignInPage } from "./components/SignInComponent/SignInPage";
import { Home } from "./components/HomeComponent/Home";
import { SignUpPage } from "./components/SignUpComponent/SignUpPage";

const AppRoutes = [
  {
    index: true,
    element: <Home />,
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
