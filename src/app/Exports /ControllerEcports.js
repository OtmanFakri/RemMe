

import { collection, addDoc } from "firebase/firestore";
import {db} from "@/app/Conf/conf";


const EventController = {

    getEvents: () => {
        return EventModel.getEvents();
    },
}


export const addExports = async (todo) => {
    try {
        const docRef = await addDoc(collection(db, "Exports"),
            todo,
        );
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export default EventController;
