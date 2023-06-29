import React, { useState, useEffect } from "react";
import EventService from "../../Services/EventService";
import { useNavigate, useParams } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Button,
  Input,
} from "reactstrap";
import ReviewService from "../../Services/ReviewService";
import "./eventStyle.css";
import { end } from "@popperjs/core";
import LocationService from "../../Services/LocationService";
import SportService from "../../Services/SportService";
import PlacementDisplay from "../Placement/PlacementMain";
import Review from "../Review/Review";
import RewviewMain from "../Review/ReviewMain";

function Event() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();
  const [placements, setPlacements] = useState();
  const [reviews, setReviews] = useState();
  const [locations, setLocations] = useState([]);
  const [sports, setSports] = useState([]);

  const [editedName, setEditedName] = useState(event ? event.name : "");
  const [editedStartDate, setEditedStartDate] = useState(startDate);
  const [editedEndDate, setEditedEndDate] = useState(endDate);
  const [editedDescription, setEditedDescription] = useState(
    event ? event.description : ""
  );
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
  const [isMainEditClicked, setIsMainEditClicked] = useState(false);
  const handleMainEditClick = () => {
    setIsMainEditClicked(!isMainEditClicked);
  };
  const navigate = useNavigate();
  const fetchLocations = async () => {
    try {
      const response = await LocationService.getLocations();
      setLocations(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching locations:", error);
    }
  };

  const fetchSports = async () => {
    try {
      const response = await SportService.getSports();
      setSports(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error fetching sports:", error);
    }
  };
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
        fetchLocations();
        fetchSports();
        setEvent(eventData);
        setStartDate(startDate.toLocaleDateString());
        setEndDate(endDate.toLocaleDateString());
        setStartDateTime(startDate.toLocaleTimeString());
        setEndDateTime(endDate.toLocaleTimeString());
        setPlacements(sortedPlacements);
        console.log(eventData.id);
        const reviewsResponse = await ReviewService.getReviews({
          // 1,
          // 20,
          // "DESC",
          // "Rating",
          eventId:eventData.id}
        );

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
    console.log(updatedEvent);
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
    description: editedDescription,
  };

  const handleLocationSelect = (e) => {
    const locationId = e.target.value;
    setEvent((prevEvent) => ({
      ...prevEvent,
      locationId: locationId !== "" ? locationId : null,
    }));
  };

  const handleSportSelect = (e) => {
    const sportId = e.target.value;
    setEvent((prevEvent) => ({
      ...prevEvent,
      sportId: sportId !== "" ? sportId : null,
    }));
  };

  const handleDelete = async () => {
    try {
      await EventService.removeEvent(eventId);
      console.log("Event deleted successfully");
      navigate(`/Home`);
    } catch (error) {
      console.log("Error deleting event:", error);
    }
  };
  const handleEditReview = (eventId) => {
    navigate(`/Review/${eventId}`);
  };

  return (
    <Container className="mt-5">
      <Button color="primary" onClick={handleMainEditClick}>
        Main Edit
      </Button>
      <Row>
        <Col className="bg-light border text-center align-items-center pt-4 p-4">
          {isMainEditClicked ? (
            <>
              {editableFields.name ? (
                <>
                  <input
                    type="text"
                    value={editedName}
                    placeholder={event.name}
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
            </>
          ) : (
            <>
              <h2>{event.name}</h2>
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="bg-light border text-center  align-items-center pt-4 p-4">
          <h4>Date</h4>
          {isMainEditClicked ? (
            <>
              {editableFields.startDate ? (
                <>
                  <input
                    type="datetime-local"
                    value={editedStartDate}
                    onChange={(e) => setEditedStartDate(e.target.value)}
                  />
                  <Button
                    color="success"
                    onClick={() => handleSave("startDate")}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p>Start: {startDate}</p>
                  <Button
                    color="primary"
                    onClick={() => handleEdit("startDate")}
                  >
                    Edit
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <p>Start: {startDate}</p>
            </>
          )}
          {isMainEditClicked ? (
            <>
              {editableFields.endDate ? (
                <>
                  <input
                    type="datetime-local"
                    value={editedEndDate}
                    onChange={(e) => setEditedEndDate(e.target.value)}
                  />
                  <Button color="success" onClick={() => handleSave("endDate")}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p>End: {endDate}</p>
                  <Button color="primary" onClick={() => handleEdit("endDate")}>
                    Edit
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <p>End: {endDate}</p>
            </>
          )}
        </Col>
        <Col className="bg-light border text-center align-items-center pt-4 p-4">
          <h4>Venue</h4>
          {isMainEditClicked ? (
            <>
              {editableFields.venueName ? (
                <>
                  <Input
                    type="select"
                    id="location"
                    value={event.locationId || ""}
                    onChange={handleLocationSelect}
                  >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.venue}
                      </option>
                    ))}
                  </Input>
                  <Button
                    color="success"
                    onClick={() => handleSave("venueName")}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p>{event.venueName}</p>
                  <Button
                    color="primary"
                    onClick={() => handleEdit("venueName")}
                  >
                    Edit
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <p>{event.venueName}</p>
              <p>{event.cityName}</p>
              <p>{event.countyName}</p>
            </>
          )}
        </Col>
        <Col className="bg-light border text-center align-items-center pt-4 p-4">
          <h4>Sport</h4>
          {isMainEditClicked ? (
            <>
              {editableFields.sportName ? (
                <>
                  <Input
                    type="select"
                    id="sport"
                    value={event.sportId || ""}
                    onChange={handleSportSelect}
                  >
                    <option value="">Select Sport</option>
                    {sports.map((sport) => (
                      <option key={sport.id} value={sport.id}>
                        {sport.name}
                      </option>
                    ))}
                  </Input>
                  <Button
                    color="success"
                    onClick={() => handleSave("sportName")}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p>{event.sportName}</p>
                  <Button
                    color="primary"
                    onClick={() => handleEdit("sportName")}
                  >
                    Edit
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <p>{event.sportName}</p>
              <p>{event.sportType}</p>
            </>
          )}
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
          {/* <p>{event.description}</p> */}
          {isMainEditClicked ? (
            <>
              {editableFields.description ? (
                <>
                  <input
                    type="text"
                    value={editedDescription}
                    placeholder={event.description}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                  <Button
                    color="success"
                    onClick={() => handleSave("description")}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <p>{event.description}</p>
                  <Button
                    color="primary"
                    onClick={() => handleEdit("description")}
                  >
                    Edit
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <p>{event.description}</p>
            </>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        {isMainEditClicked && (
          <Col className="text-center">
            <Button color="danger" onClick={handleDelete}>
              Delete this event
            </Button>
          </Col>
        )}
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
      <Review eventId={eventId} isMainEditClicked={isMainEditClicked.valueOf()}/>
      {/* <RewviewMain eventId={eventId}/> */}
      {/* <ListGroup className="text-center">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <ListGroupItem key={review.id} className="square border border-2">
              {`User: ${review.userName} Rating: ${review.rating}`}
              <p> {review.content}</p>
              {/* {isMainEditClicked &&(
                <button onClick={()=>handleEditReview(review.eventId)}>Edit</button>
              )} }
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem>No reviews available</ListGroupItem>
        )}
      </ListGroup> */}
      <PlacementDisplay currentEventId={eventId} isMainEditClicked={isMainEditClicked.valueOf()}/>
      
    </Container>
  );
}

export default Event;
