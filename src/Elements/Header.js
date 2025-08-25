import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token !== null);
  }, []);

  function onLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <header>
      <div className="left">
        <a href='/'>
          <img
            src={logo}
            alt="Site Logo"
            className="logo"
          />
        </a>
      </div>
      <div className="right">
        {isLoggedIn ? (
          <>
            <Link to='/create-post' className="link">Create Post</Link>
            <a className="link" onClick={onLogout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login" className="link">Login</Link>
            <span className="separator">|</span>
            <Link to="/register" className="link">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;