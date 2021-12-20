import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../context/createContext";

const Login = () => {
  const { user, setUser } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(user);
  const handleForm = async () => {
    const data = {
      email,
      password,
    };
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",

        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "*/*",
          credentials: true,
          //contetent type importanat
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const userData = await res.json();
      localStorage.setItem("jwt", JSON.stringify(userData.token));
      setUser(userData);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Link to="/">HOME</Link>
      <br />
      <input
        type="email"
        name="email"
        placeholder="enter a email "
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        name="password"
        placeholder="please enter a paswword "
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="button" onClick={handleForm} value="submit" name="submit" />
    </div>
  );
};

export default Login;
