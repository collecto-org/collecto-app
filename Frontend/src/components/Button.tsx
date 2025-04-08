type ButtonProps = {
    children:string;
    className?:string
}

export default function Button({children, className}:ButtonProps){
    return <button className={`${className}`}>{children}</button>
}