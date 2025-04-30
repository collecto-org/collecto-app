import { ReactNode  } from "react";

interface AuthModalLayoutProps {
    children: ReactNode;
    onClose: () => void;
    maxWidth?: string;
    maxHeight?: string;
  }

export default function AuthModalLayout ({ children, onClose, maxWidth, maxHeight } : AuthModalLayoutProps){
    return(
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-start pt-20">
            <div className={`bg-white rounded-lg shadow-lg p-8 ${maxWidth} w-full ${maxHeight} overflow-auto relative`}>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-darkblue hover:text-coral text-xl font-bold"
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    )
}
