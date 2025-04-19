import LoginForm from "./componentsUI/containers/LoginForm"
import RegisterForm from "./componentsUI/containers/RegisterForm"
import { Routes, Route} from 'react-router-dom';
import ConfirmEmail from "./componentsUI/containers/ConfirmEmail";
import RecoverPassForm from "./componentsUI/containers/RecoverPassForm";
import ChangePassPage from "./componentsUI/containers/ChangePassPage";
//import AdvertDetail from "./temporal-components/AdvertDetail";
import AdvertDetailPage from "./componentsUI/pages/develop/AdvertDetailPage";
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
import HomePage from "./componentsUI/pages/develop/HomePage";
import UniversePage from "./componentsUI/pages/develop/UniversePage"
import ChatPage from "./componentsUI/pages/develop/ChatPage"
import RatingsPage from "./componentsUI/pages/develop/RatingPage";
import Orderpage from "./componentsUI/pages/develop/RatingPage";



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
      <Route path="/" element={<HomePage/>}/>
      
      <Route path="/universe/:slug" element={<UniversePage />} />

      <Route path="/adverts/:slug" element={<AdvertDetailPage/>}/>
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
      <Route path="/chat/:userId" element={<ChatPage />} />
      <Route path="/ratings/:userId" element={<RatingsPage />} />
      <Route path="/Orderpage" element={<Orderpage />} />
      </Routes>
  )
}

export default App
