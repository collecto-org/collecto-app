import { ReactNode } from "react";
//import Header from "./Header";
import Navbar from "../containers/Navbar";

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {

    
    return (
		<div>
			<Navbar/>
			<main>{children}</main>
			
		</div>
	);
}