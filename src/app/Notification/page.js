"use client";
import NavBar from "@/app/components/NavBar";
import React, {useEffect, useState} from "react";
import {collection, doc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "@/app/Conf/conf";
import {Modal} from "antd";
import TabsDetails from "@/app/components/tabsDeatils";
import {updateExports} from "@/app/Exports /ControllerEcports";


const Notification = () => {

    const  [upcomingEvent2, setUpcomingEvent2] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [current, setcurrent] = useState("");

    const [selectedOption, setSelectedOption] = useState('All'); // Initialize with the default value

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

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
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

                // Query the Firestore for the event that starts within the next 24 hours and Now
                const eventsCollection = collection(db, 'Exports');
                const q = query(eventsCollection,
                    where('start', '>=', formatDate(now)),
                    where('start', '<=', next24Hours.toISOString()),

                );
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
    async function handleupdate(event) {
        const updateEvent = {
            ...event,
            completed: !event.completed
        };

        const docRef = doc(db, event.type, event.id);

        await updateDoc(docRef, updateEvent).then(()=>{
            console.log("update")
            }
        )


    }

    const allEvents = upcomingEvent2; // Your array of all events
    const completedEvents = upcomingEvent2?.filter(event => event.completed);
    const notCompletedEvents = upcomingEvent2?.filter(event => !event.completed);

    let filteredEvents = allEvents;

    if (selectedOption === 'Completed') {
        filteredEvents = completedEvents;
    } else if (selectedOption === 'Not Completed') {
        filteredEvents = notCompletedEvents;
    }

    if(upcomingEvent2 === null) {
        return <div>Loading...</div>;
    }


    return(
        <>
            <NavBar />

            <div className={"py-10"}>
                <div className="px-10 my-2 flex sm:flex-row flex-col">
                    <div className=" flex flex-row mb-1 sm:mb-0">
                        <div className="relative">
                            <select
                                value={selectedOption}
                                onChange={handleSelectChange}
                                className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                                <option>All</option>
                                <option>Completed</option>
                                <option>Not Completed</option>
                            </select>
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="block relative">
                    <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg>
                    </span>
                        <input
                            value={selectedOption}
                            placeholder="Search"
                               className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"/>
                    </div>
                </div>            </div>
           <div>
               <div className="focus:outline-none py-8 w-full h-screen">
                   <div className="grid grid-cols-2 gap-4">

                       {
                           filteredEvents.map((event,index)=>{
                               return(
                                   <>
                                   <div
                                       key={index}
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

                                       <Modal
                                           footer={
                                               <button
                                                   onClick={()=>handleupdate(upcomingEvent2[current])}
                                                   type="button"
                                                   className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                                   {event.completed ? "Completed" : "Not Completed"}
                                               </button>

                                           }
                                           title={upcomingEvent2[current]?.title}
                                           open={isModalOpen}
                                           onOk={handleOk}
                                           onCancel={handleCancel}>
                                           <TabsDetails event={upcomingEvent2[current]}  />


                                       </Modal>
                                   </>
                               )
                           })
                       }

                   </div>
               </div>
           </div>


        </>
    );
}

export default Notification;