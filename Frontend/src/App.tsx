import LoginForm from "./componentsUI/containers/LoginForm"
import RegisterForm from "./componentsUI/containers/RegisterForm"
import { Routes, Route} from 'react-router-dom';
import ConfirmEmail from "./componentsUI/containers/ConfirmEmail";
import RecoverPassForm from "./componentsUI/containers/RecoverPassForm";
import ChangePassPage from "./componentsUI/containers/ChangePassPage";
import Index from "./componentsUI/pages/index";
import AdvertDetail from "./componentsUI/pages/AdvertDetail";
import NewAdvert from "./componentsUI/pages/NewAdvert";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "./services/usersApi";
import { useEffect } from "react";
import { setUser } from "./store/slices/userSlice";
import { login } from "./store/slices/authSlice";
import './styles/index.css';



function App() { 
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const { data: user } = useGetMeQuery({ token: token || '' }, { skip: !token });
 
  useEffect(()=>{
    if(user && token){
      dispatch(setUser(user))
      dispatch(login({token,user}))
    }
  },[user,dispatch])
  return (
    <Routes>      
      <Route path="/" element={<Index/>}/>
      <Route path="/adverts/:slug" element={<AdvertDetail/>}/>
      <Route path="/new-advert" element={<NewAdvert/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterForm/>}/>
      <Route path="/recover" element={<RecoverPassForm/>}/>
      <Route path="/recover/:token" element={<ChangePassPage/>}/>

      <Route path="/verify-email/:token" element={<ConfirmEmail />} />
      </Routes>
  )
}

export default App
