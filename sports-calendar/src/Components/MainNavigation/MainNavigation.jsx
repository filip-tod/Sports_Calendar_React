import { Link } from "react-router-dom";

function ManinNavigation() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to ="">Home</Link>
          </li>
          <li>
            <Link to ="/City">Go to City</Link>
          </li>
          <li>
            <Link to ="/County">Go To County</Link>
          </li>
          <li>
            <Link to ="/Location">Go To Location</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default ManinNavigation;
