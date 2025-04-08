import { ReactNode } from "react";
import Navbar from "./Header";

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {

    
    return (
		<div className="h-screen  bg-sky-100">
			<Navbar/>
			<main className=" bg-sky-100">{children}</main>
			
		</div>
	);
}