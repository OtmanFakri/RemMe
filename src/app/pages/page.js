"use client";
import {atom, useAtom, useAtomValue, useSetAtom} from 'jotai';

import {Collapse ,} from "antd";
/*
const SettercounterAtom = atom(
    (get) => get(counterAtom),
    (get, set, arg) => {
        set(counterAtom, (prev) => {
            return [...prev, arg];
        });
    },
*/

const Event1 = atom( [
    { id: 1, title: 'Event 11', type: 'Exports', start: '2023-07-20', completed: false, end: '2023-07-27',
        reply :[
            { id: 1, title: 'REvent 11', type: 'Exports', start: '2023-07-20', completed: false, end: '2023-07-27' },
            { id: 2, title: 'REvent 12', type: 'Imports', start: '2023-07-20', completed: false, end: '2023-07-27' },
        ] },]
)
const Event2 = atom( [
    { id: 1, title: 'Event 21', type: 'Exports', start: '2023-07-20', completed: false, end: '2023-07-27' },
    { id: 2, title: 'Event 22', type: 'Imports', start: '2023-07-20', completed: false, end: '2023-07-27' },]
)



const Page = () => {

    const { Panel } = Collapse;

    const count = useAtomValue(Event1)
    const setCount = useSetAtom(Event1)

    const handname = (id) => {
       setCount((prev)=>[
            ...prev,
            {id: 3, title: 'Event 3', type: 'Exports', start: '2023-07-20', completed: true, end: '2023-07-27' }]);
    }


    const addReplyToEvent = (eventId, newReply) => {
        setCount((prevEvents) =>
            prevEvents.map((event) => {
                if (event.id === eventId) {
                    // Create a new array of replies by adding the newReply to the existing replies
                    const updatedReplies = [...event.reply, newReply];
                    // Return the updated event with the new replies
                    return { ...event, reply: updatedReplies };
                }
                return event;
            })
        );
    };
    const updateName = (itemId, newName) => {
        setCount((prevList) =>
            prevList.map((item) => {
                if (item.id === itemId) {
                    return { ...item, title: newName };
                }
                return item;
            })
        );
    };

    function repy() {
        addReplyToEvent(1, {
            id: 311,
            title: 'REvent 13',
            type: 'Internal',
            start: '2023-07-20',
            completed: false,
            end: '2023-07-27',
        });
    }

    return (
        <div className="app">
            <h1>Todo List</h1>
            <ul>
                {
                    count.map((item)=>{
                        return <li key={item.id}>
                            <div>
                                <h3 >{item.title}</h3>
                                <p>{item.type}</p>
                                <p>{item.start}</p>
                                <p>{item.end}</p>
                                <p>{item.completed ? "completed" : "Not Completed"}</p>
                                <div>
                                <button onClick={()=>handname(item.id)}>
                                    click add name
                                </button>
                                </div>
                                <div>
                                    <button onClick={()=>repy()}>
                                        click add reply
                                    </button>
                                </div>
                                <button onClick={()=>updateName(item.id,"new")}>
                                    click update name
                                </button>
                                {
                                    item.reply.map((item)=>{
                                        return (
                                            <Collapse >
                                                <Panel header="This is panel header 1" key="1">
                                                    <h3 >{item.title}</h3>
                                                    <p>{item.type}</p>
                                                    <p>{item.start}</p>
                                                    <p>{item.end}</p>
                                                    <p>{item.completed ? "completed" : "Not Completed"}</p>
                                                </Panel>
                                            </Collapse>
                                        )
                                    })
                                }
                                <p>--------------------------</p>
                            </div>
                        </li>
                    })
                }

            </ul>
        </div>
    );
};

export default Page;