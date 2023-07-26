import Image from "next/image";
import points from "../../../icons/points.svg";
import React, {useEffect} from "react";
import {Dropdown, Menu} from "antd";
import {EventExports, updateExporteCompleted, updateExporteCompleted2,} from "@/app/Exports /ModelExports";
import {useAtom} from "jotai";
import {RecoilRoot} from "recoil";




const Cartb =({event}) =>{



    const handleMenuClick = (e) => {
        console.log("Clicked:", e.key);
    };
    const [Export,setExporte] = useAtom(EventExports);




    const handleUpdateTodo = () => {
        const updatedExports = updateExporteCompleted(event.id);
        setExporte(updatedExports);
    };
    const currentEvent = Export.find((ev) => ev.id === event.id);

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item
                onClick={() => handleUpdateTodo()}
                key={event.id} >Complete
            </Menu.Item>
            <Menu.Item key='2'>Delete</Menu.Item>
            <Menu.Item key='3'>Reply</Menu.Item>

        </Menu>
    );
    return(
        <div className={`w-full h-[84px] relative rounded-lg ${
            currentEvent.completed
                ? 'bg-slate-500'
                : event.type === 'Imports'
                    ? 'bg-orange-200'
                    : 'bg-green-200'
        }`}>
            <div className="w-[225px] left-[15px] top-[15px] absolute flex justify-start items-center">
                <div className="pr-[9px] flex justify-start items-start">
                    <div className="text-neutral-800 text-sm font-normal leading-none">
                        {event.title} - {currentEvent.completed ? "Completed" : "not Completed" }
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