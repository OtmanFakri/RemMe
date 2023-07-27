import React from 'react';
import {Collapse, Tabs} from 'antd';
import TabPane from "antd/es/tabs/TabPane";
const onChange = (key) => {
    console.log(key);
};
const { Panel } = Collapse;

const TabsDetails = ({ event }) => (

    <Tabs  onChange={onChange}>
        <TabPane tab="Details" key={event.id}>
            <h2>title: {event.title}</h2>
            <h2>Completed: {event.completed ? "completed" : "Not Completed"}</h2>
        </TabPane>

        <TabPane tab="Replay" key={3} >
            {
                event.reply.map((item)=>{
                    return (
                        <Collapse className={" my-4"}>
                            <Panel header={item.title} key={item.id}>
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
        </TabPane>
    </Tabs>


);

export default TabsDetails;