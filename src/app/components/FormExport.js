import {useState} from "react";
import {addNewExport, EventExports2} from "@/app/Exports /ModelExports";
import {useAtomValue, useSetAtom} from "jotai";
import {message} from "antd";
import moment from "moment";


const FormExport = ({SelectData}) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success Add',
        });
    };

    const [formData, setFormData] = useState({
        date: SelectData,
        receiver: '',
        object: '',
        notes: [
            { number: 1, dateOfNote: '' }
        ],
    });

    const SetExporte = useSetAtom(EventExports2)


    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!formData.date || !formData.receiver || !formData.object) {
            alert("Please fill out all fields.");
            return;
        }

        // Check if the date is in the past
        const currentDate = new Date().toISOString().split("T")[0];
        if (formData.date > currentDate) {
            alert("Date must be in the past.");
            return;
        }

        // Handle form submission here
        SetExporte((prev)=>[
            ...prev,
            {id: 3, title: formData.object, type: 'Exports', start: formData.date, completed: true, end: '2023-07-27' }]);
        success()
        console.log('Form data:', formData);
    };

    const handleNoteChange = (index, value) => {
        const updatedNotes = [...formData.notes];
        updatedNotes[index].dateOfNote = value;
        setFormData({ ...formData, notes: updatedNotes });
    };


    return (
        <form
            defaultValue={SelectData}
            onSubmit={handleSubmit} className="space-y-4">
            {contextHolder}
            <div>
                <label htmlFor="date" className="block font-medium">
                    Date:
                </label>
                <input
                    type="date"
                    id="date"
                    defaultValue={SelectData}
                    value={SelectData}
                    //onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"                />
            </div>
            <div>
                <label htmlFor="receiver" className="block font-medium">
                    Receiver:
                </label>
                <input
                    type="text"
                    id="receiver"
                    value={formData.receiver}
                    onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
                    className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"                />
            </div>
            <div>
                <label htmlFor="object" className="block font-medium">
                    Object:
                </label>
                <textarea

                    id="object"
                    value={formData.object}
                    onChange={(e) => setFormData({ ...formData, object: e.target.value })}
                    className="block mt-2 w-full  placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"/>
            </div>
            <div>
                <h3 className="font-medium">Notes:</h3>
                {formData.notes.map((note, index) => (
                    <div key={index} className="space-y-2">
                        <label htmlFor={`note-${index}`} className="block font-medium">
                            Note {note.number}:
                        </label>
                        <input
                            type="date"
                            id={`note-${index}`}
                            value={note.dateOfNote}
                            onChange={(e) => handleNoteChange(index, e.target.value)}
                            className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"                        />
                    </div>
                ))}

            </div>
            <div className="text-right"> {/* Add this container div with "text-left" class */}
                <button onSubmit={handleSubmit}
                    className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default FormExport;
