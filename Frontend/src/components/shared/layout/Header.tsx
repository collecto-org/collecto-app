import { NavLink } from 'react-router-dom';



function Navbar(){
    return (
        <header>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">
                Registro
            </NavLink>
        </header>
    );
}

export default Navbar