import { useState } from 'react';
import ControlPane from "./components/form/ControlPane.jsx";
import ScheduleTable from './components/table/ScheduleTable.jsx';
import Alert from './components/Alert.jsx';
import {formDataDefault} from "./utils/constants.js";

export default function App() {
  const [subjects, setSubjects] = useState([])
  const [alert, setAlert] = useState(null)
  const [formData, setFormData] = useState({...formDataDefault})

  const showAlert = (message, type = 'error') => {
    setAlert({ message, type })
    setTimeout(() => setAlert(null), 3000)
  }

  const timeSlots = Array.from({ length: 16 }, (_, i) => {
    const hour = i + 6;
    return {
      start: `${hour.toString().padStart(2, '0')}:00`,
      end: `${(hour + 1).toString().padStart(2, '0')}:00`
    }
  });

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    const selectedDays = Object.keys(formData.days).filter(day => formData.days[day])

    if (!formData.name.trim()) {
      showAlert('Please, enter a subject name.')
      return
    }

    if (selectedDays.length === 0) {
      showAlert('Please, select at least one day.', 'warning')
      return
    }

    const isConflict = subjects.some(subject => {
      for (let day of selectedDays) {
        if (subject.days.includes(day)) {
          const existingStart = parseInt(subject.startTime.split(':')[0])
          const existingEnd = parseInt(subject.endTime.split(':')[0])
          const newStart = parseInt(formData.startTime.split(':')[0])
          const newEnd = parseInt(formData.endTime.split(':')[0])

          if (newStart < existingEnd && newEnd > existingStart) {
            return true
          }
        }
      }
      return false
    });

    if (isConflict) {
      showAlert('Schedule conflict detected.Please choose different time or days.', 'error')
      return
    }

    const newSubject = {
      id: Date.now(),
      name: formData.name,
      days: selectedDays,
      startTime: formData.startTime,
      endTime: formData.endTime,
      color: formData.color
    };

    setSubjects([...subjects, newSubject])
    setFormData({...formDataDefault})
  };

  const exportToImage = async () => {
    const table = document.getElementById('schedule-table')
    try {
      const html2canvas = (await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm')).default
      const canvas = await html2canvas(table)
      const link = document.createElement('a')
      link.download = 'schedule.png'
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      alert(`Error exporting schedule: ${error.message}`)
    }
  };

  const deleteSubject = (subjectId) => {
    setSubjects(subjects.filter(s => s.id !== subjectId))
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {
            alert && (
                <Alert message={alert.message} type={alert.type}
                       onClose={() => setAlert(null)}/>
            )
        }

        <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 px-4 shadow-lg">
          <h1 className="text-3xl font-bold text-center">📚 Make your Schedule 📚</h1>
        </div>

        <ControlPane
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onExport={exportToImage}
            timeSlots={timeSlots}
            subjects={subjects}
        />

        <ScheduleTable
            subjects={subjects}
            onDeleteSubject={deleteSubject}
            timeSlots={timeSlots}
        />
      </div>
  )
};