import { useState, useEffect, ChangeEvent, FormEvent } from "react"
import { useNavigate } from "react-router-dom";
import Button from "@/componentsUI/elements/Button";
import { useEditMeMutation } from "@/services/usersApi";
import LoadingSpinner from "@/componentsUI/elements/LoadingSpinner";
import MessageBanner  from "@/componentsUI/elements/MessageBanner"
import { formatUserToForm } from "@/hooks/formatUserToForm";
import { useGetGendersQuery } from "@/services/gendersApi";
import Modal from "@/componentsUI/components/develop/Modal"; 
import { useLogoutMutation } from "@/services/authApi"; 
import { useCheckEmailExistsMutation } from "@/services/usersApi";




interface UserProfileEditFormProps {
  form: {
    avatarUrl: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    bio: string;
    birthdate: string;
    gender: string;
    username: string;
    location: string,
  };
  setForm: (form: (prev: UserProfileEditFormProps["form"]) => UserProfileEditFormProps ["form"]) => void;
  setIsEditing: (editing: boolean) => void; 
  refetch: () => void;
  originalUser : any;
}

export default function UserProfileEditForm({ form, setForm, setIsEditing, refetch, originalUser   }: UserProfileEditFormProps) {
  const [images, setImages] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false)
  const [successMessage, setSuccessMessage ] = useState<string | null >(null)
  const [errorMessage, setErrorMessage ] = useState<string | null >(null)
  const [emailChanged, setEmailChanged] = useState(false)
  const [ emailValid, setEmailValid ] = useState(false)
  const [ phoneValid, setPhoneValid ] = useState(false)
  const { data: genders = [], isLoading: isLoadingGenders } = useGetGendersQuery();
  const [isAdult, setIsAdult] = useState(true);
  const [showEmailChangeModal, setShowEmailChangeModal] = useState(false);
  const [checkEmailExists, { isLoading: isCheckingEmail }] = useCheckEmailExistsMutation();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  
  console.log("datos recibidos en edit profile: ", originalUser)
  useEffect(() => {
    if (!originalUser) return;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
  
    setEmailValid(emailRegex.test(originalUser.email));
    setPhoneValid(phoneRegex.test(originalUser.phone || ""));
  }, [originalUser]);
  

  const isModified = () => {
    return (
      form.firstName !== originalUser.firstName ||
      form.lastName !== originalUser.lastName ||
      form.email !== originalUser.email ||
      form.phone !== (originalUser.phone || "") ||
      form.bio !== (originalUser.bio || "") ||
      form.birthdate !== (originalUser.dateOfBirth ? new Date(originalUser.dateOfBirth).toISOString().slice(0, 10) : "") ||
      form.gender !== (originalUser.gender || "") ||
      form.avatarUrl !== (originalUser.avatarUrl || "") ||
      form.location !== (originalUser.location || "")
    );
  };

  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));

    if(name == "email"){
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailValid(emailRegex.test(value));
      setEmailChanged(value !== originalUser.email);
    }

    if (name === "phone") {
      const phoneRegex = /^[0-9]{10}$/;
      setPhoneValid(phoneRegex.test(value));
    }
  };



  const handleBirthdateBlur = () => {
    const inputDate = new Date(form.birthdate);
    const today = new Date();
    const year = inputDate.getFullYear();
  
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
  
    const isValidYear = year >= 1900 && year <= today.getFullYear();
    const isValidAdult = inputDate <= eighteenYearsAgo;
  
    setIsAdult(isValidYear && isValidAdult);
  
    if (!isValidYear || !isValidAdult) {
      setForm(prev => ({ ...prev, birthdate: "" }));
    }
  };
  
  const handleEmailBlur = async () => {
    if (!form.email) return;

    if (form.email.toLowerCase() === originalUser.email.toLowerCase()) {
      setEmailValid(true);
      setErrorMessage(null);
      return;
    }
    
  
    try {
      const response = await checkEmailExists({ email: form.email }).unwrap();
  
      if (response.exists) {
        setEmailValid(false);
        setErrorMessage("El correo ya está registrado en la plataforma.");
      } else {
        setEmailValid(true);
        setErrorMessage(null);
      }
    } catch (error) {
      console.error("Error al validar el email:", error);
      setErrorMessage("Hubo un problema al validar el correo. Intenta más tarde.");
    }
  };
  
  

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > 6) {
      alert("Solo puedes subir hasta 6 imágenes");
      return;
    }
    const newImages = [...images, ...selectedFiles];
    setImages(newImages);
  
    if (newImages.length > 0) {
      const previewUrl = URL.createObjectURL(newImages[0]);
      setForm((prev: any) => ({
        ...prev,
        avatarUrl: previewUrl,
      }));
    }
  };
  

  
   const [editme] = useEditMeMutation();

   const handleSubmit = async ( e: FormEvent) =>{
    e.preventDefault()
    setIsSaving(true)
    console.log("entro a handlesubmit")
    console.log ("datos a enviar: ", form)
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("firstName", form.firstName); 
    formData.append("lastName", form.lastName);
    formData.append("phone", form.phone);
    formData.append("bio", form.bio);
    formData.append("dateOfBirth", form.birthdate);
    formData.append("gender", typeof form.gender === 'object' ? (form.gender as any)._id : form.gender);
    formData.append("location", form.location);

    if (images.length > 0) {  
      // El usuario seleccionó nuevas imágenes
      images.forEach((img) => formData.append("image", img));
    } else {
      // No seleccionó nuevas imágenes
      const avatarUrlToFetch = form.avatarUrl || "/assets/default-avatar-mas.jpg";
      const response = await fetch(avatarUrlToFetch);
      const blob = await response.blob();
      const file = new File([blob], "avatar.jpg", { type: blob.type });
      formData.append("image", file);
    }
    

    try{
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

    console.log("datos a enviar API 9999: ", formData)
    const updatedUser  = await editme({ formData: formData }).unwrap();
    setForm(prev => ({
      ...prev,
      ...updatedUser,
    }));

    if (emailChanged) {
      setShowEmailChangeModal(true); 
      return; 
    }

    refetch ()
    setSuccessMessage("perfil Actualizado correctamente")
    setTimeout(() => {
      setSuccessMessage(null)
    }, 4000);
    
    setIsEditing(false);
    console.log("avtar en images: ", images)

    } catch (error){
      console.error("Error al actualizar el perfil: ", error)
      setErrorMessage("Hubo un error al actualizar el perfil. Intente de nuevo")
      setTimeout(() => setErrorMessage(null), 4000)
    } finally{
      setIsSaving(false)
    }
   }

   
  if(isSaving) return  <LoadingSpinner message="Actualizando perfil, por favor espera ..."/>

    console.log("phonevalid :", phoneValid)
    console.log("email valid :", emailValid)
    console.log("email cambiado : ", emailChanged)



  return (
        <>
        {successMessage && <MessageBanner type="success" text={successMessage} />}
        {errorMessage && <MessageBanner type="error" text={errorMessage} />} 
        {showEmailChangeModal && (
          <Modal isOpen={showEmailChangeModal} onClose={() => {
            setShowEmailChangeModal(false);
            logout(); 
            navigate("/");
          }}>
            <div className="text-center">
              <h2 className="text-xl font-bold mb-4">Verificación de correo requerida</h2>
              <p className="text-gray-600 mb-6">
                Has cambiado tu correo electrónico. Debes verificar tu nuevo correo para poder iniciar sesión nuevamente.
              </p>
              <button
                onClick={() => {
                  setShowEmailChangeModal(false);
                  logout();
                  navigate("/");
                }}
                className="bg-turquoise text-white px-4 py-2 rounded"
              >
                Entendido
              </button>
            </div>
          </Modal>
        )}

    <form className="space-y-6 text-sm text-darkblue" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold text-darkblue">Editar Perfil</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="flex items-center gap-4 w-full">
          <img
            src={form.avatarUrl || "/assets/default-avatar-mas.jpg"}
            alt="avatar preview"
            className="w-16 h-16 rounded-full object-cover border"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="text-xs"
          />
          <div className="flex-1">
            <label className="block mb-1 text-black">Nombre de usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              disabled
              className="border px-3 py-2 rounded bg-gray-100 text-gray-500 w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sage">Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleEmailBlur}
            className={`w-full border px-3 py-2 rounded ${emailValid?"" : "border-red-500"}` }
          />
          {isCheckingEmail && (
            <p className="text-xs text-gray-500 mt-1">Validando correo...</p>
          )}
          {!emailValid && (
            <p className="text-red-500 text-xs mt-1">Por favor ingresa un correo valido</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sage">Nombre</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sage">Apellidos</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sage">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Ej. 5527730937"
            className={`w-full border px-3 py-2 rounded ${phoneValid? "": "border-red-500"}`}
          />
          { !phoneValid && (
            <p  className="text-red-500 text-xs mt-1">El número debe tener exactamente 10 dígitos</p>
          )}
        </div>

        <div>
            <label className="block mb-1 text-sage">Fecha de nacimiento</label>
            <input
              type="date"
              name="birthdate"
              value={form.birthdate}
              onChange={handleChange}
              onBlur={handleBirthdateBlur}
              className={`w-full border px-3 py-2 rounded ${isAdult ? "" : "border-red-500"}`}
            />
            {!isAdult && (
              <p className="text-red-500 text-xs mt-1">El año debe ser correcto y debes ser mayor de 18 años</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sage">Genero</label>
            <select
              name="gender"
              value={typeof form.gender === 'object' ? (form.gender as any)._id : form.gender}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              
              <option value="">Seleccione género</option>
              {genders.map((gender) => (
                <option key={gender._id} value={gender._id}>
                  {gender.label}
                </option>
              ))}
            </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 text-sage">Descripción personal</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
            placeholder="Escribe algo sobre ti"
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>
      
      {emailChanged && emailValid && (
          <MessageBanner type="info" text="Al cambiar tu email, deberas verificar el nuevo correo para completar el cambio." />
        )}
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => {
              setForm(() => formatUserToForm(originalUser));
              setIsEditing(false);
        }}>
          Cancelar
        </Button>
        <Button 
          variant="turquoise" 
          type="submit" 
          disabled={
            !emailValid ||
            !phoneValid ||
            (!isModified() && !emailChanged)
          }>
          Guardar cambios
        </Button>
      </div>
    </form>
    </>
  );
}