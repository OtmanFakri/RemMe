import {useState} from "react";


const FormExport = () => {
    const [formData, setFormData] = useState({
        date: '',
        receiver: '',
        object: '',
        notes: [{ number: 1, dateOfNote: '' }],
    });

    const handleAddNote = () => {
        setFormData((prevData) => ({
            ...prevData,
            notes: [...prevData.notes, { number: prevData.notes.length + 1, dateOfNote: '' }],
        }));
    };

    const handleNoteChange = (index, value) => {
        const updatedNotes = [...formData.notes];
        updatedNotes[index].dateOfNote = value;
        setFormData({ ...formData, notes: updatedNotes });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form data:', formData);
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="date" className="block font-medium">
                    Date:
                </label>
                <input
                    type="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
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
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="object" className="block font-medium">
                    Object:
                </label>
                <input
                    type="text"
                    id="object"
                    value={formData.object}
                    onChange={(e) => setFormData({ ...formData, object: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
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
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddNote}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    Add Note
                </button>
            </div>
            <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
                Submit
            </button>
        </form>
    );
};

export default FormExport;
