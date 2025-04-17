import LoginForm from "./componentsUI/containers/LoginForm"
import RegisterForm from "./componentsUI/containers/RegisterForm"
import { Routes, Route} from 'react-router-dom';
import ConfirmEmail from "./componentsUI/containers/ConfirmEmail";
import RecoverPassForm from "./componentsUI/containers/RecoverPassForm";
import ChangePassPage from "./componentsUI/containers/ChangePassPage";
import Index from "./componentsUI/pages/index";
import AdvertDetail from "./temporal-components/AdvertDetail";
import NewAdvert from "./componentsUI/pages/NewAdvert";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "./services/usersApi";
import { useEffect } from "react";
import { setUser } from "./store/slices/userSlice";
import './styles/index.css';
import Edituser from "./temporal-components/EditUser";
import MyAdvertsGrid from "./temporal-components/MyAdvertsGrid";
import MyAdvertsFavGrid from "./temporal-components/MyAdvertsFavGrid";
import { useGetNotificationsQuery } from "./services/notificationsApi";
import { NotificationView } from "./temporal-components/NotificationView";



function App() { 
  const dispatch = useDispatch()
  const { data: user } = useGetMeQuery({});
   useGetNotificationsQuery({})
 
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
      <Route path="/recover/:token" element={<ChangePassPage/>}/>
      <Route path="/verify-email/:token" element={<ConfirmEmail />} />
      

      <Route path="/editMe" element={<Edituser />} />
      <Route path="/adverts/me" element={<MyAdvertsGrid />} />
      <Route path="/adverts/favorites" element={<MyAdvertsFavGrid/>} />
      <Route path="/notifications" element={<NotificationView/>} />

      </Routes>
  )
}

export default App
