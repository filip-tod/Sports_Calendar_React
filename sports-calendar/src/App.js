import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/HomePage/Home';
import CityDisplay from './Components/City/CityMain';
import RootLayout from './Components/Root/Root';
import CountyDisplay from './Components/County/CountyMain';
import LocationDisplay from './Components/Location/LocationMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import CityPut from './Components/City/CityPut';
import UpdateCounty from './Components/County/CountyUpdate';
import UpdateLocation from './Components/Location/UpdateLocation';
import Login from './Components/Auth/Login';
import UserRegister from './Components/Register/UserRegister';
import { useState, useEffect } from 'react';
import RewviewMain from './Components/Review/ReviewMain';
import Calendar from "./Components/Event/Calendar";
import Event from "./Components/Event/Event";
import EventPost from "./Components/Event/EventPost";
import SponsorDisplay from './Components/Sponsor/SponsorMain';
import "react-calendar/dist/Calendar.css";
import "./Components/HomePage/calendarStyle.css";
import Review from './Components/Review/Review';
import PlacementDisplay from './Components/Placement/PlacementMain';
import Users from './Components/Users/Users';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.token ? true : false
  );

  const [roles, setRoles] = useState(
    localStorage.roles ? JSON.parse(localStorage.roles) : []
  );

  useEffect(() => {
    setRoles(localStorage.roles ? JSON.parse(localStorage.roles) : []);
  }, [loggedIn]);

  const tokenData = JSON.parse(localStorage.getItem('token'));
  const accessToken = tokenData ? tokenData.access_token : null;
  const role = tokenData ? tokenData.Role : null;
  const userId = tokenData ? tokenData.Id : null;
  const expires = tokenData ? tokenData.expires : null;

  const userInfo = {
    accessToken,
    role,
    userId,
    expires
  };

  const router = createBrowserRouter([
    {
      path: '',
      element: <RootLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />,
      children: [
        { path: '', element: <Home userInfo={userInfo} /> },
        { path: '/login', element: <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> },
        { path: '/register', element: <UserRegister /> },
        { path: '/Review', element: <RewviewMain userInfo={userInfo} /> },
        { path: 'City', element: <CityDisplay /> },
        { path: 'County', element: <CountyDisplay /> },
        { path: 'Location', element: <LocationDisplay /> },
        { path: '/Users', element: <Users /> },
        { path: 'update-city/:id', element: <CityPut /> },
        { path: 'update-county/:id', element: <UpdateCounty /> },
        { path: 'update-location/:id', element: <UpdateLocation /> },
        { path: 'Placement', element: <PlacementDisplay /> },
        { path: 'Review', element: <RewviewMain /> },
        // { path: "/Review/:eventId", element: <Review /> },
        { path: "/Home", element: <Home userInfo={userInfo} /> },
        { path: "/Event/:eventId", element: <Event userInfo={userInfo} /> },
        { path: "/EventPost", element: <EventPost userInfo={userInfo} /> },
        { path: "Sponsor", element: <SponsorDisplay /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
