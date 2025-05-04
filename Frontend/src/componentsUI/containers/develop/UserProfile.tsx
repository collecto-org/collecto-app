import { useState, useEffect } from "react";
import  { useGetMeQuery } from "@/services/usersApi"
import UserProfileView from "@/componentsUI/components/develop/UserProfileView";
import UserProfileEditForm from "@/componentsUI/components/develop/UserProfileEdit";
import LoadingSpinner from "@/componentsUI/elements/LoadingSpinner";
import { formatUserToForm } from "@/hooks/formatUserToForm";


export default function UserProfile() {
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


      useEffect(() => {
        if (user) {
          setForm(formatUserToForm(user));
        }
      }, [user]);
      
    if(isLoading) return <LoadingSpinner/>
    if(isError) return <p>Error al cargar el perfil() {
        
    }</p>
    return (
        <div className="p-1 space-y-4">
                {isEditing ? (
                    <UserProfileEditForm
                        form={form}
                        setForm={setForm}
                        setIsEditing={setIsEditing}
                        refetch ={refetch}
                        originalUser={user}
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