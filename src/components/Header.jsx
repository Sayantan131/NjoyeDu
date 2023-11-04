import "../styles/Header.css";
import ColorModeSwitcher from "../components/ColorModeSwitcher";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const handleRedirect = () => {
    window.location.href = "/";
  };

  const Links = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About",
      url: "/about",
    },
    {
      name: "Contact",
      url: "/contact",
    },
    {
      name: "Trending",
      url: "/trending",
    },
  ];

  return (
    <div className="header">
      <div className="logo">
        <img src={Logo} alt="" onClick={handleRedirect} />
      </div>
      <div className="headerLinks">
        {Links.map((link, index) => {
          return (
            <Link to={link.url} key={index}>
              {link.name}
            </Link>
          );
        })}
        <div className="logInfo">
          <button>
            <Link to="/login">Login</Link>
          </button>
          
        </div>
      </div>
      <div className="search">
        <input type="search" placeholder="Search" />
        <FaSearch className="searchIcon" />
      </div>
      <div className="swicther">
        <ColorModeSwitcher />
      </div>
    </div>
  );
};

export default Header;
