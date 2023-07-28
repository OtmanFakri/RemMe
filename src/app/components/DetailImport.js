
function DetailImport({ values }) {
    return (
        <div>
            <h2>{values.title}</h2>
            <p>Start: {values.start}</p>
            <p>Type: {values.type}</p>
            <p>Completed: {values.completed ? 'Yes' : 'No'}</p>
            <p>End: {values.end}</p>
            <p>Number: {values.Number}</p>
            <p>Textarea Value: {values.textareaValue}</p>
            <p>ID: {values.id}</p>
        </div>
    );
}

export default DetailImport;
