
import Icon from "../../elements/Icon"
import NotificationBadge from "../../elements/NotificationBadge"
import { User } from "@/services/schemas/UserSchemas";

export default function NavIcons(user:{user:User}) {
    if(!user){
        return null
    }
  return (
    <div className="flex items-center gap-2 text-darkblue text-sm px-5">
        <div className="relative">
            <Icon name="mail" size={20}  className="hover:text-coral transition-colors" 
            onClick={() => alert("revisar correo")}/>
            <NotificationBadge count={105} position="top-left" variant="success" />
        </div>
        
        <div className="relative">
            <Icon name="bell" size={20}  className="hover:text-coral transition-colors"
            onClick={() => alert("revisar notificaciones")} />
            <NotificationBadge count={3} position="top-right" variant="warning" />
        </div>

        <div className="relative">
            <Icon name="heart" size={20} className="hover:text-coral transition-colors"
            onClick={() => alert("revisar favoritos")} />
            <NotificationBadge count={43} position="bottom-left" variant="default" />
        </div>

        <div className="relative">
            <Icon name="chat"  size={20} className="hover:text-coral transition-colors text-darkblue"  
            onClick={() => alert("Iniciando chat")}
            />
            <NotificationBadge count={10} position="bottom-right" variant="danger" />
        </div>

      

    </div>
  );
}
