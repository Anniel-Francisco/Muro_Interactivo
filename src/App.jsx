import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
//Layouts
import { Sidebar } from "./layouts/Sidebar";
import { MainLayout } from "./layouts/MainLayout";
//Views
import { Discover } from "./views/Discover";
import { Post } from "./views/Post";
import { Info } from "./views/Info";
import { ErrorPage } from "./views/ErrorPage";

function App() {
  const stateUser = useContext(AuthContext);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("login"));
    const userData = JSON.parse(localStorage.getItem("userLogged"));
    if (login != null || login != undefined) {
      if (login.logged && Object.keys(userData.userInfo).length > 0) {
        stateUser.login();
        stateUser.setInfoUser(userData.userInfo);
      }
    }
  }, []);
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div>
          <Sidebar />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            margin: "10px",
          }}
        >
          <div
            style={{
              width: "100%",
              position: "sticky",
              zIndex: "1000",
              backgroundColor: "white",
              top: "0",
            }}
          >
            <MainLayout />
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Discover />}></Route>
              <Route path="/post" element={<Post />}></Route>
              <Route path="/info" element={<Info />}></Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
