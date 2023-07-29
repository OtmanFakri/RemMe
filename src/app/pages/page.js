"use client";
import {atom, useAtom, useAtomValue, useSetAtom} from 'jotai';

import {Calendar, Collapse,} from "antd";
import {useState} from "react";
import locale from 'antd/es/date-picker/locale/ar_EG';

 import dayjs from 'dayjs';
 import 'dayjs/locale/ar-kw';
dayjs.locale('ar-kw');



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

    const [value, setValue] = useState();

    const onPanelChange = (value) => {
        setValue(value);
    };

    const dateCellRender = (value) => {
        // Custom date rendering using date-fns format function
        return (
            <div className="ant-fullcalendar-date">

            </div>
        );
    };

    const onSelect = (value) => {
        // Handle selection here
        console.log(value);
    };


    return (
        <Calendar
            className={"my-calendar arabic"}
            value={value}
            locale={locale}
            onPanelChange={onPanelChange}
            onSelect={onSelect}
        />
    );
};

export default Page;