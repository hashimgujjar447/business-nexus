import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import Store from "./store/store.ts";
import InvestorDashboard from "./pages/Dashboard/InvestorDashboard.tsx";
import EntrepreneurDashboard from "./pages/Dashboard/EntrepreneurDashboard.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";

import "./index.css";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/login/Login.tsx";
import Register from "./pages/register/Register.tsx";
import About from "./pages/about/About.tsx";
import Entrepreneur from "./pages/EntrepreneurList/Entrepreneur.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import EditInvestorProfile from "./components/InvestorDashboard/EditInvestorProfile.tsx";
import EditEntrepreneurProfile from "./components/EntrepreneurDashboard/EditEnterpreneurProfile.tsx";
import PublicEntrepreneurProfile from "./components/EntrepreneurDashboard/PublicEntrepreneurProfile.tsx";
import PublicInvestorProfile from "./components/InvestorDashboard/PublicInvestorProfile.tsx";
import ChatPage from "./pages/Chat/ChatPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard/entrepreneur"
          element={
            <ProtectedRoute allowedRoles={["entrepreneur"]}>
              <EntrepreneurDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/investor/edit-profile"
          element={
            <ProtectedRoute allowedRoles={["investor"]}>
              <EditInvestorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/entrepreneur/edit-profile"
          element={
            <ProtectedRoute allowedRoles={["entrepreneur"]}>
              <EditEntrepreneurProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/investor"
          element={
            <ProtectedRoute allowedRoles={["investor"]}>
              <InvestorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/investor/:id"
          element={<PublicInvestorProfile />}
        />
        <Route
          path="/profile/entrepreneur/:id"
          element={<PublicEntrepreneurProfile />}
        />

        <Route path="/entrepreneurs" element={<Entrepreneur />} />
        <Route path="/chat/:id" element={<ChatPage />} />
      </Route>
    </>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
