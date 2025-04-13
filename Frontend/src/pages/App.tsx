import LoginForm from "../components/modules/LoginForm"
import RegisterForm from "../components/modules/RegisterForm"
import { Routes, Route} from 'react-router-dom';
import ConfirmEmail from "./ConfirmEmail";
import RecoverPassForm from "../components/modules/RecoverPassForm";
import ChangePassPage from "./ChangePassPage";
import Index from ".";
import AdvertDetail from "./AdvertDetail";
import NewAdvert from "./NewAdvert";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "../services/usersApi";
import { useEffect } from "react";
import { setUser } from "../store/slices/userSlice";


function App() { 
  const token = localStorage.getItem("token")
  const dispatch = useDispatch()
  const { data: user } = useGetMeQuery({ token: token || '' }, { skip: !token });
 
  useEffect(()=>{
    if(user){
      dispatch(setUser(user))
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
