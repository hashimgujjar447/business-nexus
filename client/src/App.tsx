import { Outlet } from "react-router-dom";
import Header from "./components/shared/layout/Header";
import Footer from "./components/shared/layout/Footer";
import AppInitializer from "./hooks/AppInitializer";

const App = () => {
  AppInitializer();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
