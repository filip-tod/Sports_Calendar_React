import LocationDisplay from "./LocationDisplay";
import CreateLocation from "./LocationPost";



function LocationMain() {
  return (
      <div>
        <h1>Location CRUD for ADMIN</h1>
         <LocationDisplay />
         <CreateLocation />
      </div>
);
}

export default LocationMain;
