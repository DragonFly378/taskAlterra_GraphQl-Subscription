import { useState } from "react";
import { Link } from "react-router-dom";

const SideNavbar = () => {
  const [openNav, setOpenNav] = useState(true);
  const open = () => setOpenNav(!openNav);
  return (
    <>
      <div className="sidenavbar">
        <div
          className="sidenav"
          style={{ width: `${openNav ? "0px" : "350px"}` }}
        >
          <a className="closebtn" onClick={() => open()}>
            &times;
          </a>
          <Link to="/">
            <a>Home</a>
          </Link>
          <Link to="/about/about-app">
            <a>About</a>
          </Link>
          <Link to="/about/about-author">
            <a>About Author</a>
          </Link>
        </div>
        <a onClick={() => open()} className="openbtn">
          &#9776;
        </a>
      </div>
    </>
  );
};

export default SideNavbar;
