import { Info } from 'lucide-react';

const InfoTooltip = ({ text, direction = 'right' }) => {
    const directions = {
        up: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        down: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
        topRight: 'bottom-full left-0 mt-2',
        topLeft: 'bottom-full right-0 mt-2',
        bottomRight: 'top-full left-0 mb-2',
        bottomLeft: 'top-full right-0 mb-2',
    };

    return (
        <div className="group relative inline-flex items-center">
            <Info className="w-4 h-4 text-slate-400" />
            
            {/* Tooltip Container */}
            <div className={`absolute ${directions[direction]} max-w-[250px] w-max break-words whitespace-normal px-3 py-1.5 bg-slate-800 text-white text-xs rounded-lg 
                opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                transition-all duration-200 z-50 shadow-lg text-center
            `}>
                {text}
            </div>
        </div>
    );
};

export default InfoTooltip;