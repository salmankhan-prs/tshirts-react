import { useContext } from "react";
import context from "./createContext";

const UserContext = () => {
  const [user, setUser] = useContext(context);
};

export default UserContext;
