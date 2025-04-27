// src/componentsUI/pages/UnauthorizedPage.tsx

import ErrorPage from "../../containers/ErrorPage";

export default function UnauthorizedPage() {
  return (
    <ErrorPage
      imageSrc="../errorImages/error-401.png"
      title="Acceso no autorizado"
      description="Debes iniciar sesión para acceder a esta sección."
      buttonText="Iniciar sesión"
      buttonAction={() => {
        window.location.href = "/login";
      }}
    />
  );
}
