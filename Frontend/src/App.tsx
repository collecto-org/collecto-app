import LoginForm from "./componentsUI/containers/LoginForm";
import RegisterForm from "./componentsUI/containers/RegisterForm";
import { Routes, Route, Outlet } from "react-router-dom";
import VerifyEmailPage from "./componentsUI/pages/develop/VerifyEmailPage";
import RecoverPassForm from "./componentsUI/containers/RecoverPassForm";
import ChangePassPage from "./componentsUI/containers/ChangePassPage";
import { useDispatch } from "react-redux";
import { useGetMeQuery } from "./services/usersApi";
import { useEffect } from "react";
import { setUser } from "./store/slices/userSlice";
import "./styles/index.css";
import Edituser from "./temporal-components/EditUser";
import MyAdvertsGrid from "./temporal-components/MyAdvertsGrid";
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
import UserAdvertsPage from "./temporal-components/UserAdverts";
import MyChats from "./temporal-components/MyChats";
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
import { ToastContainer } from "react-toastify";
import NotFoundPage from "./componentsUI/components/develop/NotFoundPage";
import ServerErrorPage from "./componentsUI/components/develop/ServerErrorPage";
import UnauthorizedPage from "./componentsUI/components/develop/UnauthorizedPage";
import { ErrorBoundary } from "./utils/ErrorBoundary";

function App() {
  const dispatch = useDispatch();
  const { data: user } = useGetMeQuery({});

  const { refetch } = useGetNotificationsQuery({},{skip:!user});

  useGetBrandsQuery();
  useGetUniversesQuery();
  useGetProductTypesQuery();
  useGetshippingMethodsQuery();
  useGetTransactionsQuery();
  useGetConditionsQuery();
  useGetStatusQuery();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
      refetch();
    }
  }, [user, dispatch]);

  return (
    <>
      <Routes>
        <Route
          element={
            <ErrorBoundary>
            
            <MainLayout>
              <RequireAuth />
            </MainLayout>
            </ErrorBoundary>
          }
        >
          <Route path="/userprofile" element={<UserProfilePage />} />
          <Route path="/new-advert" element={<NewAdvertPage />} />
          <Route path="/edit-me" element={<Edituser />} />
          <Route path="/Orderpage" element={<Orderpage />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/adverts/me" element={<MyAdvertsGrid />} />
          <Route path="/notifications" element={<NotificationView />} />
          <Route path="/ratings/:userId" element={<RatingsPage />} />
          <Route path="/my-chats" element={<MyChats />} />
          <Route path="/chat/:roomId" element={<ChatPage />} />
        </Route>

        <Route
          element={
            <ErrorBoundary>
            <MainLayout>
              <Outlet />
            </MainLayout>
            </ErrorBoundary>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/universe/:slug" element={<UniversePage />} />
          <Route path="/adverts/:slug" element={<AdvertDetailPage />} />
          <Route path="/users/:username" element={<UserAdvertsPage />} />
        </Route>

        <Route
          element={
            <ErrorBoundary>
            <MainLayout auth={true}>
              <Outlet />
            </MainLayout>
            </ErrorBoundary>
          }
        >
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/recover" element={<RecoverPassForm />} />
          <Route path="/recover/:token" element={<ChangePassPage />} />
          <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        </Route>

        <Route
          element={
            <ErrorBoundary>
            <MainLayout>
              <RequireAdmin />
            </MainLayout>
            </ErrorBoundary>
          }
        >
          <Route path="/catalogmanager" element={<CatalogManagerPage />} />
        </Route>
        <Route path="/500" element={<ServerErrorPage />} />
        <Route path="/401" element={<UnauthorizedPage />} />
        {/* ⚡ ESTA ES CLAVE: 404 para cualquier ruta no encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
