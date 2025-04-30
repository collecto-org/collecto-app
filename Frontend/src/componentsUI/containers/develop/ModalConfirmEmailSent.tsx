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
    <AuthModalLayout onClose={onClose}  maxWidth="max-w-xl" maxHeight="max-h-[90vh]">
    <div className="flex flex-col items-center text-center h-full justify-between ">
        <div className="flex flex-col items-center text-center space-y-4  ">
          {/* Logo Collecto */}
          <Logo
            src="/logos/collecto.png"
            alt="Logo Collecto"
            width={80}
            height={80}
            className="mb-2"
          />

          <h2 className="text-sm font-bold text-darkblue ">
            Enviamos un correo a la dirección ingresada
          </h2>

          <p className="text-base text-gray-600">
            ¿No recibiste el correo electrónico? Intenta lo siguiente:
          </p>

          <ul className="list-disc list-inside text-gray-600 text-left space-y-2 px-8 text-sm">
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
    </AuthModalLayout>    
  );
}
