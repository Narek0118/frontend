import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import { NavLink, useLocation } from "react-router-dom";
import { registration, login } from "../http/userApi";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
} from "../utils/constants";
// import { Context } from "..";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Auth = observer(() => {
  // const { user } = useContext(Context);
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    let admin: { role?: string } = {};
    let isAuth: boolean = false;
    if (token) {
      admin = jwtDecode(token);
      isAuth = admin?.role === "ADMIN";
    }
    if (isAuth) {
      history.push(ADMIN_ROUTE);
    }
  }, []);

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
        history.push(SHOP_ROUTE);
      } else {
        data = await registration(email, password);
        history.push(SHOP_ROUTE);
      }
      // user.setUser(user);
      // user.setIsAuth(true);
      history.push(SHOP_ROUTE);
    } catch (e: any) {
      console.log(e);

      // alert(e.response.data.message);
    }
  };

  return (
    <div>
      <Form
        style={{
          maxWidth: "400px",
          margin: "auto",
          marginTop: "100px",
          display: "grid",
          rowGap: "10px",
        }}
      >
        <h1 className="m-auto">{isLogin ? "Login" : "Register"}</h1>
        <Form.Control
          placeholder="Email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required={true}
        />
        <Form.Control
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          required={true}
        />
        <Button onClick={click}>Click</Button>

        {isLogin ? (
          <div className="d-f">
            Don't you have an account?{" "}
            <NavLink to={REGISTRATION_ROUTE}>Click here to register...</NavLink>
          </div>
        ) : (
          <div className="d-f">
            Do you have already an account?{" "}
            <NavLink to={LOGIN_ROUTE}>Click here to login...</NavLink>
          </div>
        )}
      </Form>
    </div>
  );
});

export default Auth;
