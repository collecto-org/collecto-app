import React from "react";
import { Link, NavLink } from "react-router-dom";
import MaterialButton from "../../components/MaterialButton";
import Button from "../../elements/Button";
import { useNavigate } from "react-router-dom";

export default function NavActions(){
    const navigate = useNavigate();
    return(
        <div className="flex gap-2">
            {/* LOGO + SEARCH 
            <Button variant="primary" onClick={() => navigate("/register")}>Crea tu cuenta</Button>
            <Button variant="outline" onClick={() => navigate("/Login")}>haz Login</Button>
            */}
            <NavLink to="/register">
                <MaterialButton variant="filled" className="text-sm px-4 py-1.5">
                Crea tu cuenta
                </MaterialButton>
            </NavLink>
            <NavLink to="/login">
                <MaterialButton
                variant="outlined"
                className="text-sm px-4 py-1.5"
                >
                Haz login
                </MaterialButton>
            </NavLink>
        </div>
    )
}