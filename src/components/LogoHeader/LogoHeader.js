import "./LogoHeader.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function LogoHeader() {
  const location = useLocation();
  return (
    <Link
      to="/"
      className={
        location.pathname === "/signin" || location.pathname === "/signup"
          ? `logo logo__center`
          : "logo"
      }
    >
      <img src={logo} alt="Логотип сайта" />
    </Link>
  );
}
export default LogoHeader;
