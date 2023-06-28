import React, { useState, useEffect } from "react";
import EventService from "../../Services/EventService";
import { useParams } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import ReviewService from "../../Services/ReviewService";

function Event() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();
  const [placements, setPlacements] = useState();
  const [reviews, setReviews] = useState();

  const [editedName, setEditedName] = useState(event ? event.name : "");
  const [editedStartDate, setEditedStartDate] = useState(startDate);
  const [editedEndDate, setEditedEndDate] = useState(endDate);
  const [editedVenueName, setEditedVenueName] = useState(
    event ? event.venueName : ""
  );
  const [editedSportName, setEditedSportName] = useState(
    event ? event.sportName : ""
  );

  const [editableFields, setEditableFields] = useState({
    name: false,
    description: false,
    startDate: false,
    endDate: false,
    locationId: false,
    sportId: false,
    venueName: false,
    sportName: false,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await EventService.getEvent(eventId);
        const eventData = response.data;

        const startDate = new Date(eventData.startDate);
        const endDate = new Date(eventData.endDate);
        const sortedPlacements = eventData.placements.sort(
          (a, b) => a.finishOrder - b.finishOrder
        );
        setEvent(eventData);
        setStartDate(startDate.toLocaleDateString());
        setEndDate(endDate.toLocaleDateString());
        setStartDateTime(startDate.toLocaleTimeString());
        setEndDateTime(endDate.toLocaleTimeString());
        setPlacements(sortedPlacements);

        const reviewsResponse = await ReviewService.getReviews(eventData.id);
        setReviews(reviewsResponse.data.data);
        console.log(reviewsResponse.data.data);
        //console.log(reviews.data);
      } catch (error) {
        console.log("Error fetching event data:", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (!event) {
    return <p>Loading event...</p>;
  }

  // const [editedName, setEditedName] = useState(event.name);
  // const [editedStartDate, setEditedStartDate] = useState(startDate);
  // const [editedEndDate, setEditedEndDate] = useState(endDate);
  // const [editedVenueName, setEditedVenueName] = useState(event.venueName);
  // const [editedSportName, setEditedSportName] = useState(event.sportName);
  

  const handleEdit = (fieldName) => {
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      [fieldName]: true,
    }));
  };

  const handleSave = async (fieldName) => {
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      [fieldName]: false,
    }));
    try {
      await EventService.updateEvent(eventId, updatedEvent);
    console.log("Event updated successfully");

    // Fetch the updated event data
    const response = await EventService.getEvent(eventId);
    const eventData = response.data;

    const startDate = new Date(eventData.startDate);
    const endDate = new Date(eventData.endDate);
    const sortedPlacements = eventData.placements.sort(
      (a, b) => a.finishOrder - b.finishOrder
    );
    
    setEvent(eventData);
    setStartDate(startDate.toLocaleDateString());
    setEndDate(endDate.toLocaleDateString());
    setStartDateTime(startDate.toLocaleTimeString());
    setEndDateTime(endDate.toLocaleTimeString());
    setPlacements(sortedPlacements);

    // 

    console.log("Event data updated:", eventData);
    } catch (error) {
      console.log("Error updating event:", error);
    }
  };

  const updatedEvent = {
    ...event,
    name: editedName,
    venueName: editedVenueName,
    sportName: editedSportName,
    startDate: editedStartDate,
    endDate: editedEndDate,
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col className="bg-light border text-center align-items-center pt-4 p-4">
          {/* <h4>{event.name}</h4> */}
          {editableFields.name ? (
            <>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <Button color="success" onClick={() => handleSave("name")}>
                Save
              </Button>
            </>
          ) : (
            <>
              <h2>{event.name}</h2>
              <Button color="primary" onClick={() => handleEdit("name")}>
                Edit
              </Button>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="bg-light border text-center  align-items-center pt-4 p-4">
          <h4>Date</h4>
          <p>Start: {startDate}</p>
          <p>End: {endDate}</p>
        </Col>
        <Col className="bg-light border text-center align-items-center pt-4 p-4">
          <h4>Venue</h4>
          <p>{event.venueName}</p>
          <p>
            {event.cityName}, {event.countyName}
          </p>
        </Col>
        <Col className="bg-light border text-center align-items-center pt-4 p-4">
          <h4>Sport</h4>
          <p>{event.sportName}</p>
          {/* <p>{event.sportType}</p> */}
        </Col>
        <Col className="bg-light border text-center align-items-center pt-4 p-4">
          <h4>Attendance</h4>
          <p>{event.attendance}</p>
        </Col>
        <Col className="bg-light border text-center align-items-center pt-4 p-4">
          <h4>Rating</h4>
          <p>{event.rating}</p>
        </Col>
      </Row>
      <Row>
        <Col className="bg-light border text-center align-items-center pt-4 p-4">
          <p>{event.description}</p>
        </Col>
      </Row>
      <h4 className="mt-4">Sponsors:</h4>
      <ListGroup>
        {event.sponsors.map((sponsor) => (
          <ListGroupItem
            key={sponsor.id}
            action
            href={sponsor.website}
            tag="a"
            target="_blank"
          >
            {sponsor.name}
          </ListGroupItem>
        ))}
      </ListGroup>

      <h4 className="mt-4">Placements:</h4>
      <ListGroup>
        {placements.map((placement) => (
          <ListGroupItem key={placement.id}>
            {`${placement.finishOrder}. ${placement.name}`}
          </ListGroupItem>
        ))}
      </ListGroup>
      <h4 className="mt-4">Reviews:</h4>
      <ListGroup className="text-center">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <ListGroupItem key={review.id} className="square border border-2">
              {`User: ${review.userName} Rating: ${review.rating}`}
              <p> {review.content}</p>
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem>No reviews available</ListGroupItem>
        )}
      </ListGroup>
    </Container>
  );
}

export default Event;
