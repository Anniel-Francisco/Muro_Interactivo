import {
  HiOutlinePlusCircle,
  HiOutlineSquares2X2,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";

import "../assets/styles/sidebar.css";
import { Link } from "react-router-dom";
export function Sidebar() {
  return (
    <div className="sidebar animate__animated animate__fadeInLeft">
      <Link to="/" className="sidebar_item">
        <HiOutlineSquares2X2 className="icono" />
        <span>Discover</span>
      </Link>
      <Link to="/post" className="sidebar_item">
        <HiOutlinePlusCircle className="icono" />
        <span>Post</span>
      </Link>
      <Link to="/info" className="sidebar_item">
        <HiOutlineQuestionMarkCircle className="icono" />
        <span>Info</span>
      </Link>
    </div>
  );
}
