//import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav
        className="navbar sticky-top navbar-expand-lg bg-info-subtle bg-dark"
        data-bs-theme="dark"
        id="nav_container"
      >
        <div className="navbar-nav container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav container-fluid text-center justify-content-center">
              <li className="nav-item col">
                <a className="nav-link" href="#">
                  Play
                </a>
              </li>
              <div className="vr mx-auto text-light"></div>
              <li className="nav-item col">
                <a
                  className="nav-link active navbar-brand"
                  aria-current="page"
                  href="#"
                >
                  Welcome
                </a>
              </li>
              <div className="vr col- mx-auto text-light"></div>
              <li className="nav-item col">
                <a className="nav-link" href="#">
                  Explore
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
