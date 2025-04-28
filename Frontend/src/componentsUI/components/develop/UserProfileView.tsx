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
    phone: string;
    location: string;
    bio: string;
    username: string;
  };
  setIsEditing: (value: boolean) => void;
}

export default function UserProfileView({ form, setIsEditing }: UserProfileViewProps) {
  return (
    <div className="space-y-4 text-sm text-darkblue">
      {/* Sección de avatar y botón editar */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img 
            src={form.avatarUrl || "/assets/default-avatar-mas.jpg"}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover border"
          />
          <div>
            <p className="text-gray-600 text-xs">Hola</p>
            <h2 className="text-xl font-bold text-darkblue uppercase">
              {form.firstName?.toUpperCase()} {form.lastName?.toUpperCase()}
            </h2>
            <p className="text-xs text-gray-400">{form.username}</p>
          </div>
        </div>
        <Button variant="turquoise" onClick={() => setIsEditing(true)}>
          Editar
        </Button>
      </div>

      {/* Sección de información del usuario */}
      <div className="space-y-3">
        <UserInfoItem icon="mail" label="Correo electrónico" value={form.email} />
        <UserInfoItem icon="user" label="Nombre" value={form.firstName} />
        <UserInfoItem icon="user" label="Apellidos" value={form.lastName} />
        <UserInfoItem icon="calendar" label="Fecha de nacimiento" value={form.birthdate} />
        <UserInfoItem icon="user" label="Género" value={typeof form.gender === 'object' ? form.gender.label : form.gender} />
        <UserInfoItem icon="phone" label="Teléfono" value={form.phone} />
        <UserInfoItem icon="mapPin" label="Ubicación" value={form.location || "No especificada"} />
        <UserInfoItem icon="info" label="Descripción personal" value={form.bio || "No proporcionada"} />
      </div>
    </div>
  );
}

interface UserInfoItemProps {
  icon: string;
  label: string;
  value: string;
}

function UserInfoItem({ icon, label, value }: UserInfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon name={icon} size={18} />
      <div>
        <p className="text-sage text-xs">{label}</p>
        <p className="break-words">{value}</p>
      </div>
    </div>
  );
}
