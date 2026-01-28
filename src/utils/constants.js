export const defaultColor = '#7174FA'

export const includedColors = [
    '#f00', '#0f0', '#00f', '#ff0', '#0ff', '#FF9100FF', '#00FFD0FF', '#6600FFFF',
    '#8f16a4', '#4f0b0c', '#7174FA'
]

export const alertBgColors = {
    error: 'bg-red-100 border-red-400 text-red-700',
    success: 'bg-green-100 border-green-400 text-green-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
};

export const daysOfWeek = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
]

export const formDataDefault = {
    name: '',
    days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    },
    startTime: '06:00',
    endTime: '07:00',
    color: defaultColor
}