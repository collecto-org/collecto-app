import { useSelector } from "react-redux"
import { selectUser } from "@/store/selectors/userSelectors"
import Button from "@/componentsUI/elements/Button"
import Title from "@/componentsUI/components/develop/Title"
import Icon from "@/componentsUI/elements/Icon"
import ModalDeleteAccount from "./ModalDeleteAccount"
import { useState } from "react"
import { useGetMyadvertsQuery, useGetMyFavAdvertsQuery } from "@/services/usersApi";

export default function DeleteAccount() {
    const user = useSelector(selectUser);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { data: advertsData } = useGetMyadvertsQuery({});
    const { data: favData } = useGetMyFavAdvertsQuery({});
  

    console.log("datos a renderizar en eliminacion de cuenta: ", user)
    return(
        <div className="max-w-2xl mx-auto space-y-6 text-sm">
            <Title headerLabel="Eliminar cuenta"/>
            <div className="space-y-2">
                <p> <strong>Nombre: </strong>{user.firstName} {user.lastName} </p>
                <p> <strong>Usuario: </strong>{user.username} </p>
                <p> <strong>Email: </strong>{user.email} </p>
            {/**    <p> <strong>Fecha de creación: </strong>{user.createdAt}</p> */}
                <p> <strong>Anuncios Publicados: </strong>{advertsData?.total || 0} </p>
                <p> <strong>Favoritos guardados: </strong>{favData?.total || 0} </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rpounded-md">
                <Icon name="alertTriangle" className="inline-block mr-2" size={16}/>
                <span> 
                    Esta sección eliminara tu Perfil, anuncions, chats, favoritos notificaciones y todos tus datos personales. Esta acción es <strong>irreversible</strong>
                </span>
            </div>

            <div>
                <Button variant="danger" className="w-full" onClick={() => setIsModalOpen(true)}>
                    Eliminar mi cuenta
                </Button>
            </div>
            {isModalOpen && (
                <ModalDeleteAccount
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    )

}