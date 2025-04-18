import { useState } from "react";
import Dropdown from "./Dropdown";
import Logo from "../../elements/Logo";
import { User } from "@/services/schemas/UserSchemas";

export default function UserMenu(user:{user:User}){
    
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    if (!user) return null; 

    return(
        <div className="px-2">
        <Dropdown
            onToggle={() => setIsMenuOpen((prev) => !prev)}
            label = {
                <div className="flex items-center gap-1 bg-cream focus:outline-none">
                <Logo 
                    src="https://github.com/mdo.png" 
                    alt="usuario"
                    width={40} 
                    rounded
                />
                    <svg
                        className={`w-3 h-3 text-darkblue transition-transform duration-200 ${
                            isMenuOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                        />
                    </svg>
                </div>
            }
        >
            <Dropdown.Item onClick={() => console.log("perfil")}>
                Mi perfil
            </Dropdown.Item>
            <Dropdown.Item onClick={() => console.log("Cerrar Sesion")}>
                Cerrar sesión
            </Dropdown.Item>
        </Dropdown>
        </div>
    )
}