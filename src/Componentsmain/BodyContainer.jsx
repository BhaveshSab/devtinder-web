import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const BodyContainer = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-background font-sans antialiased"><NavBar />
      <div className="flex-1 flex items-center justify-center w-full">
        <Outlet />
      </div>
      <Footer/>
      </div>
    </>
  );
};

export default BodyContainer;
