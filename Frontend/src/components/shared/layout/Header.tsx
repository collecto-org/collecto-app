import { RootState } from '../../../store/store'; 
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';



function Navbar() {
    const username = useSelector((state: RootState) => state.auth.user?.username); 
    
    return (
        <header>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Registro</NavLink>
            <NavLink to="/">Inicio</NavLink>
            {username ? <p>{username}</p> : <p>No hay usuario</p>}
        </header>
    );
}

export default Navbar