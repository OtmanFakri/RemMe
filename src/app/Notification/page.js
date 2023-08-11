"use client";
import NavBar from "@/app/components/NavBar";
import React, {useEffect, useState} from "react";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/app/Conf/conf";
import {Modal} from "antd";
import TabsDetails from "@/app/components/tabsDeatils";


const Notification = () => {

    const  [upcomingEvent2, setUpcomingEvent2] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [current, setcurrent] = useState("");
    const showModal = (index) => {
        setIsModalOpen(true);
        setcurrent(index)
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


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
                    setUpcomingEvent2(upcomingEventData)
                    console.log(upcomingEventData)

                };
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if(upcomingEvent2 === null) {
        return <div>Loading...</div>;
    }


    return(
        <>
            <NavBar />
           <div>
               <div className="focus:outline-none py-8 w-full h-screen">
                   <div className="grid grid-cols-2 gap-4">

                       {
                           upcomingEvent2.map((event,index)=>{
                               return(
                                   <>
                                   <div
                                       onClick={()=>showModal(index)}
                                       className="focus:outline-none bg-white dark:bg-gray-800 p-6 shadow rounded">
                                       <div className="flex items-center border-b border-gray-200 dark:border-gray-700 pb-6">
                                           <img src="https://cdn.tuk.dev/assets/components/misc/doge-coin.png" alt="coin avatar" className="w-12 h-12 rounded-full" />
                                           <div className="flex items-start justify-between w-full">
                                               <div className="pl-3 w-full">
                                                   <p tabIndex="0" className="focus:outline-none text-xl font-medium leading-5 text-gray-800 dark:text-white">{event.receiver}</p>
                                                   <p tabIndex="0" className="focus:outline-none text-sm leading-normal pt-2 text-gray-500 dark:text-gray-200">{event.reply.length}</p>
                                               </div>
                                               <div role="img" aria-label="bookmark">
                                                   <svg className="focus:outline-none dark:text-white text-gray-800" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                       <path d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                   </svg>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="px-2">
                                           <p tabIndex="0" className="focus:outline-none text-sm leading-5 py-4 text-gray-600 dark:text-gray-200">{event.title}</p>
                                           <div tabIndex="0" className="focus:outline-none flex">
                                               <div className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">#{event.start}</div>
                                               <div className="py-2 px-4 ml-3 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">#{event.completed ? "Completed" : "Not Completed"}</div>
                                           </div>
                                       </div>
                                   </div>

                                       <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                           <TabsDetails event={upcomingEvent2[current]}  />


                                       </Modal>
                                   </>
                               )
                           })
                       }


                       {/* Add another grid item here if needed */}
                   </div>
               </div>
           </div>


        </>
    );
}

export default Notification;