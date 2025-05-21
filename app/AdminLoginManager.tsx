import React, { useEffect, useState } from "react";
import AdminLogin from "./(tabs)/AdminLogin";
import AdminDashboard from "./(tabs)/AdminDashboard";

export default function AdminLoginManager() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // Listen for hash changes and update state
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Handle successful login by updating the hash
  const handleLoginSuccess = () => {
    window.location.hash = "dashboard"; // Change the hash to 'dashboard'
  };

  // Handle logout by resetting the hash
  const handleLogout = () => {
    window.location.hash = ""; // Clear the hash to show login screen
  };

  // Render components based on the hash
  if (currentHash === "#dashboard") {
    return <AdminDashboard onLogout={handleLogout} />;
  }
  return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
}
