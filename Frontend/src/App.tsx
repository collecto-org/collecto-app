import LoginForm from "./componentsUI/containers/LoginForm";
import RegisterForm from "./componentsUI/containers/RegisterForm";
import { Routes, Route, Outlet } from "react-router-dom";
import ConfirmEmail from "./componentsUI/containers/ConfirmEmail";
import RecoverPassForm from "./componentsUI/containers/RecoverPassForm";
import ChangePassPage from "./componentsUI/containers/ChangePassPage";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "./services/usersApi";
import { useEffect } from "react";
import { setUser } from "./store/slices/userSlice";
import "./styles/index.css";
import Edituser from "./temporal-components/EditUser";
import MyAdvertsGrid from "./temporal-components/MyAdvertsGrid";
import UserAdvertsFavorites from "./componentsUI/pages/develop/UserAdvertsFavorites";
import UserAdvertsPublished from "./componentsUI/pages/develop/UserAdvertsPublished";
import { useGetNotificationsQuery } from "./services/notificationsApi";
import { NotificationView } from "./temporal-components/NotificationView";
import HomePage from "./componentsUI/pages/develop/HomePage";
import UniversePage from "./componentsUI/pages/develop/UniversePage";
import ChatPage from "./componentsUI/pages/develop/ChatPage";
import RatingsPage from "./componentsUI/pages/develop/RatingPage";
import Orderpage from "./componentsUI/pages/develop/RatingPage";
import UserProfilePage from "./componentsUI/pages/develop/UserProfilePage";
import CatalogManagerPage from "./componentsUI/pages/develop/CatalogManagerPage";
import { MyOrders } from "./temporal-components/myOrdersJosemi";
import AdvertDetailPage from "./componentsUI/pages/develop/AdvertDetailPage";
import { useGetBrandsQuery } from "./services/brandsApi";
import { useGetUniversesQuery } from "./services/universesApi";
import { useGetProductTypesQuery } from "./services/productTypesApi";
import { useGetshippingMethodsQuery } from "./services/shipmentMethodsApi";
import { useGetTransactionsQuery } from "./services/transactionsApi";
import { useGetConditionsQuery } from "./services/conditionsApi";
import NewAdvertPage from "./componentsUI/pages/develop/NewAdvertPage";
import { useGetStatusQuery } from "./services/statusApi";
import RequireAuth from "./services/requireAuth";
import RequireAdmin from "./services/requireAdmin";
import MainLayout from "./componentsUI/layouts/MainLayout";
import AuthLayout from "./componentsUI/layouts/AuthLayout";

function App() {
  const dispatch = useDispatch();
  const { data: user } = useGetMeQuery({});

  const { refetch } = useGetNotificationsQuery({});


  useGetBrandsQuery();
  useGetUniversesQuery();
  useGetProductTypesQuery();
  useGetshippingMethodsQuery();
  useGetTransactionsQuery();
  useGetConditionsQuery();
  useGetStatusQuery()


  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      refetch();
    }
  }, [user, dispatch]);

  return (
    <Routes> 
      <Route element = {<MainLayout><RequireAuth/></MainLayout>}> 
      
      <Route path="/userprofile" element={<UserProfilePage />} />
      <Route path="/new-advert" element={<NewAdvertPage />} />
      <Route path="/edit-me" element={<Edituser />} />
      <Route path="/adverts/favorites" element={<UserAdvertsFavorites />} />
      <Route path="/adverts/published" element={<UserAdvertsPublished />} />
      <Route path="/Orderpage" element={<Orderpage />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/adverts/me" element={<MyAdvertsGrid />} />
      <Route path="/notifications" element={<NotificationView />} />
      <Route path="/chat/:userId" element={<ChatPage />} />
      <Route path="/ratings/:userId" element={<RatingsPage />} />
 
      </Route>

      <Route element = {<MainLayout><Outlet /></MainLayout>}>

      <Route path="/" element={<HomePage />} />
      <Route path="/universe/:slug" element={<UniversePage />} />      
      <Route path="/adverts/:slug" element={<AdvertDetailPage />} />

      </Route>

      <Route element = {<AuthLayout><Outlet /></AuthLayout>}>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/recover" element={<RecoverPassForm />} />
      <Route path="/recover/:token" element={<ChangePassPage />} />
      <Route path="/recover/:token" element={<ChangePassPage />} />
      <Route path="/verify-email/:token" element={<ConfirmEmail />} />

      </Route>

      <Route element = {<MainLayout><RequireAdmin/></MainLayout>}> 

      <Route path="/catalogmanager" element={<CatalogManagerPage />} />

      </Route>

    </Routes>
  );
}

export default App;
