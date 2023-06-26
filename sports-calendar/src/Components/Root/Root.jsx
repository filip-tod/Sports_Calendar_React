import { Outlet } from "react-router-dom";
import NavBar from "../MainNavigation/NavBar";


function RootLayout(){
  return <>
  <NavBar/>
     <Outlet />
        </>;
};

export default RootLayout;