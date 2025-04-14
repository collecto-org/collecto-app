import LoginForm from "../components/modules/LoginForm"
import RegisterForm from "../components/modules/RegisterForm"
import { Routes, Route} from 'react-router-dom';
import Navbar from "../components/shared/layout/Header";
import ConfirmEmail from "./ConfirmEmail";
import RecoverPassForm from "../components/modules/RecoverPassForm";
import ChangePassPage from "./ChangePassPage";


function App() { 
  return (
    <Routes>      
      <Route path="/" element={"Aquí iria el index"}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/recover" element={<RecoverPassForm/>}/>
      <Route path="/recover/:token" element={<ChangePassPage/>}/>

      <Route path="/verify-email/:token" element={<ConfirmEmail />} />
      </Routes>
  )
}

export default App
