import { ExternalLink, Award, Calendar, CheckCircle2 } from 'lucide-react';

const HackerrankCertificateCard = ({ data, className = "" }) => {
    if (!data) return null;

    const { certificate, certificate_image, completed_at, kind, score, test_unique_id } = data.attributes;

    const formattedDate = new Date(completed_at).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
    });

    return (
        <div className={`bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden flex flex-col h-full group relative ${className}`}>
            {/* Certificate Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 shrink-0 border-b border-gray-100">
                <img
                    src={certificate_image}
                    alt={`${certificate?.label} Certificate`}
                    className="w-full h-full object-cover"
                />

                {/* Hover Description Overlay */}
                <div className="absolute inset-0 bg-emerald-900/90 flex flex-col justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-[11px] font-medium leading-relaxed italic text-center">
                        "{certificate?.description}"
                    </p>
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-emerald-100 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span className="text-[9px] font-bold text-gray-700 capitalize">{kind}</span>
                </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
                {/* Title and Score */}
                <div className="flex justify-between items-center gap-3 mb-3">
                    <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-800 leading-tight">
                            {certificate?.label} ({certificate?.level})
                        </h3>
                    </div>
                    <div className="bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 shrink-0">
                        <p className="text-emerald-700 text-[10px] font-black">{score}</p>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[11px] font-bold text-gray-600">{formattedDate}</span>
                    </div>

                    <a
                        href={certificate_image || `https://www.hackerrank.com/certificates/${test_unique_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        verify
                        <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HackerrankCertificateCard;
