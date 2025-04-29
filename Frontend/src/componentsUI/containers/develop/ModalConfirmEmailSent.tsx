import AuthModalLayout from "@/componentsUI/layouts/AuthModalLayout";
import Button from "@/componentsUI/elements/Button";
import Logo from "@/componentsUI/elements/Logo";

interface ModalConfirmEmailSentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalConfirmEmailSent({ isOpen, onClose }: ModalConfirmEmailSentProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center top-22">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[600px] max-w-2xl relative">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-darkblue hover:text-coral text-xl font-bold"
        >
          ✕
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo Collecto */}
          <Logo
            src="/logos/collecto.png"
            alt="Logo Collecto"
            width={80}
            height={80}
            className="mb-2"
          />

          <h2 className="text-2xl font-bold text-darkblue">
            Enviamos un correo a la dirección ingresada
          </h2>

          <p className="text-base text-gray-600">
            ¿No recibiste el correo electrónico? Intenta lo siguiente:
          </p>

          <ul className="list-disc list-inside text-base text-gray-600 text-left space-y-2 px-8">
            <li>Verifica que no haya llegado a la carpeta de Correo no deseado.</li>
            <li>Revisa que la dirección de correo esté bien escrita.</li>
            <li>Comprueba que el dominio no esté bloqueado de tu correo.</li>
          </ul>

          {/* Imagen */}
          <img
            src="/assets/email-sent.jpg"
            alt="Correo enviado"
            className="h-32"
          />

          {/* Botón Cerrar */}
          <Button onClick={onClose} variant="primary" className="w-full">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
