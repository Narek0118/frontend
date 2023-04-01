import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { BrowserRouter } from "react-router-dom";
// import { Context } from ".";
import AppRouter from "./components/AppRouter";
import { Header } from "./components/navbar/Navbar";
import { check } from "./http/userApi";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LOGIN_ROUTE } from "./utils/constants";

const App = observer(() => {
  // const user = useContext(Context);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    console.log(111, localStorage.getItem("token"));
    
    // check()
    //   .then((data: any) => {
    //     user.setUser(true);
    //     user.setIsAuth(true);
    //   })
    //   .finally(() => setLoading(false));
    //   if (user._isAuth) {
    //     history.push("/")
    //   }
  });

  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
