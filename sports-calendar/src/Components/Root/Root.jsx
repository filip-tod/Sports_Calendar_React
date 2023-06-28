import { Outlet } from "react-router-dom";
import NavBar from "../MainNavigation/NavBar";

function RootLayout(props){
  
  return <>
     <NavBar setLoggedIn={ props.setLoggedIn } loggedIn={ props.loggedIn }/>
     <Outlet />
        </>;
};

export default RootLayout;