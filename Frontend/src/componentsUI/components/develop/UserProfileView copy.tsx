import Icon from "@/componentsUI/elements/Icon";
import Button from "@/componentsUI/elements/Button";

interface UserProfileViewProps {
  form: {
    avatarUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    birthdate: string;
    gender: string | { _id: string; label: string; code: string };
  };
  setIsEditing: (value: boolean) => void;

}

export default function UserProfileView({ form, setIsEditing }: UserProfileViewProps) {
  return (
    <div className="space-y-4 text-sm text-darkblue">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
            <img 
              src={form.avatarUrl || "/assets/default-avatar-mas.jpg"}
              alt="avatar"
              className="w-16 h16 rounded-full object-cover border"
            />
          <div>
            <p className="text-gray-600 text-sm">Hola</p>
            <h2 className="text-xl font-bold text-darkblue uppercase">
              {form.firstName?.toUpperCase()}
            </h2>
          </div>
        </div>
        <Button variant="turquoise" onClick={() => setIsEditing(true)}>
          Editar
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Icon name="mail" size={18} />
          <div>
            <p className="text-sage text-xs">Correo electrónico</p>
            <p>{form.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="user" size={18} />
          <div>
            <p className="text-sage text-xs">Nombre</p>
            <p>{form.firstName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="user" size={18} />
          <div>
            <p className="text-sage text-xs">Apellidos</p>
            <p>{form.lastName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="calendar" size={18} />
          <div>
            <p className="text-sage text-xs">Fecha de nacimiento</p>
            <p>{form.birthdate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="user" size={18} />
          <div>
            <p className="text-sage text-xs">Género</p>
            <p>{typeof form.gender === 'object' ? form.gender.label : form.gender}</p>
          </div>
        </div>
      </div>
    </div>
  );
}