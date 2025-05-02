import InputField from "../InputField";
import Icon from "@/componentsUI/elements/Icon";
import { useState } from "react"

interface PasswordFieldWithToggleProps {
    label: string;
    name:string;
    register:any;
    error?: string;
}

export default function PasswordFieldWithToggle({
    label,
    name,
    register,
    error
}: PasswordFieldWithToggleProps){
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <InputField
            label={label}
            name={name}
            register={register}
            type={show? "text" : "password"}
            error={error}
            props={{ placeholder: '********', className: 'pr-8' }}
        />
        <Icon
            name={show ? "closeEye" : "openEye"}
            size={16}
            onClick={() => setShow(!show)}
            className="absolute right-3 top-[38px] cursor-pointer text-sage"
        />
        </div>
    )
}