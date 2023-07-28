import Image from "next/image";
import points from "../../../icons/points.svg";
import React, {useEffect, useState} from "react";
import {Dropdown, Menu, Modal} from "antd";
import {
    EventExports,
    EventExports2,
    updateExporteCompleted,
    updateExporteCompleted2,
} from "@/app/Exports /ModelExports";
import {useAtom, useAtomValue, useSetAtom} from "jotai";
import {RecoilRoot} from "recoil";
import TabsDetails from "@/app/components/tabsDeatils";
import FormExport from "@/app/components/FormExport";
import FormImport from "@/app/components/FormImport";




const Cartb =({event}) =>{



    const handleMenuClick = (e) => {
        console.log("Clicked:", e.key);
    };
    //const [Export,setExporte] = useAtom(EventExports);

    const setCompleted  = useSetAtom(EventExports2)
    const Export  = useAtomValue(EventExports2)



    const handleUpdateTodo = () => {
        setCompleted((prevList) =>
            prevList.map((item) => {
                if (item.id === event.id) {
                    console.log(item)

                    return { ...item, completed: !event.completed };
                }

                return item;
            })
        );
    };
    const currentEvent = Export.find((ev) => ev.id === event.id);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalOpenExport, setIsModalOpenExport] = useState(false);
    const [isModalOpenImport, setIsModalOpenImport] = useState(false);


    const handleExportClick = () => {
        setIsModalOpenExport(!isModalOpenExport);
    };

    const handleImportClick = () => {
        setIsModalOpenImport(!isModalOpenImport);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item
                onClick={() => handleUpdateTodo()}
                key={event.id} > {
                currentEvent.completed ?"Not completed": "completed" }
            </Menu.Item>
            <Menu.Item key='2'>Delete</Menu.Item>
            <Menu.Item
                onClick={showModal}
                key='3'>View</Menu.Item>


            <Menu.Item
                onClick={
                currentEvent.type === 'Imports'
                        ? handleImportClick
                        : handleExportClick
                }
                key='4'>Reply</Menu.Item>

        </Menu>
    );

    return(
        <div className={`w-full h-[84px] relative rounded-lg ${
            currentEvent.completed
                ? 'bg-slate-500'
                : currentEvent.type === 'Imports'
                    ? 'bg-green-200'
                    : 'bg-orange-200'
                    
        }`}>
            <div className="w-[225px] left-[15px] top-[15px] absolute flex justify-start items-center">
                <div className="pr-[9px] flex justify-start items-start">
                    <div className="text-neutral-800 text-sm font-normal leading-none">
                        {currentEvent.title} - {currentEvent.completed ? "Completed" : "not Completed" }
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


            <Modal title={currentEvent.title}
                   open={isModalOpen}
                   onCancel={handleOk}
                   footer={null}
            >
                <TabsDetails event={currentEvent}  />
            </Modal>

            {currentEvent.type === 'Imports' ? (
                <Modal
                    title="Reply to Export"
                    footer={null}
                    visible={isModalOpenImport} onCancel={() => setIsModalOpenImport(false)}>
                    <FormExport />
                </Modal>
            ) : (
                <Modal
                    title="Reply to Import"
                    footer={null}
                    visible={isModalOpenExport} onCancel={() => setIsModalOpenExport(false)}>
                    <FormImport />
                </Modal>
            )}
        </div>


    )
}
export  default Cartb;