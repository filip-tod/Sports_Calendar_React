import LocationById from "./LocationById";
import LocationDisplay from "./LocationDisplay";
import UpdateLocation from "./UpdateLocation";

function LocationMain() {
  return (
      <div>
        <h1>Location CRUD for ADMIN</h1>
         <LocationById />
         <LocationDisplay />
      </div>
);
}

export default LocationMain;
