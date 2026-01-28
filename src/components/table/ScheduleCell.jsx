const ScheduleCell = ({ subject, onClick }) => {
    if (!subject) {
        return (
            <td className="border border-gray-300 p-2 text-center text-sm">
                <div className="text-gray-400">-</div>
            </td>
        )
    }

    return (
        <td
            className="border border-gray-300 p-2 text-center text-sm"
            style={{
                backgroundColor: subject.color,
                color: 'white',
                cursor: 'pointer'
            }}
            onClick={onClick}
            title="Click para eliminar"
        >
            <div className="font-medium">{subject.name}</div>
        </td>
    )
};

export default ScheduleCell