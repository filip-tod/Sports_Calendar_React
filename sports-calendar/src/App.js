import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import CityDisplay from './Components/City/CityMain';
import RootLayout from './Components/Root/Root';
import CountyDisplay from './Components/County/CountyMain';
import LocationDisplay from './Components/Location/LocationMain';
import 'bootstrap/dist/css/bootstrap.min.css';
import CityPut from './Components/City/CityPut';
import UpdateCounty from './Components/County/CountyUpdate';
import UpdateLocation from './Components/Location/UpdateLocation';
import PlacementPagedList from './Components/Placement/PlacementPages';



const router = createBrowserRouter([{
    path: '',
    element: < RootLayout / > ,
    children: [
        { path: '', element: < HomePage / > },
        { path: 'City', element: < CityDisplay / > },
        { path: 'County', element: < CountyDisplay / > },
        { path: 'Location', element: < LocationDisplay / > },
        { path: 'update-city/:id', element: < CityPut / > },
        { path: 'update-county/:id', element: < UpdateCounty / > },
        { path: 'update-location/:id', element: < UpdateLocation / > },
        { path: 'Placement', element: < PlacementPagedList / > }
    ],
}, ]);



function App() {
    return <RouterProvider router = { router }
    />;
}

export default App;