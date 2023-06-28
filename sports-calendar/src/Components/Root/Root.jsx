import { Outlet } from "react-router-dom";
import NavBar from "../MainNavigation/NavBar";
import PlacementDisplay from "../Placement/PlacementMain";


function RootLayout(){
  return <>
     <NavBar/>
     <Outlet />
        </>;
};

export default RootLayout;