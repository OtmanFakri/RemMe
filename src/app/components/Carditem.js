import Image from "next/image";
import points from "../../../icons/points.svg";
import React from "react";
import {Dropdown, Menu} from "antd";

const options = ["Complete", "Delete", "Reply"];


const Cartb =({event}) =>{
    const handleMenuClick = (e) => {
        // Handle menu item click here
        console.log("Clicked:", e.key);
    };
    const menu = (
        <Menu onClick={handleMenuClick}>
            {options.map((option) => (
                <Menu.Item key={option}>{option}</Menu.Item>
            ))}
        </Menu>
    );
    return(
        <div className={`w-full h-[84px] relative rounded-lg ${event.type === 'Exports' ? 'bg-orange-200' : 'bg-green-200'}`}>
            <div className="w-[225px] left-[15px] top-[15px] absolute flex justify-start items-center">
                <div className="pr-[9px] flex justify-start items-start">
                    <div className="text-neutral-800 text-sm font-normal leading-none">
                        {event.title}
                    </div>
                </div>
            </div>
            <div
                className="w-[225px] pr-[164px] left-[15px] top-[54px] absolute flex justify-start items-start">
                <div className="text-stone-700 text-[13px] font-normal">0:15h</div>
            </div>
            <div className="h-full flex justify-end items-center">
                <Dropdown overlay={menu}>
                    <Image src={points} alt="My Icon" width={32} height={32} />
                </Dropdown>
            </div>
        </div>
    )
}
export  default Cartb;