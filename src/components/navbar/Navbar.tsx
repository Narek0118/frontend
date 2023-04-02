import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import jwtDecode from "jwt-decode";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  CHECKOUT_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
} from "../../utils/constants";
import { StringDecoder } from "string_decoder";
import { Menu } from "antd";
import { HomeFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT } from "../../store/actionTypes";

export const Header = () => {
  const history = useHistory();
  const token = localStorage.getItem("token");
  let admin: { role?: string } = {};
  if (token) admin = jwtDecode(token);
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    history.push(LOGIN_ROUTE);
    dispatch({ type: LOG_OUT });
    window.location.href = LOGIN_ROUTE;
  };

  return (
    // <Navbar bg="dark" variant="dark">
    //   <Container>
    //     <NavLink to={SHOP_ROUTE} style={{ color: "#fff" }}>
    //       Shop
    //     </NavLink>
    //     <Nav className="ml-auto">
    //       {!admin?.role ? (
    //         <Button
    //           variant={"outline-light"}
    //           onClick={() => history.push(LOGIN_ROUTE)}
    //         >
    //           Authorization
    //         </Button>
    //       ) : (
    //         <>
    //           {admin?.role === "ADMIN" && <Button variant={"outline-light"} onClick={() => history.push(ADMIN_ROUTE)}>Admin panel</Button>}
    //           <Button variant={"outline-light"} onClick={() => logout()}>Log out</Button>
    //         </>
    //       )}
    //     </Nav>
    //   </Container>
    // </Navbar>

    <header>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link to={SHOP_ROUTE}>Store</Link>
        </Menu.Item>
        {!state.user ? (
          <Menu.Item key="auth">
            <Link to={LOGIN_ROUTE}>Authorization</Link>
          </Menu.Item>
        ) : (
          <>
            <Menu.Item key="checkout">
              <Link to={CHECKOUT_ROUTE}>Checkout</Link>
            </Menu.Item>
            <Menu.Item key="basket">
              <Link to={BASKET_ROUTE}>
                <ShoppingCartOutlined />
              </Link>
            </Menu.Item>
            {state.user?.role === "ADMIN" && (
              <Menu.Item key="admin">
                <Link to={ADMIN_ROUTE}>Admin panel</Link>
              </Menu.Item>
            )}
            <Menu.Item key="log_out">
              <Link onClick={logout} to={""}>
                Log out
              </Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </header>
  );
};
