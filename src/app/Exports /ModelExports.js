import {atomWithImmer} from "jotai-immer";
import { produce } from 'jotai-immer';

export const EventExports = atomWithImmer([
]);


export const getExport = async () => {
    // Simulating an API call
    return [{ id: 1, title: 'Event 1', type: 'Exports', start: '2023-07-20', completed: false, end: '2023-07-27' },
        { id: 2, title: 'Event 2', type: 'Imports', start: '2023-07-20', completed: false, end: '2023-07-27' }];
};
export const updateExporteCompleted = (id) => (state) => {
    const todo = state.find((item) => item.id === id);
    //console.log(state);
    console.log(id);
    if (todo) {
        console.log(todo.title,todo.completed);
        todo.completed = !todo.completed;
    }
};

