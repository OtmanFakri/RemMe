'use client';
import React, { useState } from 'react';
import {Calendar, Drawer, Dropdown, Menu, Modal, Space} from 'antd';
import dayjs from 'dayjs';
import Image from 'next/image';
import { CheckCircleOutlined } from '@ant-design/icons';
import Cartb from "../app/components/Carditem";
import points from "../../icons/points.svg";
import FormExport from "@/app/components/FormExport";


const Home = () => {
    const [value, setValue] = useState(dayjs()); // Replace 'dayjs()' with your initial date value
    const [selectedDate, setSelectedDate] = useState(value);
    const [visible, setVisible] = useState(false);
    const [Dataofday, setDataofday] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);



    // Sample event data
    const events = [
        {
            title: 'Event 1',
            start: '2023-07-01',
            type: 'export',
            end: '2023-07-10',
        },
        {
            title: 'Event 2',
            start: '2021-09-03',
            type: 'import',
            end: '2021-09-05',
        },
        // Add more events as needed
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
        const eventList = events.filter(
            (event) =>
                date.isSame(event.start, 'day') || date.isBefore(event.end, 'day')
        );
        return (
            <ul>
                {eventList.map((event) => (
                    <div className="h-3 w-3 bg-blue-500 rounded-full absolute bottom-1 left-1">
                        <CheckCircleOutlined className="text-white w-2 h-2 absolute  [-translate-y-1/2]" />
                    </div>
                ))}
            </ul>
        );
    };
    const handleMenuClick = (e) => {
        setIsModalVisible(e.key);
    };
    const handleModalOk = () => {
        setIsModalVisible(false);
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
                            + <i className="fas fa-caret-down"></i>
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
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
               <FormExport/>
            </Modal>

            <Modal
                title="Modal Title"
                visible={isModalVisible === '2'}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
            >
                <p>Modal has 2 content goes here</p>
            </Modal>
        </div>
    );
};

export default Home;
