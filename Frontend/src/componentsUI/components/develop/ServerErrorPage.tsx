import ErrorPage from "../../containers/ErrorPage";

export default function ServerErrorPage() {
  return (
    <ErrorPage
      imageSrc="../errorImages/error-500.png"
      title="Algo salió mal"
      description="Se produjo un error interno en el servidor. Intenta de nuevo más tarde."
      buttonText="Ir al inicio"
    />
  );
}
