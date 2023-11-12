import { BrowserRouter, Routes, Route } from "react-router-dom";
//Layouts
import { Sidebar } from "./Layouts/Sidebar";
import { MainLayout } from "./Layouts/MainLayout";
//Views
import { Discover } from "./views/Discover";
import { Post } from "./views/Post";
import { Info } from "./views/Info";
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
          <div>
            <MainLayout />
          </div>
          <div>
            <Routes>
              <Route path="/" element={<Discover />}></Route>
              <Route path="/post" element={<Post />}></Route>
              <Route path="/info" element={<Info />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
