import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/componentsUI/elements/Button";
import LoadingSpinner from "@/componentsUI/elements/LoadingSpinner";
import MessageBanner from "@/componentsUI/elements/MessageBanner";
import Modal from "@/componentsUI/components/develop/Modal";
import { useEditMeMutation, useCheckEmailExistsMutation } from "@/services/usersApi";
import { useLogoutMutation } from "@/services/authApi";
import { useGetGendersQuery } from "@/services/gendersApi";
import { formatUserToForm } from "@/hooks/formatUserToForm";
import ProfileFormFields from "@/componentsUI/components/develop/ProfileFormFields";

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
    location: string;
  };
  setForm: (form: (prev: UserProfileEditFormProps["form"]) => UserProfileEditFormProps["form"]) => void;
  setIsEditing: (editing: boolean) => void;
  refetch: () => void;
  originalUser: any;
}

export default function UserProfileEditForm({ form, setForm, setIsEditing, refetch, originalUser }: UserProfileEditFormProps) {
  const navigate = useNavigate();

  const [editMe] = useEditMeMutation();
  const [logout] = useLogoutMutation();
  const { data: genders = [] } = useGetGendersQuery();
  const [checkEmailExists, { isLoading: isCheckingEmail }] = useCheckEmailExistsMutation();

  const [images, setImages] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showEmailChangeModal, setShowEmailChangeModal] = useState(false);

  const [emailChanged, setEmailChanged] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [isAdult, setIsAdult] = useState(true);

  useEffect(() => {
    if (!originalUser) return;
    validateEmail(originalUser.email);
    validatePhone(originalUser.phone || "");
  }, [originalUser]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(regex.test(email));
  };

  const validatePhone = (phone: string) => {
    const regex = /^[0-9]{10}$/;
    setPhoneValid(regex.test(phone));
  };

  const isModified = () => (
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === "email") {
      validateEmail(value);
      setEmailChanged(value !== originalUser.email);
    }

    if (name === "phone") {
      validatePhone(value);
    }
  };

  const handleBirthdateBlur = () => {
    const inputDate = new Date(form.birthdate);
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    const valid = inputDate.getFullYear() >= 1900 && inputDate <= today && inputDate <= eighteenYearsAgo;
    setIsAdult(valid);
    if (!valid) setForm(prev => ({ ...prev, birthdate: "" }));
  };

  const handleEmailBlur = async () => {
    if (!form.email) return;

    if (form.email.toLowerCase() === originalUser.email.toLowerCase()) {
      setEmailValid(true);
      setErrorMessage(null);
      return;
    }

    try {
      const { exists } = await checkEmailExists({ email: form.email }).unwrap();
      setEmailValid(!exists);
      setErrorMessage(exists ? "El correo ya está registrado en la plataforma." : null);
    } catch {
      setErrorMessage("Hubo un problema al validar el correo.");
    }
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    if (images.length + selectedFiles.length > 6) {
      alert("Solo puedes subir hasta 6 imágenes");
      return;
    }
    setImages([...images, ...selectedFiles]);
    if (selectedFiles.length > 0) {
      const previewUrl = URL.createObjectURL(selectedFiles[0]);
      setForm(prev => ({ ...prev, avatarUrl: previewUrl }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "gender") {
          formData.append(key, typeof value === 'object' ? (value as any)._id : value);
        } else {
          formData.append(key, value);
        }
      });

      if (images.length > 0) {
        images.forEach(img => formData.append("image", img));
      } else {
        const response = await fetch(form.avatarUrl || "/assets/default-avatar-mas.jpg");
        const blob = await response.blob();
        formData.append("image", new File([blob], "avatar.jpg", { type: blob.type }));
      }

      const updatedUser = await editMe({ formData }).unwrap();
      setForm(prev => ({ ...prev, ...updatedUser }));

      if (emailChanged) {
        setShowEmailChangeModal(true);
        return;
      }

      refetch();
      setSuccessMessage("Perfil actualizado correctamente");
      setTimeout(() => setSuccessMessage(null), 4000);
      setIsEditing(false);
    } catch {
      setErrorMessage("Hubo un error al actualizar el perfil.");
      setTimeout(() => setErrorMessage(null), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  if (isSaving) return <LoadingSpinner message="Actualizando perfil, por favor espera..." />;

  return (
    <>
      {successMessage && <MessageBanner type="success" text={successMessage} />}
      {errorMessage && <MessageBanner type="error" text={errorMessage} />}

      {showEmailChangeModal && (
        <Modal isOpen={showEmailChangeModal} onClose={() => { setShowEmailChangeModal(false); logout(); navigate("/"); }}>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Verificación de correo requerida</h2>
            <p className="text-gray-600 mb-6">
              Has cambiado tu correo electrónico. Debes verificar tu nuevo correo para poder iniciar sesión nuevamente.
            </p>
            <Button variant="turquoise" onClick={() => { setShowEmailChangeModal(false); logout(); navigate("/"); }}>
              Entendido
            </Button>
          </div>
        </Modal>
      )}

      <form className="space-y-6 text-sm text-darkblue" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-darkblue">Editar Perfil</h2>
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-4">
           
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <img
                  src={form.avatarUrl || "/assets/default-avatar-mas.jpg"}
                  alt="avatar preview"
                  className="w-24 h-24 rounded-full object-cover border"
                />
              </div>

              <label htmlFor="avatar-upload" className="mt-2 cursor-pointer bg-turquoise hover:bg-turquoise-dark text-white text-xs font-semibold py-2 px-4 rounded text-center">
                Seleccionar nueva imagen
              </label>

              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

           
            <div className="flex flex-col items-end flex-1 justify-center">
              <div className="w-60">
                <label className="block mb-1 text-sage text-center">Nombre de usuario</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  disabled
                  className="border px-3 py-2 rounded bg-gray-100 text-gray-500 w-full text-center"
                />
              </div>
            </div>
          </div>

        <ProfileFormFields
          form={form}
          handleChange={handleChange}
          handleEmailBlur={handleEmailBlur}
          handleBirthdateBlur={handleBirthdateBlur}
          emailValid={emailValid}
          phoneValid={phoneValid}
          isCheckingEmail={isCheckingEmail}
          isAdult={isAdult}
          genders={genders}
        />

        {emailChanged && emailValid && (
          <MessageBanner type="info" text="Al cambiar tu email, deberás verificarlo." />
        )}

        <div className="flex justify-end gap-4">
          <Button variant="turquoise" onClick={() => { setForm(() => formatUserToForm(originalUser)); setIsEditing(false); }}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={!emailValid || !phoneValid || (!isModified() && !emailChanged)}>
            Guardar cambios
          </Button>
        </div>
      </form>
    </>
  );
}
