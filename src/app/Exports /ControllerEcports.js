import EventModel, {EventExport} from "@/app/Exports /ModelExports";
import {useAtom, useSetAtom} from "jotai";
import {updateTodoTitleGoal} from "@/app/pages/actionTodo";




export const ExporteController = (index) => {
    const [todos, setTodos] = useAtom(EventExport);

    const updateTodo = (index) => {
        setTodos((state) => {
            state[index].completed = !state[index].completed;
            return state;
        });

    };


}
const EventController = {

    getEvents: () => {
        return EventModel.getEvents();
    },
}


export default EventController;
