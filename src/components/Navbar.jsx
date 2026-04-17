import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { kijelentkezes } from "../api";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const isLoggedIn = !!user;
  const isAdmin = Number(user?.szerepkor) === 1;

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth <= 991;

      if (!isMobile) {
        setShowNavbar(true);
        return;
      }

      if (currentScrollY <= 20) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        setMenuOpen(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    const res = await kijelentkezes();

    if (!res.result) {
      alert(res.message);
    } else {
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <nav className={`app-navbar glass ${showNavbar ? "nav-show" : "nav-hide"}`}>
      <div className="app-navbar-inner">
        <div className="app-navbar-top">
          <Link to="/" className="app-brand" onClick={closeMenu}>
            GazdiVár
          </Link>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Menü"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`app-navbar-collapse ${menuOpen ? "open" : ""}`}>
          <div className="app-navbar-left">
            <div className="app-nav-links">
              <Link to="/" className="app-nav-link" onClick={closeMenu}>Főoldal</Link>

              {isLoggedIn && (
                <>
                  <Link to="/elveszett" className="app-nav-link" onClick={closeMenu}>Elveszett</Link>
                  <Link to="/talalt" className="app-nav-link" onClick={closeMenu}>Talált</Link>
                  <Link to="/kutya" className="app-nav-link" onClick={closeMenu}>Összes kutya</Link>
                  <Link to="/images" className="app-nav-link" onClick={closeMenu}>Saját feltöltések</Link>
                  <Link to="/profile" className="app-nav-link" onClick={closeMenu}>Profil</Link>
                </>
              )}

              {isAdmin && (
                <Link to="/admin" className="app-nav-link app-nav-link-admin" onClick={closeMenu}>
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="app-navbar-actions">
            <div className="navbar-btn-wrap">
              {isLoggedIn ? (
                <Button content="Kijelentkezés" color="light" onClick={handleLogout} />
              ) : (
                <Button
                  content="Bejelentkezés"
                  color="light"
                  onClick={() => {
                    closeMenu();
                    navigate("/login");
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}