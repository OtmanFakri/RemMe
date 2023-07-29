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

                // Query the Firestore for the event that starts within the next 24 hours
                const now = new Date();
                const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);

                const eventsCollection = collection(db, 'Exports');
                const q = query(eventsCollection, where('start', '>', formatDate(now)), where('start', '<', formatDate(nextDay)), limit(1));
                const querySnapshot = await getDocs(q);

                console.log("data : ",querySnapshot.docs[0].data())
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
