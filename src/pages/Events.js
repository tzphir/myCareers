import React from 'react';
import axios from 'axios';
import { useState,useEffect } from "react";
import '../styles/Events.css'; 


function Events (){

    const [events, setEvents] = useState([]);  //list of events 
    const [showCalendar, setShowCalendar] = useState(false); //calendar not visible by default 
    const[isRegistered, setIsRegistered] = useState(); 
   // const[buttonText,setButtonText] = useState(); 
    const [currentPageNum, setCurrentPageNum] = useState(1); //pages start at 1 
    const eventsPerPage = 8; //max 8 events per page 

    //Fetches all the events
    useEffect(()=> {  
        const fetchEvents = async () => {
            try {
                const result = await axios.get('');
                setEvents(result.data);  // Set fetched events to state
            } catch (err) {
                console.error('Error getting events', err);
            }
        };
        fetchEvents();
    }, []); 

    //Calculate how many events to display for the current page (8) 
    const idOfLastEvent = currentPageNum * eventsPerPage; 
    const idOfFirstEvent = idOfLastEvent - eventsPerPage; 
    const currentEvents = events.slice(idOfFirstEvent, idOfLastEvent); 
    
    //Displays the fetched events into table format, 8 per page 
    const eventTable = currentEvents.map((event,id) => {
        return(
            <tr key={id}>
                <td >{event.name}</td>
                <td>{event.category}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>
                    <button className="register-button" onClick={handleRegister}>
                    </button> 
                </td>
            </tr>
        ) 
    } ); 

    //Switches to Calendar display  
    const clickCalendarView = (event) => {
        setShowCalendar(true); 
    }

    //Switches back to Table display  
    const clickTableView  = () => {
        setShowCalendar(false);
    };

    
    //Updates the registration status for the event 
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.put('', ''); // change status to registered 
            setIsRegistered(true); // Changes button to 'Registered' 
            alert('You have succesfully registered for this event!');
        } catch (error) {
            console.error('Error registering for the event:', error);
        }
    };

//Button text if user is Registered or not 
    /*
    const registrationButton = () => {
        //if the user not registered 
        if ( ){
            setButtonText('Register'); 
        }
        else{
            setButtonText('Registered'); 
        }
    }
       */ 

    //Changes page num 
    const toPrevPage = () => {
        if ( currentPageNum > 1) //page num cannot go below 0 
        {setCurrentPageNum(currentPageNum - 1); 
        }     
    }

   const toNextPage = () => {
    setCurrentPageNum(currentPageNum + 1); 

   }

    return(
        <div className="events">
            <div className="button-container">
                <div className='pagination-buttons'> 
                    <button 
                    onClick={toPrevPage}
                    >{'<<'}</button>
                    <button style={{backgroundColor:"black"}}> {currentPageNum} </button>
                    <button 
                      onClick={toNextPage}>{'>>'}</button>
                </div>
                <div className="filter-sort">
                    <button>Filter</button> 
                    <button>Clear Sort</button>
                </div>
                <div className="view-button">
                    <button onClick={clickCalendarView}>Calendar</button>
                    <button onClick={clickTableView}>List</button>
                </div>
            </div>
            
           {showCalendar ?  (<div className="calendar-view">
            <p> Placeholder for Calendar</p>
            </div>
            ): (<div id="table"> 
                <table >
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
                </div>)}
        </div>
    );  
}; 


export default Events;
