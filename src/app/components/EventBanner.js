import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';



const EventBanner = () => {
    const [upcomingEvent, setUpcomingEvent] = useState(null);

    useEffect(() => {
        // Function to fetch data from Firestore
        const fetchData = async () => {
            try {
                const firestore = firebase.firestore();
                const eventsCollection = firestore.collection('events');

                // Query the Firestore for the event that starts within the next 24 hours
                const now = new Date();
                const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);

                const querySnapshot = await eventsCollection
                    .where('start', '>', now)
                    .where('start', '<', nextDay)
                    .limit(1)
                    .get();

                // Get the upcoming event data (if available)
                if (!querySnapshot.empty) {
                    const upcomingEventData = querySnapshot.docs[0].data();
                    setUpcomingEvent(upcomingEventData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to display the banner if there is an upcoming event
    const renderEventBanner = () => {
        if (upcomingEvent) {
            return (
                <div>
                    <h2>{upcomingEvent.title}</h2>
                    <p>The event is starting within the next 24 hours!</p>
                </div>
            );
        } else {
            return null;
        }
    };

    return <div>{renderEventBanner()}</div>;
};

export default EventBanner;
