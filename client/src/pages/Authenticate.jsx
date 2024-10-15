import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const AuthenticatePage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <Login onLogin={onLogin} /> : <Signup />}{" "}
    </div>
  );
};

export default AuthenticatePage;
