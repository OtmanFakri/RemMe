'use client';
import React, {useRef, useState} from 'react';
import {Calendar, Drawer, Dropdown, Menu, Modal, Space} from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { CheckCircleOutlined } from '@ant-design/icons';
import Cartb from "../app/components/Carditem";
import points from "../../icons/points.svg";
import moment from 'moment';

import FormExport from "@/app/components/FormExport";


const Home = () => {
    const [value, setValue] = useState(dayjs()); // Replace 'dayjs()' with your initial date value
    const [selectedDate, setSelectedDate] = useState(value);
    const [visible, setVisible] = useState(false);
    const [Dataofday, setDataofday] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const formRef = useRef(null);


    // Sample event data
    const events = [

        {
            title: 'Event 1',
            type: 'import',
            start: '2023-07-20',
            end: '2023-07-27',
        },
        {
            title: 'Event 2',
            type: 'import',
            start: '2023-07-20',
            end: '2023-07-25',
        }


    ];

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedDate(newValue);
    };

    const onPanelChange = (newValue) => {
        setValue(newValue);
    };

    const handleDateCellClick = (value) => {
        const date = value.format('YYYY-MM-DD');
        setSelectedDate(value);
        setVisible(true);

        setDataofday(events.filter((event) => date >= event.start && date <= event.end));
    };
    const handleCloseDrawer = () => {
        setVisible(false);
    };

    const dateCellRender = (date) => {
        const dateString = date.format('YYYY-MM-DD');
        const eventList = events.filter(
            (event) =>
                moment(dateString).isBetween(event.start, event.end, 'day', '[]')
        );

        return (
            <div>
                {eventList.map((event, index) => (
                    <div key={index} className="h-3 w-3 bg-blue-500 rounded-full absolute bottom-1 left-1">

                    </div>
                ))}
            </div>
        );
    };
    const handleMenuClick = (e) => {
        setIsModalVisible(e.key);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const menu = (
        <Menu onClick={(e) => handleMenuClick(e)}>
            <Menu.Item  key="1">Exports</Menu.Item>
            <Menu.Item key="2">Imports</Menu.Item>

        </Menu>
    );
    return (
        <div>
            <div className="w-full h-screen flex justify-center items-center">
                <Calendar
                    value={value}
                    onPanelChange={onPanelChange}
                    dateCellRender={dateCellRender}
                    onSelect={handleDateCellClick}
                />
            </div>
            <Drawer
                title={
                <div className={'flex flex-row justify-between'}>
                    <p>Events on {selectedDate ? selectedDate.format('MMMM Do, YYYY') : ''}</p>
                    <Dropdown  onClick={(e) => e.preventDefault()} overlay={menu} placement="bottomLeft" trigger={['click']}>
                        <button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                             <i className="fas fa-caret-down"> + </i>
                        </button>
                    </Dropdown>
                </div>}
                placement="right"
                closable={false}
                onClose={handleCloseDrawer}
                visible={visible}
                size={'large'}
            >
                <div className={"space-y-3"}>
                    {Dataofday.map((item, index) => (
                        <Cartb key={index} event={item} />
                    ))}
                </div>
            </Drawer>

            <Modal
                title="Modal Exports"
                visible={isModalVisible === '1'}
                footer={null}
                onCancel={handleModalCancel}
            >
               <FormExport ref={formRef} />
            </Modal>

            <Modal
                title="Modal Title"
                visible={isModalVisible === '2'}
                okButtonProps={{ style: { display: 'none' } }} // Hide the default OK button
                cancelButtonProps={{ style: { display: 'none' } }} // Hide the default Cancel button
                onCancel={handleModalCancel}
            >
                <p>Modal has 2 content goes here</p>
            </Modal>
        </div>
    );
};

export default Home;
