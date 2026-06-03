import { CheckCircle } from "lucide-react";

interface Props {
    visible: boolean;
    title: string;
    subtitle?: string;
}

const Warning = ({ visible, title, subtitle }: Props) => {
    return (
        <div
            className={`
                fixed bottom-6 right-6 z-50
                flex items-center gap-3
                rounded-xl bg-white px-4 py-3
                shadow-xl border border-gray-200
                transition-all duration-300
                ${
                visible
                    ? "opacity-100 translate-y-0"
                    : "pointer-events-none opacity-0 translate-y-4"
            }
            `}
        >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle size={20} className="text-green-600" />
            </div>

            <div>
                <p className="text-sm font-semibold text-gray-900">
                    {title}
                </p>

                {subtitle && (
                    <p className="text-xs text-gray-500">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Warning;