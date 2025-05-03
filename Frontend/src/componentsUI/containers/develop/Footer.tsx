import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-cream text-darkblue text-xs px-4 sm:px-6 py-10 mt-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Grid de secciones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="font-bold mb-2">COLLECTO APP</h3>
            <ul className="space-y-1 text-darkblue/70">
              <li>Quiénes somos</li>
              <li>Trabaja con nosotros</li>
              <li>Prensa</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">DESCUBRE</h3>
            <ul className="space-y-1 text-darkblue/70">
              <li>Cómo funciona</li>
              <li>Marcas destacadas</li>
              <li>Universos Populares</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">AYUDA</h3>
            <ul className="space-y-1 text-darkblue/70">
              <li>Centro de ayuda</li>
              <li>Contacto</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">LEGAL</h3>
            <ul className="space-y-1 text-darkblue/70">
              <li>Términos y condiciones</li>
              <li>Aviso de privacidad</li>
              <li>Política de cookies</li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-lightgrey" />

        {/* Social icons + copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex gap-3 justify-center sm:justify-start">
            <a
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-full border border-darkblue transition hover:text-coral text-darkblue"
            >
              <FaFacebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="p-2 rounded-full border border-darkblue transition hover:text-coral text-darkblue"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              aria-label="Twitter / X"
              className="p-2 rounded-full border border-darkblue transition hover:text-coral text-darkblue"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
          </div>

          <p className="text-[0.7rem] text-darkblue/60 text-center sm:text-right">
            &copy; {new Date().getFullYear()} Collecto. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
