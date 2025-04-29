import { ReactNode  } from "react";

interface AuthModalLayoutProps {
    children: ReactNode;
    onClose: () => void;
  }

export default function AuthModalLayout ({ children, onClose } : AuthModalLayoutProps){
    return(
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
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
