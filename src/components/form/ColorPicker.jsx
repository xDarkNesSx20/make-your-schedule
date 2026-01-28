import {useState} from "react";
import {Plus} from "lucide-react";
import {includedColors} from "../../utils/constants.js";

export default function ColorPicker({value, onChange}) {
    const [customColors, setCustomColors] = useState([])
    const [showInputColor, setShowInputColor] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleColorSelect = (color) => {
        onChange({target: {value: color}})
        setIsOpen(false)
    }

    const handleAddCustomColor = e => {
        const newColor = e.target.value.toUpperCase()
        if (!includedColors.includes(newColor) && !customColors.includes(newColor)) {
            setCustomColors([...customColors, newColor])
            handleColorSelect(newColor)
            setShowInputColor(false)
        }
    }

    const colors = [...includedColors, ...customColors]

    return (
        <div className="relative">
            <div onClick={() => setIsOpen(!isOpen)} style={{backgroundColor: value}}
                 className="w-16 h-10 border-2 border-gray-300 rounded-md cursor-pointer hover:border-indigo-500 transition-colors"/>
            {
                isOpen && (
                    <div className="absolute z-50 mt-2 p-4 bg-white border border-gray-300 rounded-lg shadow-xl min-w-[240px]">
                        <p className="text-xs font-medium text-gray-700 mb-3">Select a color:</p>
                        <div className="grid grid-cols-5 gap-3 mb-3">
                            {
                                colors.map(c => (
                                    <div key={c} onClick={() => handleColorSelect(c)}
                                         style={{backgroundColor: c, borderColor: value === c ? '#4f46e5' : '#e5e7eb'}}
                                         title={c} className="w-10 h-10 rounded cursor-pointer hover:scale-110 transition-transform border-2"/>
                                ))
                            }

                            <div title="Add custom color" onClick={() => setShowInputColor(true)}
                                 className="w-10 h-10 rounded cursor-pointer hover:scale-110 transition-transform border-2 border-dashed border-gray-400 flex items-center justify-center bg-gray-50 hover:bg-gray-100">
                                <Plus size={20} className="text-gray-600"/>
                            </div>
                        </div>

                        {
                            showInputColor && (
                                <div className="mt-2">
                                    <input type="color" onChange={handleAddCustomColor} autoFocus
                                           className="w-full h-10 cursor-pointer rounded"/>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}