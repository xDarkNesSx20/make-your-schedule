import { Download } from 'lucide-react';
import { useState } from 'react';
import AutoCompleteInput from './AutoCompleteInput.jsx';
import ColorPicker from "./ColorPicker.jsx";
import {daysOfWeek} from "../../utils/constants.js";

const ControlPane = ({ formData, setFormData, onSubmit, onExport, timeSlots, subjects }) => {
    const [filteredSubjects, setFilteredSubjects] = useState(subjects);

    const handleDayChange = (day) => {
        setFormData(prev => ({
            ...prev,
            days: { ...prev.days, [day]: !prev.days[day] }
        }))
    };

    const filterSubjects = (name) => {
        const filtered = subjects.filter(subject =>
            subject.name.toLowerCase().startsWith(name.toLowerCase())
        );
        setFilteredSubjects(filtered);
    }

    return (
        <div className="flex gap-2 p-4">
            {/* Main Form - 90% width */}
            <div className="w-[90%] bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                    {/* First Row: All Input Fields except days of week */}
                    <div className="flex flex-wrap items-end gap-4">
                        {/* Subject Name */}
                        <div className="flex-1 min-w-[150px]">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject
                            </label>
                            <AutoCompleteInput
                                subjects={filteredSubjects}
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData({ ...formData, name: e.target.value });
                                    filterSubjects(e.target.value);
                                }}
                                placeholder="Ej: Matemáticas"
                                onSugerenceClick={(subjectName) => setFormData({ ...formData, name: subjectName })}
                            />
                        </div>

                        {/* Time Selects: Selects start and end time for the subject */}
                        <div className="flex gap-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Hour
                                </label>
                                <select
                                    value={formData.startTime}
                                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                >
                                    {timeSlots.map(slot => (
                                        <option key={slot.start} value={slot.start}>{slot.start}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Hour
                                </label>
                                <select
                                    value={formData.endTime}
                                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                                >
                                    {timeSlots.map(slot => (
                                        <option key={slot.end} value={slot.end}>{slot.end}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Color Picker: Sets a color to the subjects in the table */}
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Color
                            </label>
                            <ColorPicker value={formData.color}
                                         onChange={(e) => setFormData({ ...formData, color: e.target.value })} />
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={onSubmit}
                            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Add Subject
                        </button>
                    </div>

                    {/* Second Row: Days Checkboxes extended horizontally and under the other fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Days of week
                        </label>
                        <div className="flex flex-wrap gap-4">
                            {daysOfWeek.map(day => (
                                <label key={day} className="flex items-center gap-1 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.days[day]}
                                        onChange={() => handleDayChange(day)}
                                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                    />
                                    <span className="text-sm capitalize">{day}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Export Button - Downloads your schedule as an image */}
            <div className="w-[10%] flex items-center justify-center">
                <button
                    onClick={onExport}
                    className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
                    title="Export to PNG"
                >
                    <Download className="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8" />
                </button>
            </div>
        </div>
    )
};

export default ControlPane