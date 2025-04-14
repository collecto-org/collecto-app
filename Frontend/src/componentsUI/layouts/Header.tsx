import { RootState } from '../../store/store'; 
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectuser } from '../../store/selectors/userSelectors';



function Header() {
    const user = useSelector((state: RootState) => selectuser(state)); 
    
    return (
        <header>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Registro</NavLink>
            <NavLink to="/">Inicio</NavLink>
            {user.username? <p>{user.username}</p> : <p>No hay usuario</p>}
        </header>
    );
}

export default Header