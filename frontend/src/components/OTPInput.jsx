import React, { useState, useRef, useEffect } from 'react';

const OtpInput = ({ length = 6, value, onChange }) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    // Sync external value to local state if needed (e.g. for reset)
    useEffect(() => {
        if (value === "") {
            setOtp(new Array(length).fill(""));
        }
    }, [value, length]);

    const handleChange = (index, e) => {
        const val = e.target.value;
        if (isNaN(val)) return;

        const newOtp = [...otp];
        // Allow only the last digit if multiple were entered (prevents issues with some browsers)
        newOtp[index] = val.substring(val.length - 1);
        setOtp(newOtp);

        const combinedOtp = newOtp.join("");
        onChange(combinedOtp);

        // Move to next input if current field is filled
        if (val && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Move to previous input on backspace if current field is empty
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text").substring(0, length);
        if (!/^\d+$/.test(data)) return;

        const newOtp = [...otp];
        data.split("").forEach((char, index) => {
            if (index < length) {
                newOtp[index] = char;
            }
        });
        setOtp(newOtp);
        onChange(newOtp.join(""));

        // Focus the last filled input or the first empty one
        const nextIndex = data.length < length ? data.length : length - 1;
        inputRefs.current[nextIndex].focus();
    };

    return (
        <div className="flex justify-center gap-3 py-4">
            {otp.map((data, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={data}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    className="w-14 h-14 text-center text-2xl font-black bg-slate-50 border-2 border-slate-300 bg-slate-200 rounded-xl text-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                    inputMode="numeric"
                />
            ))}
        </div>
    );
};

export default OtpInput;
