import React, { useState } from "react";
import LoginRegisterScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen"; // Make sure this import is correct

export default function LoginRegisterManager({ onLoginSuccess }) {
  const [isRegistering, setIsRegistering] = useState(false);

  // Callback function to switch to register screen
  const handleSwitchToRegister = () => {
    setIsRegistering(true);
  };

  // Callback function to switch to login screen
  const handleSwitchToLogin = () => {
    setIsRegistering(false);
  };

  return (
    <>
      {isRegistering ? (
        <RegisterScreen onSwitchToLogin={handleSwitchToLogin} />
      ) : (
        <LoginRegisterScreen
          onLoginSuccess={onLoginSuccess} // Pass the onLoginSuccess to LoginRegisterScreen
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}
    </>
  );
}
