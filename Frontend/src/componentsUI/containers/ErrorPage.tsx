import { useNavigate } from "react-router-dom";

interface ErrorPageProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonAction?: () => void;
}

export default function ErrorPage({
  imageSrc,
  title,
  description,
  buttonText,
  buttonAction,
}: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white p-6 text-center">
      {/* Imagen de error */}
      <img
        src={imageSrc}
        alt="Error"
        className="w-64 md:w-80 lg:w-96 mb-6"
        loading="lazy"
      />

      {/* Título */}
      <h1 className="text-2xl md:text-4xl font-bold text-darkblue mb-4">
        {title}
      </h1>

      {/* Descripción */}
      <p className="text-sm md:text-base text-gray-600 mb-6">{description}</p>

      {/* Botón opcional */}
      {buttonText && (
        <button
          onClick={buttonAction || (() => navigate("/"))}
          className="px-6 py-2 bg-coral text-white rounded-full text-sm hover:bg-darkblue transition"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
