import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import LocationService from "../../Services/LocationService";
import SportService from "../../Services/SportService";
import "./eventStyle.css";
import EventService from "../../Services/EventService";
const EventPost = () => {
  const [event, setEvent] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    locationId: null,
    sportId: null,
  });
  

  const [locations, setLocations] = useState([]);
  const [sports, setSports] = useState([]);

  useEffect(() => {
    fetchLocations();
    fetchSports();
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    EventService.createEvent(event)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="post-form-container">
      <h2>Create Event</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={event.name}
            onChange={(e) =>
              setEvent((prevEvent) => ({ ...prevEvent, name: e.target.value }))
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            id="description"
            value={event.description}
            onChange={(e) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                description: e.target.value,
              }))
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="startDate">Start Date</Label>
          <Input
            type="datetime-local"
            id="startDate"
            value={event.startDate}
            onChange={(e) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                startDate: e.target.value,
              }))
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="endDate">End Date</Label>
          <Input
            type="datetime-local"
            id="endDate"
            value={event.endDate}
            onChange={(e) =>
              setEvent((prevEvent) => ({
                ...prevEvent,
                endDate: e.target.value,
              }))
            }
          />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
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
        </FormGroup>
        <FormGroup>
          <Label for="sport">Sport</Label>
          <Input
            type="select"
            id="sport"
            value={event.sportId || ""}
            onChange={handleSportSelect}
          >
            <option value="">Select Sport</option>
            {sports &&
              sports.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
          </Input>
        </FormGroup>
        <Button type="submit">Create Event</Button>
      </Form>
    </div>
  );
};

export default EventPost;
