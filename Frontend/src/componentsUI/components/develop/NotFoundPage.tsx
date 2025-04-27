// src/componentsUI/pages/NotFoundPage.tsx

import ErrorPage from "../../containers/ErrorPage";

export default function NotFoundPage() {
  return (
    <ErrorPage
      imageSrc="../errorImages/error-404.png"
      title="Página no encontrada"
      description="Lo sentimos, no pudimos encontrar la página que estás buscando."
      buttonText="Volver al inicio"
    />
  );
}
