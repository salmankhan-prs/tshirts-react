import { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Context from "../context/createContext";
import fetchUser from "../isAuth";
function ProtectedRoute({ isAuth, Component, ...rest }) {
  //   const { user, setUser } = useContext(Context);
  const [user, setUser] = useState(true);
  useEffect(() => {
    let res = async () => await fetchUser();
    setUser(res);
  }, []);

  console.log(user);

  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/login" />;
  }
}

export default ProtectedRoute;
