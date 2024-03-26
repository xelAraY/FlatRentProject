import { SignInPage } from "./components/SignInComponent/SignInPage";
import { Home } from "./components/HomeComponent/Home";
import { SignUpPage } from "./components/SignUpComponent/SignUpPage";
import { RentFindingPage } from "./components/RentFinderComponent/RentFindingPage";
import { MapFindingPage } from "./components/MapFinderComponent/MapFindingPage";

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
    path: "/rental-search/:flats",
    element: <RentFindingPage />,
  },
  {
    path: "/rental-search/map",
    element: <MapFindingPage />,
  },
];

export default AppRoutes;
