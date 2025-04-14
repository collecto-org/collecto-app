import { NavLink } from 'react-router-dom';
import Navbar from '../../containers/navbar'




function Header(){
    return (
        <header>
        {/*    <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">
                Registro
            </NavLink> */}
            <Navbar />
        </header>
    );
}

export default Header