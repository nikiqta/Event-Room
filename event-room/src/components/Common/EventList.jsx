import React from 'react';
import EventCard from "./EventCard";

const EventList = (props) => {
    const {events, handleDetails} = props;
    return (
            <div className="row space-top mr-auto container">
                {events.length && events.map(event => {
                    return (
                        <EventCard
                            key={event.id}
                            data={event}
                        />
                    );
                })}
            </div>
    );
};

export default EventList;