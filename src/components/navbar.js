import React from 'react'
const Navbar = () => {
  return (
    <div
      className="navbar11 w-nav"
      data-collapse="medium"
      data-animation="default"
      data-duration="400"
    >
      <div className="w-container">
        <a href="/" className="brand-4 w-clearfix w-nav-brand w--current">
          <img
            src="/images/movinga-logo.png"
            width="90"
            srcSet="/images/mvng-logo-p-500.png 500w, /images/movinga-logo.png 700w"
            sizes="90px"
            alt=""
            className="image-62"
          />
        </a>
        <div className="div-block-20">
          <div
            data-delay="0"
            data-hover="1"
            className="dropdown w-dropdown"
            role="menu"
            aria-labelledby="w-dropdown-toggle-0"
          >
            <div
              className="dropdown-toggle w-dropdown-toggle"
              tabIndex="0"
              id="w-dropdown-toggle-0"
              aria-controls="w-dropdown-list-0"
              aria-haspopup="menu"
              style={{ outline: 'none' }}
            >
              <div className="icon w-icon-dropdown-toggle"></div>
              <div className="text-block-10">where do you want to move?</div>
            </div>
            <nav
              className="dropdown-list w-dropdown-list"
              id="w-dropdown-list-0"
            >
              <a
                href="http://www.movinga.de"
                className="dropdown-link w-dropdown-link"
                tabIndex="-1"
                role="menuitem"
                style={{ outline: 'none' }}
              >
                Germany
              </a>
              <a
                href="http://www.movinga.fr"
                className="dropdown-link-2 w-dropdown-link"
                tabIndex="-1"
                role="menuitem"
                style={{ outline: 'none' }}
              >
                France
              </a>
              <a
                href="http://www.movinga.se"
                className="dropdown-link-3 w-dropdown-link"
                tabIndex="-1"
                role="menuitem"
                style={{ outline: 'none' }}
              >
                Sweden
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="w-nav-overlay" data-wf-ignore=""></div>
    </div>
  )
}

export default Navbar
