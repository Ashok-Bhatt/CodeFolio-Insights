import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from "lucide-react";
import { BadgeCard } from "./card/export.js";

const BadgeCollection = ({ badges, title = "Awards", defaultBadgesCount = 4, className = "" }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const displayedBadges = badges.slice(0, defaultBadgesCount);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <>
            <div className={`bg-white p-6 rounded-xl shadow-lg border border-gray-200 font-sans text-gray-800 w-full animate-float-in ${className}`}>
                <div className="flex flex-col mb-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
                    <span className="text-gray-500 font-bold text-lg">{badges.length}</span>
                </div>

                {badges.length > 0 ? (
                    <div className="flex flex-col items-center">
                        <div className="flex flex-wrap justify-center gap-4 mb-4">
                            {displayedBadges.map((badge, index) => (
                                <BadgeCard key={`${badge.id}-${index}`} badge={badge} />
                            ))}
                        </div>

                        {badges.length > defaultBadgesCount && (
                            <button
                                onClick={toggleModal}
                                className="text-blue-500 hover:text-blue-700 font-medium text-sm underline mt-2 focus:outline-none"
                            >
                                show more
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-400">No badges earned yet</p>
                    </div>
                )}
            </div>

            {isModalOpen && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300 overflow-hidden">
                    <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 border border-white/20">
                        <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-slate-50/50">
                            <h3 className="text-3xl font-black text-gray-800 tracking-tight">{title} <span className="text-blue-500 ml-2">({badges.length})</span></h3>
                            <button
                                onClick={toggleModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                                {badges.map((badge, index) => (
                                    <BadgeCard key={`modal-${badge.id}-${index}`} badge={badge} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default BadgeCollection;