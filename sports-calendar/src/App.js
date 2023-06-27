import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import CityDisplay from "./Components/City/CityMain";
import RootLayout from "./Components/Root/Root";
import CountyDisplay from "./Components/County/CountyMain";
import LocationDisplay from "./Components/Location/LocationMain";
import "bootstrap/dist/css/bootstrap.min.css";
import CityPut from "./Components/City/CityPut";
import UpdateCounty from "./Components/County/CountyUpdate";
import UpdateLocation from "./Components/Location/UpdateLocation";

import Calendar from "./Components/Event/Calendar";
import Event from "./Components/Event/Event";
import Home from "./Components/HomePage/Home";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "County", element: <CountyDisplay /> },
      { path: "Location", element: <LocationDisplay /> },
      { path: 'City', element: < CityDisplay /> },
      { path: "update-city/:id", element: <CityPut /> },
      { path: "update-county/:id", element: <UpdateCounty /> },
      { path: "update-location/:id", element: <UpdateLocation /> },
      { path: "/Home", element: <Home /> },
      { path: "/Event/:eventId", element: <Event /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
