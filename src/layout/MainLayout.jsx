import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="max-w-full mx-auto">
        <NavBar />
        <div>
          <Outlet />
        </div>

        <Footer />
      </div>

      <Toaster />
    </div>
  );
};

export default MainLayout;
