import LoginForm from "./authPages/LoginForm";

import { Routes, Route} from 'react-router-dom';
import RegisterForm from "./authPages/RegisterForm";
import RecoverPassForm from "./authPages/RecoverPassForm";
import ChangePassPage from "./authPages/ChangePassPage";
import ConfirmEmail from "./authPages/ConfirmEmail";
import Index from "../styles";



function App() { 
  return (
    <Routes>      
      <Route path="/" element={<Index/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/recover" element={<RecoverPassForm/>}/>
      <Route path="/recover/:token" element={<ChangePassPage/>}/>

      <Route path="/verify-email/:token" element={<ConfirmEmail />} />
      </Routes>
  )
}

export default App
