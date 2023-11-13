import { BrowserRouter, Routes, Route } from "react-router-dom";
//Layouts
import { Sidebar } from "./layouts/Sidebar";
import { MainLayout } from "./layouts/MainLayout";
//Views
import { Discover } from "./views/Discover";
import { Post } from "./views/Post";
import { Info } from "./views/Info";
import { ErrorPage } from "./views/ErrorPage";
function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "row" }}>
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
