import "../assets/styles/mainlayout.css";
import { useLocation } from "react-router-dom";
import { Login } from "./Login";
export function MainLayout() {
  const location = useLocation();

  return (
    <div className="layout" data-aos="fade-down">
      <div>
        <h1>
          {location.pathname == "/"
            ? "Discover"
            : location.pathname == "/post"
            ? "Post"
            : "Info"}
        </h1>
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
}
