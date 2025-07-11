import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "././redux/slices/userSlice";
import { useEffect } from "react";
import type { AppDispatch } from "././store/store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className=" bg-gray-50">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
