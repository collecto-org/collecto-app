import React from "react";

interface LogoProps {
    src: string;  // ruta de la imagen
    alt:string; // texto alternativo de  la imagen
    size?: number; // tamaño en PX
    rounded?: boolean // bandera apra saber si se redondea
}
export default function Logo({src, alt, size = 48, rounded = false}:LogoProps){
    return(
        <img 
        src={src} 
        alt={alt}
        width={size}
        height={size}
        className={`${rounded ? 'rounded-full': ''} object-contain`}
        />
    )
}