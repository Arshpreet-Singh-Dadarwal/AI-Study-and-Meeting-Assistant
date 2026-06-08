import Navbar from "./Navbar";
import StarfieldBackground from "./StarfieldBackground";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;
