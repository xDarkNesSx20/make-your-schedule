import ScheduleCell from './ScheduleCell.jsx';
import {daysOfWeek} from "../../utils/constants.js";

const ScheduleTable = ({ subjects, onDeleteSubject, timeSlots }) => {

    const getSubjectForSlot = (day, timeSlot) => {
        return subjects.find(subject => {

            if (!subject.days.includes(day)) return false;

            const slotStart = parseInt(timeSlot.start.split(':')[0]);
            const slotEnd = parseInt(timeSlot.end.split(':')[0]);
            const subjectStart = parseInt(subject.startTime.split(':')[0]);
            const subjectEnd = parseInt(subject.endTime.split(':')[0]);

            return slotStart >= subjectStart && slotEnd <= subjectEnd;
        })
    };

    const isFirstSlotOfSubject = (day, timeSlot, subject) => {
        if (!subject) return false

        const slotStart = parseInt(timeSlot.start.split(':')[0])
        const subjectStart = parseInt(subject.startTime.split(':')[0])

        return slotStart === subjectStart
    };

    const getRowSpan = (subject) => {
        if (!subject) return 1

        const subjectStart = parseInt(subject.startTime.split(':')[0])
        const subjectEnd = parseInt(subject.endTime.split(':')[0])

        return subjectEnd - subjectStart
    };

    return (
        <div className="p-4">
            <div id="schedule-table" className="bg-white rounded-lg shadow-md overflow-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-sm font-semibold text-white bg-indigo-600">
                            Hour
                        </th>
                        {daysOfWeek.map(day => (
                            <th key={day} className="border border-gray-300 p-3 text-sm font-semibold text-gray-700 capitalize bg-indigo-600 text-white">
                                {day}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {timeSlots.map(slot => (
                        <tr key={slot.start}>
                            <td className="border border-gray-300 p-2 text-center text-sm font-medium bg-gray-50 whitespace-nowrap bg-indigo-600 text-white">
                                {slot.start} - {slot.end}
                            </td>
                            {daysOfWeek.map(day => {
                                const subject = getSubjectForSlot(day, slot)
                                const isFirstSlot = isFirstSlotOfSubject(day, slot, subject)

                                if (subject && !isFirstSlot) {
                                    return null
                                }

                                if (subject) {
                                    return (
                                        <td
                                            key={day}
                                            className="border border-gray-300 p-2 text-center text-sm min-w-0 max-w-[100px]"
                                            rowSpan={getRowSpan(subject)}
                                            style={{
                                                backgroundColor: subject.color,
                                                color: 'white',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => onDeleteSubject(subject.id)}
                                            title="Click to delete"
                                        >
                                            <div className="font-medium break-words overflow-wrap-anywhere">
                                                {subject.name}
                                            </div>
                                        </td>
                                    )
                                }

                                return <ScheduleCell key={day} subject={null} />
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default ScheduleTable