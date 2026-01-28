import { useState } from "react";

function AutoCompleteInput({subjects, value, onChange, placeholder, onSugerenceClick}) {
    const [showSuggestions, setShowSuggestions] = useState(false);

    if (!showSuggestions) {
        return (
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onFocus={() => setShowSuggestions(true)}
            />
        );
    }

    return(
        <div className="relative">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onFocus={() => setShowSuggestions(true)}
            />
            {
                showSuggestions && subjects.length > 0 && value.trim() !== '' && (
                    <ul className="absolute z-10 bg-[#333] text-white border border-black-300 rounded-md mt-1 max-h-32 overflow-y-auto w-full">
                        {subjects.map(subject => (
                            <li key={subject.id} className="px-2 py-1 hover:bg-[#444] cursor-pointer max-h-5 text-xs"
                                onClick={() => {
                                    onSugerenceClick(subject.name)
                                    setShowSuggestions(false)
                                }} >
                                {subject.name}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}

export default AutoCompleteInput;