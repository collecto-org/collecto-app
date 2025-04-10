import { Link } from "react-router-dom";

type ButtonProps = {
    children:string;
    className?:string
    to?:string
    tipe?:"primary-button" | "secondary-button"
    variant?:"login-button" | "signup-button"
}

export default function Button({children,variant, to,className,tipe}:ButtonProps){

    if (to){
        return(
        <Link to={to}>
        <Button className={`${tipe} ${className} ${variant}`} >Registrarme
        </Button> </Link>)
    }else{
        return <button className={`${tipe} ${className} ${variant} `}>{children}</button>
    }
}