import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import Register from "./pages/Signup/Signup.tsx";

import EntrepreneurDashboard from "./pages/dashboard/EntrepreneurDashboard.tsx";
import InvestorDashboard from "./pages/dashboard/InvestorDashboard.tsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.tsx";
import Profile from "./components/Investor/Profile.tsx";
import Requests from "./components/Investor/Request.tsx";
import ViewEntrepreneurs from "./components/Investor/ViewEntrepreneurs.tsx";
import ViewInvestors from "./components/entrepreneur/ViewInvestors.tsx";
import CollabRequests from "./components/entrepreneur/Request.tsx";

import Chat from "./pages/chat/Chat.tsx";
import ProtectedLayout from "./components/shared/layout/ProtectedLayout.tsx";
import ContactPage from "./pages/contact/Contact.tsx";
import About from "./pages/About/About.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route element={<ProtectedLayout roleAllowed="investor" />}>
        <Route path="/dashboard/investor" element={<DashboardLayout />}>
          <Route index element={<InvestorDashboard />} />
          <Route path="entrepreneurs" element={<ViewEntrepreneurs />} />
          <Route path="requests" element={<Requests />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

      <Route element={<ProtectedLayout roleAllowed="entrepreneur" />}>
        <Route path="/dashboard/entrepreneur" element={<DashboardLayout />}>
          <Route index element={<EntrepreneurDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="investors" element={<ViewInvestors />} />
          <Route path="requests" element={<CollabRequests />} />
        </Route>
      </Route>
      <Route path="/chat/:id" element={<Chat />} />
    </>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
