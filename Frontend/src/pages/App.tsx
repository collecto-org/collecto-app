import LoginForm from "../components/modules/LoginForm"
import RegisterForm from "../components/modules/RegisterForm"
import RecoverForm from "../components/modules/RecoverForm"
import { Routes, Route} from 'react-router-dom';


function App() { 
  return (
    <Routes>      
      <Route path="/" element={"Aquí iria el index"}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/recover" element={<RecoverForm/>}/>
    </Routes>
  )
}

export default App
