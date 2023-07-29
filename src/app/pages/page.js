"use client";
const events = [
    {
        id: 1,
        title: 'Event 11',
        type: 'Exports',
        start: '2023-07-30',
        completed: false,
        end: '2023-07-27',
        reply: [
            {
                id: 1,
                title: 'REvent 11',
                type: 'Exports',
                start: '2023-07-20',
                completed: false,
                end: '2023-07-27'
            },
            {
                id: 2,
                title: 'REvent 12',
                type: 'Imports',
                start: '2023-07-20',
                completed: false,
                end: '2023-07-27'
            }
        ]
    },
    {
        id: 2,
        title: 'Event 12',
        type: 'Imports',
        start: '2023-07-20',
        completed: false,
        end: '2023-07-27',
        reply: [
            {
                id: 1,
                title: 'REvent 11',
                type: 'Exports',
                start: '2023-07-20',
                completed: false,
                end: '2023-07-27'
            },
            {
                id: 2,
                title: 'REvent 12',
                type: 'Imports',
                start: '2023-07-20',
                completed: false,
                end: '2023-07-27'
            }
        ]
    }
];

function getUpcomingEvents(events) {
    const now = new Date();
    const next24Hours = new Date(now);
    next24Hours.setHours(next24Hours.getHours() + 24);

    return events.filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= now && eventDate < next24Hours;
    });
}

function UpcomingEvents() {
    const upcomingEvents = getUpcomingEvents(events);

    return (
        <div>
            <h1>Upcoming Events  {upcomingEvents.length}</h1>
            {upcomingEvents.map(event => (
                <div key={event.id}>
                    <h2>{event.title}</h2>
                    <p>Type: {event.type}</p>
                    <p>Start: {event.start}</p>
                    <p>End: {event.end}</p>
                    <p>Completed: {event.completed ? 'Yes' : 'No'}</p>
                    {event.reply.map(reply => (
                        <div key={reply.id}>
                            <h3>Reply:</h3>
                            <p>Title: {reply.title}</p>
                            <p>Type: {reply.type}</p>
                            <p>Start: {reply.start}</p>
                            <p>End: {reply.end}</p>
                            <p>Completed: {reply.completed ? 'Yes' : 'No'}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default UpcomingEvents;

