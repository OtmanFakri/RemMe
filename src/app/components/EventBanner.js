import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import {db} from "@/app/Conf/conf";


const EventBanner = () => {
    const [upcomingEvent, setUpcomingEvent] = useState(null);

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        // Function to fetch data from Firestore
        const fetchData = async () => {
            try {
                const now = new Date();
                const next24Hours = new Date(now);
                next24Hours.setHours(next24Hours.getHours() + 24);

                // Query the Firestore for the event that starts within the next 24 hours
                const eventsCollection = collection(db, 'Exports');
                const q = query(eventsCollection, where('start', '>=', now.toISOString()), where('start', '<', next24Hours.toISOString()));
                const querySnapshot = await getDocs(q);

                // Get the upcoming event data (if available)
                if (!querySnapshot.empty) {
                    const upcomingEventData = querySnapshot.docs.map(doc => doc.data());
                    setUpcomingEvent(upcomingEventData)
                };
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Function to display the banner if there is an upcoming event
    const renderEventBanner = () => {
        if (upcomingEvent) {
            console.log(upcomingEvent);
            return (
                <div>
                    {upcomingEvent.map((event) => (
                        <div key={event.id}>
                            <h3>{event.title}</h3>
                        </div>
                    ))}
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
