import { Outlet } from "react-router-dom";
import NavBar from "../MainNavigation/NavBar";
import PlacementDisplay from "../Placement/PlacementMain";

function RootLayout(props) {
  return (
    <>
      <NavBar
        role={props.role}
        setLoggedIn={props.setLoggedIn}
        loggedIn={props.loggedIn}
      />
      <Outlet />
    </>
  );
}

export default RootLayout;
