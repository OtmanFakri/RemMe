import {useState} from "react";
import {Button, DatePicker, Form, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import {addNewExport} from "@/app/Exports /ModelExports";


const FormImport = () => {
    const { RangePicker } = DatePicker;
    const handleFormSubmit = (values) => {
        const newExport = { id: 3, title: 'Event 3', type: 'Exports', start: '2023-07-30', completed: false, end: '2023-08-06' };
        addNewExport(newExport);
        console.log('Form values:', values);
    };

    const validateDateRange = (_, value) => {
        if (!value || value.length !== 2) {
            return Promise.reject('Date Range is required');
        }
        return Promise.resolve();
    };

    const validateField = (_, value, field) => {
        if (!value) {
            return Promise.reject(`${field} is required`);
        }
        return Promise.resolve();
    };

    return (
        <>
            <Form
                onFinish={handleFormSubmit}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                className="p-4 space-y-4"
            >
                <Form.Item
                    name="dateRange"
                    label="Date Range"
                    rules={[{ validator: validateDateRange }]}
                >
                    <RangePicker className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                </Form.Item>
                <Form.Item
                    name="Number"
                    label="Number"
                    rules={[{ validator: (_, value) => validateField(_, value, 'Number') }]}
                >
                    <Input className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                </Form.Item>

                <Form.Item
                    name="textValue"
                    label="Text"
                    rules={[{ validator: (_, value) => validateField(_, value, 'Text') }]}
                >
                    <Input className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
                </Form.Item>

                <Form.Item
                    name="textareaValue"
                    label="Textarea"
                    rules={[{ validator: (_, value) => validateField(_, value, 'Textarea') }]}
                >
                    <TextArea className="block  mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" rows={4} />
                </Form.Item>

                <div className="text-right"> {/* Add this container div with "text-left" class */}
                    <button type="submit"
                            className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                    >
                        Submit
                    </button>
                </div>
            </Form>
            );
        </>
    );
}
export default FormImport;