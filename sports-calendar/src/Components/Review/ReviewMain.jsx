import Review from "./Review";
import ReviewPost from "./ReviewPost";
import { useParams } from "react-router";

function RewviewMain({eventId}){
  //const { eventId } = useParams();
    return (
        <div>
       <Review eventId={eventId}/>
       <ReviewPost />
        </div>
      );
    }

export default RewviewMain;