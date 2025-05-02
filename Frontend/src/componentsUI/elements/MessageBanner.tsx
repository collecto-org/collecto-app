
interface MessageProps {
    type: "success" | "error" | "info";
    text:string;
}

export default function MessageBanner({ type, text }: MessageProps){
    const baseClass = "p-4 rounded text-sm text-center font-semibold";

    const typeClasses = {
        success: "bg-green-100 text-green-700",
        error: "bg-red-100 text-red-700",
        info: "bg-blue-100 text-blue-700",
    }

    return (
        <div className={`${baseClass}  ${typeClasses[type]}`}>
            {text}
        </div>
    )
}