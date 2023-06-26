import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import CityDisplay from './Components/City/CityMain';
import RootLayout from './Components/Root/Root';
import CountyDisplay from './Components/County/CountyMain';
import LocationDisplay from './Components/Location/LocationMain';
import 'bootstrap/dist/css/bootstrap.min.css';



const router= createBrowserRouter([
  {
    path: '',
    element: <RootLayout />,
    children:[
      {path: '', element: <HomePage />},
      {path: '/City', element: <CityDisplay />},
      {path: '/County', element: <CountyDisplay />},
      {path: '/Location', element: <LocationDisplay />}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
