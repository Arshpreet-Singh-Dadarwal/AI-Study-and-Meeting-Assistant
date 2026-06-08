
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Atom, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import {useAuth} from "../context/authcontext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, logoutUser } = useAuth();
  
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/study", label: "Study Assistant" },
    { path: "/meeting", label: "Meeting Assistant" },
    { path: "/features", label: "Features" },
    { path: "/pricing", label: "Pricing" },
    
  ];
  const navigate=useNavigate();
 const handleLogout=()=>{
  logoutUser();
  navigate("/login")
};
  // Better active matching (supports nested routes)
  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  return (
    <nav className="relative z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Atom className="w-8 h-8 text-accent group-hover:text-primary transition-colors duration-300" />
            <div className="absolute inset-0 blur-lg bg-accent/30 group-hover:bg-primary/30 transition-colors duration-300" />
          </div>
          <span className="font-display text-xl font-semibold gradient-text">
            AI Study Assistant
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive(link.path)
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
  {!isLoggedIn ? (
    <>
      <Link to="/login">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </Link>

      <Link to="/signup">
        <Button size="sm" className="cosmic-button border-0">
          Get Started
        </Button>
      </Link>
    </>
  ) : (
    <>
      <Link to="/dashboard">
        <Button size="sm" className="cosmic-button border-0">
          My Notes
        </Button>
      </Link>

      <Button variant="ghost" size="sm" onClick={handleLogout}>
        Logout
      </Button>
    </>
  )}
</div>


        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-card mx-4 mt-2 p-4">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border/30">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="w-full cosmic-button border-0">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
