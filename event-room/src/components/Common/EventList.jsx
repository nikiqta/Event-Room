import React from 'react';
import EventCard from "./EventCard";

const EventList = (props) => {
    const {events, handleDetails, isAdmin, loggedIn, isForApproval, removeEvent, approveEvent } = props;
    return (
            <div className="row space-top mr-auto container">
                {events.length && events.map(event => {
                    return (
                        <EventCard
                            isForApproval={isForApproval}
                            key={event.id}
                            data={event}
                            isAdmin={isAdmin}
                            loggedIn={loggedIn}
                            removeEvent={removeEvent}
                            approveEvent={approveEvent}
                        />
                    );
                })}
            </div>
    );
};

export default EventList;