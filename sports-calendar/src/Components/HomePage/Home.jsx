import React, { useState, useEffect } from "react";
import EventService from "../../Services/EventService";
import CalendarReact from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarStyle.css";
import { differenceInCalendarDays, isSameDay } from "date-fns";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

function useFetchEventData() {
  const [datesToAddClassTo, setDatesToAddClassTo] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EventService.getEvents();
        const eventsData = response.data.data;
        const eventStartDates = eventsData.map(
          (event) => new Date(event.startDate)
        );
        setDatesToAddClassTo(eventStartDates);
        setEvents(eventsData);
      } catch (error) {
        console.log("Error fetching event data: ", error);
      }
    };

    fetchData();
  }, []);

  return { datesToAddClassTo, events };
}

function Home() {
  const { datesToAddClassTo, events } = useFetchEventData();
  const [value, setValue] = useState(new Date());
  const [clickedDateEvents, setClickedDateEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  function tileClassName({ date, view }) {
    if (view === "month") {
      if (datesToAddClassTo.find((dDate) => isSameDay(dDate, date))) {
        return "has-event";
      }
    }
  }

  function onChange(nextValue) {
    setValue(nextValue);
  }

  const onClickDayHandler = (value) => {
    console.log("Clicked day:", value);
    const clickedDate = new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate()
    );
    const clickedDateEvents = events.filter((event) => {
      const eventStartDate = new Date(event.startDate);
      return isSameDay(eventStartDate, clickedDate);
    });
    setClickedDateEvents(clickedDateEvents);
    toggleModal();
  };

  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    setSelectedEventId(eventId);
    navigate(`/Event/:${eventId}`);
  };
  const handleCreateEventClick = () =>{
    navigate(`/EventPost`);
  }

  return (
    <div className="calendar-container">
      <CalendarReact
        onChange={onChange}
        value={value}
        tileClassName={tileClassName}
        onClickDay={onClickDayHandler}
      />

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Events</ModalHeader>
        <ModalBody>
          {clickedDateEvents.length > 0 ? (
            <ul>
              {clickedDateEvents.map((event) => (
                <li key={event.id}>
                  <Link
                    to={`/Event/${event.id}`}
                    onClick={() => handleEventClick(event.id)}
                  >
                    {event.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events found for this date.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Button onClick={()=>handleCreateEventClick()}>Create event</Button>
    </div>
  );
}

export default Home;
