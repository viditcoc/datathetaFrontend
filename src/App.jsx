import { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import { AuthProvider, AuthContext } from "@store/context/AuthContext";
import AddNewEquipment from "./pages/AddNewEquipment";
import UserManagement from "./pages/UserManagement";
import AddNewUser from "./pages/AddNewUser";
import AllStats from "./pages/AllStats";
import NotificationPreference from "./pages/NotificationPreference";
import { useLocationStore } from '@store/locationStore';
import { useEquipmentStore } from '@store/equipmentStore';
import { useDesignationStore } from '@store/designationStore';
import { useRolesStore } from '@store/rolesStore';

function AppRoutes() {
  const { isAuthenticated, userType } = useContext(AuthContext);

  const fetchLocations = useLocationStore((state) => state.fetchLocations);
  const fetchEquipments = useEquipmentStore((state) => state.fetchEquipments);
  const fetchDesignations = useDesignationStore((state) => state.fetchDesignations);
  const fetchRoles = useRolesStore((state) => state.fetchRoles);

  useEffect(() => {
    fetchLocations();
    fetchEquipments();
    fetchDesignations();
    fetchRoles();
  }, [fetchLocations]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/landingpage"
        element={isAuthenticated ? <LandingPage /> : <Navigate to="/login" />}
      >
            <Route
          path="notificationPreference"
          element={
            isAuthenticated ? <NotificationPreference /> : <Navigate to="/login" />
          }
        />  
        <Route
          path="addEquipment"
          element={
            isAuthenticated ? <AddNewEquipment /> : <Navigate to="/login" />
          }
        />
        <Route
          path="userManagement"
          element={
            isAuthenticated ? <UserManagement /> : <Navigate to="/login" />
          }
        >
              <Route
          path="userController"
          element={
            isAuthenticated ? <AddNewUser /> : <Navigate to="/login" />
          }
        />  

        

          </Route>
         
          
           
        <Route
          path="allStats"
          element={
            isAuthenticated ? <AllStats /> : <Navigate to="/login" />
          }
        />
      </Route>
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
      />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* ✅ Wrap it here */}
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
