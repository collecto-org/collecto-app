import React from "react";
import Button from "../../elements/Button";
import { useNavigate } from "react-router-dom";

export default function NavActions(){
    const navigate = useNavigate();
    return(
        <div className="flex gap-2">
            <Button variant="primary" onClick={() => navigate("/register")}>Crea tu cuenta</Button>
            <Button variant="outline" onClick={() => navigate("/Login")}>haz Login</Button>
        </div>
    )
}