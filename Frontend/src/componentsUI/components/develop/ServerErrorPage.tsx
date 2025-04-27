import { useNavigate } from "react-router-dom";
import ErrorPage from "../../containers/ErrorPage";

type ServerErrorPage = {
  handleReset? : () =>void
}
export default function ServerErrorPage({handleReset}:ServerErrorPage) {

  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (handleReset) handleReset();
    navigate("/"); 
  };
  
  return (
    <ErrorPage
      imageSrc="../errorImages/error-500.png"
      title="Algo salió mal"
      description="Se produjo un error interno en el servidor. Intenta de nuevo más tarde."
      buttonText="Ir al inicio"
      buttonAction={handleButtonClick}
    />
  );
}
