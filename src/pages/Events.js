import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import FilterWindow from '../components/FilterWindow';
import '../styles/CalendarColors.css';
import 'react-calendar/dist/Calendar.css';
import '../styles/Events.css';

const Events = () => {
    const [userData, setUserData] = useState(null);
    const [userEvents, setUserEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [currentPageNum, setCurrentPageNum] = useState(1);
    const eventsPerPage = 8;
    const [filteredEvents, setFilteredEvents] = useState([]); 

    const id = localStorage.getItem("id");
    console.log(id);

    useEffect(() => {
        if (!id) {
            navigate('/login');
            return;
        }

        // Fetch all events
        const fetchAllEvents = async () => {
            try {
                const result = await axios.get("http://localhost:8000/events");
                setEvents(result.data);
                setFilteredEvents(result.data); //sets filtered events to all events initially 
            } catch (err) {
                console.error("Error fetching events:", err);
            }
        };

        fetchAllEvents();

        // Fetch user data by ID
        axios.get(`http://localhost:8000/Users/${id}`)
            .then(response => {
                const fetchedUserData = response.data;
                setUserData(fetchedUserData);
                
                // Extract event IDs from user events
                const eventIds = fetchedUserData.events.map(event => event.eventId);

                // Fetch event details for each eventId
                const fetchUserEvents = async () => {
                    try {
                        const eventPromises = eventIds.map(eventId =>
                            axios.get(`http://localhost:8000/events/${eventId}`)
                        );
                        const eventResponses = await Promise.all(eventPromises);
                        const userEvents = eventResponses.map(response => response.data);
                        setUserEvents(userEvents);
                    } catch (error) {
                        console.error("Error fetching user events:", error);
                    }
                };

                fetchUserEvents();
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
    }, [id, navigate]);

    // Loading state
    if (!userData) {
        return <div>Loading...</div>;
    }

    //Applies filters to the events 
    const handleFilteringEvents= (formData) => {
        const { title, startDate, endDate, category, registered } = formData;
        //filtered array is originally a clone of the events array 
        let filtered = events;  
        if (title) {
            filtered = filtered.filter(event => event.name.toLowerCase().includes(title.toLowerCase()));
        }
        if (startDate) {
            filtered = filtered.filter(event => new Date(event.date) >= new Date(startDate));
        }
        if (endDate) {
            filtered = filtered.filter(event => new Date(event.date) <= new Date(endDate));
        }
        if (category){
            filtered = filtered.filter(event => event.category === category);
        }
        if (registered === 'yes' ) { 
            filtered = filtered.filter(event => userEvents.some(userEvent => userEvent._id === event._id));
        }
        setFilteredEvents(filtered); //updates the filtered events 
        setCurrentPageNum(1); 
}


    // Pagination
    const idOfLastEvent = currentPageNum * eventsPerPage;
    const idOfFirstEvent = idOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(idOfFirstEvent, idOfLastEvent);

    
    const eventTable = currentEvents.map((event, index) => {
        const isRegistered = userEvents.some(userEvent => userEvent._id === event._id);

        const handleRegister = async () => {
            try {
                const response = await axios.post(`http://localhost:8000/Users/${id}/events`, { eventId: event._id });
                if (response.status === 200) {
                    setUserEvents([...userEvents, event]); // Update state with the newly registered event
                }
            } catch (error) {
                console.error("Error registering for event:", error);
            }
        };

        return (
            <tr key={index}>
                <td>{event.name}</td>
                <td>{event.category}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>
                    <button
                        className={`register-button ${isRegistered ? 'registered' : ''}`}
                        onClick={isRegistered ? null : handleRegister}
                        disabled={isRegistered}
                        style={isRegistered ? { backgroundColor: "black", color: "white" } : {}}
                    >
                        {isRegistered ? 'Registered' : 'Register'}
                    </button>
                </td>
            </tr>
        );
    });

    // Map events to dates
    const mapEventsToDates = (events) => {
        const eventsByDate = {};
        events.forEach((event) => {
            const eventDate = new Date(event.date).toLocaleDateString();
            if (!eventsByDate[eventDate]) {
                eventsByDate[eventDate] = [];
            }
            eventsByDate[eventDate].push(event.category);
        });
        return eventsByDate;
    };

    const eventsByDate = mapEventsToDates(userEvents);

    // Tile class name for calendar view
    const tileClassName = ({ date }) => {
        const dateString = date.toLocaleDateString();
        if (eventsByDate[dateString]) {
            const eventTypes = eventsByDate[dateString];
            if (eventTypes.includes("Activities")) return "blue-event";
            if (eventTypes.includes("Job Search")) return "green-event";
            if (eventTypes.includes("Companies")) return "red-event";
        }
        return null;
    };

    // Toggle views
    const clickCalendarView = () => setShowCalendar(true);
    const clickTableView = () => setShowCalendar(false);

    // Pagination functions
    const toPrevPage = () => {
        if (currentPageNum > 1) setCurrentPageNum(currentPageNum - 1);
    };

    const toNextPage = () => {
        if (currentPageNum * eventsPerPage < filteredEvents.length) {
            setCurrentPageNum(currentPageNum + 1);
        }
    };

    //Displays the filter window 
    const filterButtonClicked = () => {
        setIsActive(!isActive);
    }
  

    //Removes all filters, displays all events 
    const clickClearSort = () => {
        setFilteredEvents([...events]); 
        setCurrentPageNum(1); 
    }

    return (
        <div className="events">
            <div className="event-button-container">
                <div className='pagination-buttons'>
                    <button onClick={toPrevPage}>{'<<'}</button>
                    <button style={{ backgroundColor: "black" }}>{currentPageNum}</button>
                    <button onClick={toNextPage}>{'>>'}</button>
                </div>
                <div className="filter-sort">
                    <button onClick={filterButtonClicked}>Filter</button>
                    {isActive && (
                        <FilterWindow
                            handleFilteringEvents={handleFilteringEvents}
                            setIsActive={setIsActive}
                        />
                    )}
                    <button onClick={clickClearSort}>Clear Sort</button>
                </div>

                <div className="view-button">
                    <button onClick={clickCalendarView}>Calendar</button>
                    <button onClick={clickTableView}>List</button>
                </div>
            </div>

            {showCalendar ? (
                <div>
                    <h1 style={{ textAlign: "center" }}>Welcome, {userData.fname} {userData.lname}</h1>
                    <h2 style={{ textAlign: "center" }}>Your Events</h2>
                    <div className='calendar-div'>
                        <Calendar tileClassName={tileClassName} />
                    </div>

                    <h2 style={{ textAlign: "center" }}>Legend:</h2>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <div style={{ display: "flex", marginRight: "20px" }}>
                            <div style={{ width: "20px", height: "20px", backgroundColor: "#0000ff", marginRight: "10px" }}></div>
                            <span>Activities</span>
                        </div>
                        <div style={{ display: "flex", marginRight: "20px" }}>
                            <div style={{ width: "20px", height: "20px", backgroundColor: "#008000", marginRight: "10px" }}></div>
                            <span>Job Search</span>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div style={{ width: "20px", height: "20px", backgroundColor: "#ff0000", marginRight: "10px" }}></div>
                            <span>Companies</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div id="table">
                    <table>
                        <thead>
                            <tr>
                                <th>Events</th>
                                <th>Category</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventTable}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Events;