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
import PlacementDisplay from './Components/Placement/PlacementMain';
import { useState } from 'react';
import RewviewMain from './Components/Review/ReviewMain';

function App() {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.token ? true : false
  );

  const router = createBrowserRouter([
    {
      path: '',
      element: <RootLayout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />,
      children: [
        { path: '', element: <Home /> },
        { path: '/', element: <Home /> },
        { path: '/login', element: <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> },
        { path: '/register', element: <UserRegister /> },
        { path: 'City', element: <CityDisplay /> },
        { path: 'County', element: <CountyDisplay /> },
        { path: 'Location', element: <LocationDisplay /> },
        { path: 'update-city/:id', element: <CityPut /> },
        { path: 'update-county/:id', element: <UpdateCounty /> },
        { path: 'update-location/:id', element: <UpdateLocation /> },
        { path: 'Placement', element: < PlacementDisplay / > },
        { path: 'Review', element: <RewviewMain /> },
      ],
    },
  ]);

  window.onbeforeunload = function () {
    localStorage.removeItem('token');
    return '';
  };

  return <RouterProvider router={router} />;
}

export default App;