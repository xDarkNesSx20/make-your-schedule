import { useEffect, useState } from 'react';
import {alertBgColors} from "../utils/constants.js";

const Alert = ({ message, type = 'error', onClose, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsVisible(true)
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={`fixed top-4 right-4 z-50 border-l-4 p-4 rounded shadow-lg ${alertBgColors[type]} max-w-md transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
        >
            <div className="flex items-center justify-between">
                <p className="font-medium">{message}</p>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    className="ml-4 text-xl font-bold hover:opacity-70"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default Alert;