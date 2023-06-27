import React, { useState, useEffect } from "react";
import EventService from "../../Services/EventService";
import { useParams } from "react-router-dom";

function Event() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await EventService.getEvent(eventId);
        const eventData = response.data;
        setEvent(eventData);
      } catch (error) {
        console.log("Error fetching event data:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <p>Loading event...</p>;
  }

  return (
    <div>
      <h2>{event.name}</h2>
      <p>{event.description}</p>
      {/* Display other event details */}
    </div>
  );
}

export default Event;
