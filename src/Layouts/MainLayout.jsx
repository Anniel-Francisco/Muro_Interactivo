import "../assets/styles/mainlayout.css";
import { useLocation } from "react-router-dom";
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
        <button type="button">Log in</button>
      </div>
    </div>
  );
}
