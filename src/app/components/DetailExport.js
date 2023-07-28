

const DetailExport = ({ values }) => {
    return (
        <div>
            <h2>{values.date}</h2>
            <p>Receiver: {values.receiver}</p>
            <p>Object: {values.object}</p>
            <p>Type: {values.type}</p>
            <p>Reply: {values.reply.length === 0 ? 'No replies' : values.reply.join(', ')}</p>
            <h3>Notes:</h3>
            {values.notes.map((note) => (
                <div key={note.number}>
                    <p>Number: {note.number}</p>
                    <p>Date of Note: {note.dateOfNote}</p>
                </div>
            ))}
        </div>
    );
}
export default DetailExport