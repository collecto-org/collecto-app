import { useState, useEffect } from "react";
import  { useGetMeQuery } from "@/services/usersApi"
import UserProfileView from "@/componentsUI/components/develop/UserProfileView";
import UserProfileEditForm from "@/componentsUI/components/develop/UserProfileEdit";


export default function EditUserProfileForm() {
    const { data: user, isLoading, isError, refetch  } = useGetMeQuery({})
    const [isEditing, setIsEditing] = useState(false)
    const [form, setForm ] = useState({
        username:"",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        bio: "",
        birthdate: "",
        gender: "",
        //avatar: "https://github.com/mdo.png",
        avatarUrl:"",
        location:"",
    });

    useEffect(() =>{
        if(user){
            setForm({ 
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone || "",
                bio: user.bio || "",
                gender: user.gender || "",
                birthdate: user.dateOfBirth ? new Date (user.dateOfBirth).toISOString().slice(0,10): "",
                avatarUrl:user.avatarUrl || "",
                location : user.location || "",
            })
        }
    },[user])
    console.log("datos a renderizar: ", user)
    if (isLoading) {
        return (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-sm animate-pulse">Cargando perfil...</p>
          </div>
        );
      }
    if(isError) return <p>Error al cargar el perfil() {
        
    }</p>
    return (
        <div className="p-1 space-y-4">
                {isEditing ? (
                    <UserProfileEditForm
                        form={form}
                        setForm={setForm}
                        setIsEditing={setIsEditing}
                       
                    />
                ) : (
                    <UserProfileView
                        form={form}
                        setIsEditing={setIsEditing}
                    />
                )
            }
        </div>
    )
    
}

