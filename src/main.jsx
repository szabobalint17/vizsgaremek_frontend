import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./ThemeContext";
import "./style.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/Registration";
import ProfilePage from "./pages/ProfilePage";
import UploadPage from "./pages/UploadPage";
import ImagesPage from "./pages/ImagesPage";
import AdminPage from "./pages/AdminPage";
import ElveszettKutyaPage from "./pages/ElveszettKutyaPage";
import TalaltKutyaPage from "./pages/TalaltKutyaPage";
import AllDogsPage from "./pages/AllDogsPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/images" element={<ImagesPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/elveszett" element={<ElveszettKutyaPage />} />
          <Route path="/talalt" element={<TalaltKutyaPage />} />
          <Route path="/dogs" element={<AllDogsPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);