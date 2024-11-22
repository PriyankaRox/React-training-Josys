import React, {
  useEffect,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  returnUrl: string;
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (
  props: ProtectedRouteProps
) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const checkUserToken = () => {
    const userToken = sessionStorage.getItem("AUTH_TOKEN");
    const userRole = sessionStorage.getItem("USER_ROLE");

    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      return navigate("/Login?returnUrl=" + props.returnUrl);
      //      return navigate('/Login');
    }
    if (props.requiredRole && userRole !== props.requiredRole) {
      setIsLoggedIn(false);
      return navigate("/Hello");
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    // alert(props.returnUrl);
    checkUserToken();
  }, []);

  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};

export default ProtectedRoute;
