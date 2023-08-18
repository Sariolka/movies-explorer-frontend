import "./LogoHeader.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function LogoHeader() {
  return (
    <Link to="/" className="logo__header">
      <img src={logo} alt="Логотип сайта" />
    </Link>
  );
}
export default LogoHeader;
