import { SignInPage } from "./components/SignInComponent/SignInPage";
import { Home } from "./components/HomeComponent/Home";
import { SignUpPage } from "./components/SignUpComponent/SignUpPage";
import { RentFindingPage } from "./components/RentFinderComponent/RentFindingPage";
import { FlatInfoPage } from "./components/flat-info-page";
import { MapFindingPage } from "./components/MapFinderComponent/MapFindingPage";
import { AccountPage } from "./components/AccountComponent/AccountPage";

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
  {
    path: "/flats",
    element: <RentFindingPage />,
  },
  {
    path: "/flats/:flatId",
    element: <FlatInfoPage />,
  },
  {
    path: "/flats/map",
    element: <MapFindingPage />,
  },
  {
    path: "/account/*",
    element: <AccountPage />,
  },
];

export default AppRoutes;
