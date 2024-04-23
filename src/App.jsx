import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders.jsx";
import axios from "axios";
import { serverUrl } from "./constants/config.js";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth.js";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "../socket.jsx";

// Screens:
const Home = lazy(() => import("./screens/Home"));
const Chat = lazy(() => import("./screens/Chat"));
const Groups = lazy(() => import("./screens/Groups"));
const NotFound = lazy(() => import("./screens/NotFound.jsx"));
// Admin Screens:
const AdminLogin = lazy(() => import("./screens/admin/AdminLogin.jsx"));
const Dashboard = lazy(() => import("./screens/admin/Dashboard.jsx"));
const UserManagement = lazy(() => import("./screens/admin/UserManagement.jsx"));
const ChatManagement = lazy(() => import("./screens/admin/ChatManagement.jsx"));
const MessageManagement = lazy(() =>
  import("./screens/admin/MessageManagement.jsx")
);

const Login = lazy(() => import("./screens/Login"));

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(serverUrl + "/user/me", { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.data)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);
  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagement />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
