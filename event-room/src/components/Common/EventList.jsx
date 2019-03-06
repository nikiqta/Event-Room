import React from 'react';
import EventCard from "./EventCard";

const EventList = (props) => {
    const {events} = props;
    return (
            <div style={{margin: 'auto'}} className="row space-top mr-auto container">
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