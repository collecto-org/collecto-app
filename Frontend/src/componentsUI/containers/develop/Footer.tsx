import React from "react"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

export default function Footer() {
    return (
        <footer className="bg-cream text-darkblue text-[0.7rem] px-6 py-10 mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* sección 1 */}
                <div>
                    <h3 className="font-semibold mb-2">Collecto</h3>
                    <ul className="space-y-1 text-gray-600"> 
                        <li>Quienes somos</li>
                        <li>Trabaja con nosotros</li>
                        <li>Prensa</li>
                    </ul>
                </div>
                
                {/* sección 2 */}
                <div>
                    <h3 className="font-semibold mb-2">Descrubre</h3>
                    <ul className="space-y-1 text-gray-600"> 
                        <li>Cómo funciona</li>
                        <li>Marcas destacadas</li>
                        <li>Universos Populares</li>
                    </ul>
                </div>
                
                {/* sección 3 */}
                <div>
                    <h3 className="font-semibold mb-2">Ayuda</h3>
                    <ul className="space-y-1 text-gray-600"> 
                        <li>Centro de ayuda</li>
                        <li>Contacto</li>
                    </ul>
                </div>

                {/* sección 4 */}
                <div>
                    <h3 className="font-semibold mb-2">Legal</h3>
                    <ul className="space-y-1 text-gray-600"> 
                        <li>Términos y condiciones</li>
                        <li>Aviso de privacidad</li>
                        <li>Política de cookies</li>
                    </ul>
                </div>
                
                {/* Separador */}
                <div className="border-t border-lightgray my-6"></div>

                {/* Social y Copiright */}
                <div className="flex flex-col md:flex-row items-center justify-between gasp-4">
                  <div className="flex gap-4 text-gray-600 text-xl">
                    <a href="#" className="hover:text-coral">
                      <FaFacebook/>
                    </a>
                    <a href="#" className="hover:text-coral">
                      <FaInstagram/>
                    </a>
                    <a href="#" className="hover:text-coral">
                      <FaTwitter/>
                    </a>
                    <p className="text-gray-600 text-[0.7rem]">
                      &copy; 2025 Collecto. Todos los derechos reservados.
                     </p>
                  </div>
                </div>
            </div>
        </footer>
    )
}